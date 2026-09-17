# REQ-013 — Финансы, закрытие и управленческая аналитика

**Статус:** Ready for implementation в границах TASK-2026-009.

**Релиз:** Full Product / Wave 7.

## Цель

Дать `exim.kz` tenant-safe финансовый контур вокруг канонических QuoteRequest, CommercialOffer, Shipment и документов: внутреннюю себестоимость, клиентскую цену, маржу, расходы, ручные счета/платежи, закрывающие документы и проверяемые dashboards без платёжного провайдера, реальных цен или догадок по открытым правилам.

## Подтверждённые основания

- итоговую цену и маржу устанавливает менеджер, а логист возвращает ставку и условия — D-008;
- финансовые статусы первой версии бухгалтер меняет вручную — D-018;
- низкую маржу согласует руководитель продаж — D-028/D-040;
- клиент не видит себестоимость, маржу, перевозчика и staff-only данные — D-036;
- последовательность закрытия: доставка → АВР обеих сторон → оплата → возврат документов — D-037;
- нужен dashboard руководителя продаж — D-038;
- базовый financial workflow является стартовым шаблоном, а не окончательным универсальным процессом — D-074.

## Scope Wave 7

1. Добавить роли `accountant`, `sales_head`, `logistics_head` как отдельные memberships; роль не выдаётся через UI-переключатель и может сосуществовать с другой membership того же пользователя.
2. Финансовый read model строится вокруг Shipment и immutable ссылок на выбранный RateQuote и точную CommercialOffer version; amounts не принимаются из клиентского payload.
3. Для одной Shipment хранится versioned finance snapshot: currency, internal cost, client price, margin amount/percent, reason, actor и время.
4. Расходы хранятся отдельно, append-only correction создаёт новую запись; удаление и переписывание истории запрещены.
5. Менеджер в своём canonical assignment видит цену/маржу и может отправить ручной low-margin approval request; автоматический порог не придумывается.
6. `sales_head` tenant-wide видит sales/margin dashboard и approve/reject low-margin request с обязательной причиной.
7. `accountant` tenant-wide вручную ведёт invoices, payments и closing-document states; роль получает client amount/currency, но не internal cost или margin; idempotency, optimistic version и audit обязательны.
8. `logistics_head` видит операционные counts, сроки и internal cost в разрешённом tenant scope, но не client price/margin. Исключение возможно только через отдельную `sales_head`/`accountant` membership, а не через роль логиста.
9. Client получает только свои invoice/payment safe statuses, точную client amount/currency и опубликованные closing documents; internal cost, margin, expenses, partner и staff actor отсутствуют в payload.
10. Dashboard и CSV export используют тот же role-scoped read model. Суммы разных currencies не складываются и показываются отдельными группами; FX conversion отсутствует.
11. Все демонстрационные amounts/currencies/copy помечены `Демо / не является коммерческим предложением`.
12. Production, payment provider, bank sync, 1C/Bitrix, taxes, exchange rates, fiscalization и real commercial data не входят.

## Task-level conservative contract для открытых вопросов

- OQ-004: payment state не блокирует и не запускает Shipment; финансовый контур только фиксирует состояние.
- OQ-025: `closed` не включается автоматически. После подтверждённых delivery, signed act, paid и documents returned объект получает `ready_for_owner_closure`; финальное закрытие остаётся disabled/TBD.
- OQ-049: logistician/logistics_head не получают одновременно client price и internal cost через одну роль; закрытая маржа не выводится.
- Refund/dispute/cancelled branches базового шаблона не активируются без отдельного task revision; существующие данные могут хранить безопасную заметку без изменения канонического state.
- Автоматический low-margin threshold отсутствует. Менеджер явно создаёт approval request, а `sales_head` решает его вручную.

## Минимальная модель

- `ShipmentFinanceSnapshot` — versioned выбранная себестоимость, клиентская цена и вычисленная сервером маржа;
- `ShipmentExpense` — append-only расход или correction;
- `LowMarginApproval` — request/approved/rejected с actor/reason;
- `Invoice` — versioned номер/дата/amount/currency/status и client-safe reference;
- `PaymentRecord` — append-only payment/refund-note record с amount/date/reference;
- `ClosingChecklist` — delivery, act sent/signed, payment received, documents returned, ready-for-closure;
- `FinanceAuditEvent` — before/after, actor, time, reason и idempotency key.

## Права

| Действие | manager | accountant | sales_head | logistics_head | logistician | client | tenant_admin без доп. роли |
|---|---:|---:|---:|---:|---:|---:|---:|
| Свой client price и margin | Да | Client amount без margin | Tenant-wide | Нет | Нет | Только client amount | Tenant-wide read |
| Internal cost | Свой scope | Нет | Да | Да | Ставки без client price | Нет | Tenant-wide read |
| Расходы | Create/correct в своём scope | Нет | Читать | Читать | Нет | Нет | Tenant-wide read |
| Invoice/payment mutation | Нет | Да | Читать | Нет | Нет | Нет | Нет |
| Low-margin request | Создать | Читать | Решить | Нет | Нет | Нет | Нет |
| Sales dashboard | Свой scope | Payment summary без cost/margin | Tenant-wide | Нет | Нет | Нет | Tenant-wide read |
| Logistics dashboard | Ограниченно | Tenant-wide | Tenant-wide summary | Tenant-wide | Свой scope | Нет | Operational audit only |

## Acceptance criteria

- composite tenant/client/Shipment references отклоняют cross-workspace links;
- role matrix enforced на сервере и direct ID не раскрывает существование чужого объекта;
- snapshot неизменяем, новая версия требует reason и exact source versions;
- margin вычисляется сервером и не принимается как authoritative input;
- expenses/payments/corrections append-only и идемпотентны;
- invoice/closing transitions запрещают пропуск обязательного предыдущего шага;
- полный Shipment `closed` не создаётся в этой wave;
- client payload не содержит internal cost, margin, expense, partner, staff actor или internal reference;
- dashboards, cards, list counts и exports совпадают при одинаковом scope;
- multi-currency totals разнесены по currency без фиктивного FX;
- migration/reapply/backup/restore и regressions проходят;
- exact managed preview и private stacked PR имеют redacted evidence.

## Связи

- Decisions: D-008, D-018, D-028, D-036…D-038, D-040, D-074.
- Open questions: OQ-004, OQ-025, OQ-049.
- Pages: AC-001, SH-001, SH-002, LH-001.
- Roadmap: этап 10.
