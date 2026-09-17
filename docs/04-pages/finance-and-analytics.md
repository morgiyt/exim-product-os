# Финансы, закрытие и управленческая аналитика

Контракты ниже относятся к Private Operating OS и TASK-2026-009. Они не являются бухгалтерской, налоговой или платёжной системой и работают только на synthetic preview до отдельного production decision.

## Общие границы

- Каждое чтение и действие ограничено session, workspace, membership, role и client scope на сервере.
- Amounts хранят decimal + currency; разные currencies не суммируются без утверждённого FX source.
- Все demo values имеют видимую маркировку `Демо / не является коммерческим предложением`.
- Empty/loading/error/forbidden/not-found/retry обязательны; stable route переживает Reload и Back/Forward.
- Любая correction создаёт новую запись/version и audit; overwrite/delete history запрещены.

## AC-001 — Счета, оплаты и закрытие

**Цель:** бухгалтер вручную фиксирует invoice/payment/closing state конкретной Shipment.

**Модуль и доступ:** Private OS; `accountant` tenant-wide. Manager, sales head и client получают только разрешённые read projections. Tenant admin без accountant membership не меняет финансы.

**Данные:** Shipment ref, client company, exact offer version, client amount/currency, invoices, append-only payments, closing checklist, published client documents и audit.

**Действия:** создать новую invoice version; перевести `not_invoiced → invoiced → awaiting_payment → partially_paid → paid`; записать payment; исправить payment новой correction; отметить act sent/signed и documents returned; получить `ready_for_owner_closure`.

**Ограничения:** нельзя перепрыгнуть обязательный шаг; `closed` disabled до OQ-025; payment не запускает/останавливает Shipment по OQ-004; нет provider/bank/1C sync.

**Приёмка:** stale/replay/foreign/direct-ID negative tests; сумма payments согласована с invoice; client projection безопасна; CSV export повторяет текущий scope.

## SH-001 — Dashboard руководителя продаж

**Цель:** tenant-wide контроль лидов, расчётов, предложений, цен, маржи, отказов, перевозок, invoices и payments по D-038.

**Модуль и доступ:** Private OS; `sales_head`. Manager видит тот же набор метрик только в своём canonical client scope.

**Блоки:** pipeline counts, conversion, sent offers, won/lost reasons, active shipments, client price/internal cost/margin по currency, overdue invoices, payment states, manager breakdown и period filter.

**Действия:** фильтровать период/менеджера/status/currency; открыть source card; экспортировать текущий scope; перейти в low-margin queue.

**Ограничения:** нет фиктивного FX, forecast или AI prediction; значения берутся из тех же canonical read models, что карточки.

**Приёмка:** dashboard/list/card/export counts совпадают; foreign tenant и logistic roles denied; пустой период не подменяется demo result.

## SH-002 — Согласование низкой маржи

**Цель:** выполнить D-028 без выдуманного автоматического порога.

**Модуль и доступ:** manager создаёт request в своём scope; `sales_head` tenant-wide решает request.

**Данные:** exact finance snapshot/version, amount/currency, margin, причина менеджера, decision/reason, actor/time/history.

**Действия:** submit; approve; reject; повторно открыть только новой request version после изменения предложения.

**Ограничения:** автоматический threshold отсутствует; accountant и tenant admin без sales-head membership не принимают решение; client/logistician не видят объект.

**Приёмка:** exact version guard, idempotent replay, stale rejection, mandatory reason и immutable decision history.

## LH-001 — Dashboard логистики

**Цель:** руководитель логистики контролирует расчёты, сроки, перевозки, проблемы, рейсы и internal cost без раскрытия клиентской маржи.

**Модуль и доступ:** `logistics_head` tenant-wide; logistician видит свой operational scope; `sales_head` может иметь отдельный summary через свою membership.

**Блоки:** расчёты в работе/без ответа, индивидуальные expected dates, active shipments/trips, overdue work tasks, problem flags, tracking freshness, internal cost по currency и team breakdown.

**Действия:** фильтровать, открыть source card, экспортировать operational scope.

**Ограничения:** client price/margin отсутствуют для logistics roles по OQ-049; нет real SLA penalties и forecast.

**Приёмка:** counts совпадают с source queues; scope не расширяется через search/export; mobile и empty/error states работают.
