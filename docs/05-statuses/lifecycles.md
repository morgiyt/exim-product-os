# Жизненные циклы

## Правила

- Private OS workflow и Exchange lifecycle разделены.
- Расчёт и договорный gate принадлежат `QuoteRequest`/связанным объектам.
- `Shipment` появляется только после подписанного договорного основания.
- Ни один этап не расширяет tenant scope или entitlement.
- Клиент получает безопасное название, а не внутренний staff-код.
- Ниже приведены референсные версии, а не жёсткое требование конкретной БД.

## QuoteRequest workflow v1

### Gate-enabled

```text
draft → manager_review
manager_review → data_required → manager_review
manager_review → sent_to_logistician
sent_to_logistician → data_required
sent_to_logistician → rate_search
rate_search → rate_received  (только после минимум двух валидных RateQuote)
rate_received → offer_preparation
offer_preparation → offer_to_client
offer_to_client → clarification_requested → offer_to_client
offer_to_client → approved → contract_pending → contract_signed
contract_signed → converted_to_shipment → closed
offer_to_client → rejected
rate_search | sent_to_logistician → closed_without_rate
```

`RateQuote` создаётся отдельным действием внутри `rate_search`; добавление первой или второй ставки само по себе не является переходом.

### Post-Gate / TBD — отключено в Gate

- `rate_received → recalculation → rate_received` — actor не утверждён;
- произвольный переход в `cancelled` — actor и правила возврата не утверждены;
- любые финалы, кроме явного client `rejected` и D-063 `closed_without_rate`, не засеваются как разрешённые Gate transitions.

Все разрешённые отрицательные финалы требуют причину.

Клиентские формулировки не обязаны повторять внутренние роли. Например `sent_to_logistician` и `rate_search` могут отображаться как «Выполняется расчёт».

## Shipment workflow v1 для exim.kz

### Gate-enabled

```text
preparation
→ factory_contact
→ pickup_waiting
→ loading
→ in_transit
```

### Post-Gate / TBD — отключено в Gate

```text
in_transit
→ border_or_customs
→ final_delivery
→ delivered
→ documents_closing
→ closed
```

Дополнительные состояния `problem`, `paused`, `cancelled` также отключены в Gate: actor, возврат в основной путь и полномочия не утверждены. После утверждения любой такой переход требует причину. Детальная D-058 последовательность сохраняется как стартовая конфигурация `exim.kz`, но не применяется ко всем видам транспорта и tenants автоматически.

## Trip workflow v1

### Gate-enabled

```text
preparation
→ transport_assigned
→ loading
→ in_transit
```

Trip создаёт назначенный логист в `preparation`; обязательные поля и права переходов заданы в REQ-003. Gate проходит только до `in_transit`.

### Post-Gate / TBD — отключено в Gate

```text
in_transit
→ customs_if_applicable
→ delivery
→ closed
```

## Finance workflow

Стартовый шаблон D-074, не окончательный универсальный процесс:

```text
not_invoiced
→ invoiced
→ payment_expected
→ partially_paid
→ paid
→ closing_documents
→ closed
```

## Exchange Listing lifecycle

### Wave 9 task canonical

```text
draft → published ↔ paused
published | paused → expired
draft | published | paused → closed
```

- `published` хранится как канонический code; клиентский label — «Опубликовано»;
- повтор одинаковой команды идемпотентен, каждое реальное изменение версии и visibility аудируется;
- `expired` наступает детерминированно по `expires_at` и не возвращается в `published` в Wave 9;
- редактировать можно owner organization с optimistic version; foreign/direct-ID mutation запрещена.

### Wave 10 task extension

```text
published → matched
```

`matched` создаётся только транзакционным выбором ровно одного ExchangeResponse в TASK-2026-012, убирает listing из публичного поиска и запрещает новые отклики. Повторная публикация, отмена выбора и возврат из `matched` остаются отключены до OQ-040.

### Wave 11 moderation overlay

Business status объявления не заменяется moderation status. TASK-2026-013 добавляет отдельный overlay:

```text
clear → restricted → clear
```

- `restricted` создаёт только moderator action с обязательной причиной;
- restricted object независимо от business status отсутствует в search/public detail и не принимает publish/resume/response/selection;
- снятие restriction — новое append-only action, а не удаление истории;
- после снятия публичность возвращается только если business status сам допускает её;
- `pending_moderation`, listing-level `rejected` и необратимый `blocked` не создаются: final policy остаётся OQ-039/OQ-040.

Исторический термин `active` в старом draft нормализован в `published`, чтобы storage, API и UI не расходились.

## Exchange Response lifecycle

### Wave 10 task canonical

```text
submitted → shortlisted → selected | rejected
submitted → rejected | withdrawn
shortlisted → withdrawn
```

- mutation actor Wave 10 — `tenant_admin` организации-владельца либо ответчика в пределах своего действия;
- `selected` создаётся только вместе с unique `ExecutorSelection` и listing `matched`; остальные active responses этого listing транзакционно получают `rejected` с системной причиной;
- `withdrawn`, `selected` и `rejected` финальны; прямые пропуски к `selected`, повторный выбор и возврат запрещены;
- `shortlisted` не означает гарантию выбора;
- `selected` не является договором, оплатой, гарантией перевозки или принятием ответственности платформой;
- раскрытие контактов и `ContactAccessEvent` отключены до OQ-043.

Финальные сроки, коммерческие поля, expiration response и relisting остаются OQ-040.

## Exchange Moderation Case lifecycle

### Wave 11 task canonical

```text
open → in_review → actioned | dismissed → closed
```

- take/release case, restrict/unrestrict listing и resolve/dismiss требуют platform role, optimistic version, idempotency key и reason;
- report status и case status не раскрывают reporter/actor/internal note другой стороне;
- terminal correction выполняется новым case/action, прежняя история append-only;
- organization Exchange suspension хранится отдельным reversible platform state и не меняет tenant membership или Private OS access;
- appeals, SLA, KYC, final reason taxonomy и legal dispute lifecycle остаются OQ-039…041.

## История

Каждый переход хранит объект, предыдущий и новый статус, автора, membership/роль, дату и комментарий/причину, если она обязательна.

## Открытые вопросы

- OQ-031 — миграция workflow-версий;
- OQ-040 — точный lifecycle объявления и отклика;
- OQ-042 — различия по видам транспорта;
- OQ-044 — системные и tenant-шаблоны.
