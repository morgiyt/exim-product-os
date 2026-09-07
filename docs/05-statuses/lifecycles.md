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

```text
draft → active
draft → pending_moderation → active | rejected
active ↔ paused
active | paused → matched | expired | closed | blocked
```

Это неканонический draft до OQ-039/OQ-040. Ветка `pending_moderation` условная: обязательность самой модерации и премодерации не утверждена.

## Exchange Response lifecycle

```text
sent → viewed
sent | viewed → withdrawn | expired
viewed → accepted | rejected
```

Это неканонический draft до OQ-040/OQ-043. `accepted` в предлагаемой модели означает выбор участника для продолжения общения. Это не договор, оплата, гарантия перевозки или принятие ответственности платформой.

## История

Каждый переход хранит объект, предыдущий и новый статус, автора, membership/роль, дату и комментарий/причину, если она обязательна.

## Открытые вопросы

- OQ-031 — миграция workflow-версий;
- OQ-040 — точный lifecycle объявления и отклика;
- OQ-042 — различия по видам транспорта;
- OQ-044 — системные и tenant-шаблоны.
