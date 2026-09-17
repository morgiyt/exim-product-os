---
task_id: TASK-2026-009
title: Финансы, закрытие и управленческая аналитика
revision: 1
release: Full Product / Wave 7
product_module: Private Operating OS
status: in_progress
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-009-r1
application_repository: https://github.com/morgiyt/exim-super-app.git
application_base_branch: task/TASK-2026-008-tasks-chats-notifications
application_expected_head: 2a64cb913089da150c37564197dc42c7e4ca591b
target_environment: managed preview, synthetic data only
---

# TASK-2026-009 — Финансы, закрытие и управленческая аналитика

## Авторизация и цель

Владелец утвердил full-product roadmap и непрерывное выполнение. TASK-2026-008 сдана private PR #5 и не объявляется accepted. Эта wave является отдельным stacked continuation этапа 10.

Цель — создать tenant-safe financial/closing/analytics contour без реальных цен, платёжного провайдера и выдумывания OQ-004/OQ-025/OQ-049.

## Authoritative handoff

- Product OS: immutable `product-os-task-2026-009-r1`.
- Application repo: private `https://github.com/morgiyt/exim-super-app.git`.
- Stacked base: `task/TASK-2026-008-tasks-chats-notifications` @ `2a64cb913089da150c37564197dc42c7e4ca591b`.
- Feature branch: `task/TASK-2026-009-finance-closing-analytics`.
- PR target: `task/TASK-2026-008-tasks-chats-notifications`.
- Environment: managed preview, synthetic test data only.
- Production, real customer data and public integrator repository are forbidden.

## Scope

1. Additive roles `accountant`, `sales_head`, `logistics_head` and tenant-safe finance schema from REQ-013.
2. Versioned ShipmentFinanceSnapshot from exact RateQuote/CommercialOffer sources; server-calculated margin.
3. Append-only expenses/corrections and audit.
4. Manual low-margin approval request by manager and decision by sales head; no automatic threshold.
5. Manual invoice/payment/closing document workflow by accountant with optimistic version/idempotency.
6. Client-safe invoice/payment/closing projection and published documents only.
7. Sales dashboard, logistics dashboard, accountant workspace and role-scoped CSV export.
8. Currency-separated totals; no FX conversion.
9. OQ-004/OQ-025/OQ-049 conservative contract enforced server-side.
10. Common counts/routes/error/mobile states and existing-flow regression.
11. Expanded synthetic role matrix, cross-tenant/direct-ID/export negatives, migration/reapply/restore.
12. Exact managed preview, private stacked PR and redacted evidence.

## Вне scope

- real prices/currencies/thresholds, taxes, fiscalization, bank/1C/Bitrix sync;
- payment provider, automatic write-off, refunds/dispute lifecycle;
- automatic shipment gate from payment state;
- final `closed` transition before OQ-025;
- Exchange billing/subscriptions, production и redesign.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-009-01 | Additive schema/roles/constraints tenant-safe; cross-workspace Shipment/source/client links невозможны. | Migration + DB constraints | Да |
| AC-009-02 | accountant/sales_head/logistics_head/manager/logistician/client/admin получают только REQ-013 scope; foreign/direct IDs дают safe denial. | Authorization + expanded-role E2E | Да |
| AC-009-03 | Finance snapshot ссылается на exact RateQuote/CommercialOffer versions, versioned/idempotent, margin вычисляется сервером. | Domain positive/negative tests | Да |
| AC-009-04 | Expense/payment/correction append-only; actor/time/reason/history сохраняются; stale/replay/changed-payload rejected. | API/domain E2E | Да |
| AC-009-05 | Manager создаёт manual low-margin request; только sales_head approve/reject exact version с причиной; threshold отсутствует. | Role/version E2E + browser | Да |
| AC-009-06 | Accountant проводит invoice/payment/closing sequence без пропуска шагов; `closed` не создаётся, OQ-004 не превращается в shipment gate. | Workflow positive/negative tests | Да |
| AC-009-07 | Client видит только own client amount/currency, safe statuses и published documents; cost/margin/expenses/partner/staff fields отсутствуют. | Payload assertions + client E2E | Да |
| AC-009-08 | Sales/logistics/accountant dashboards, source cards и exports дают одинаковые role-scoped counts; currencies не смешиваются. | Browser/API/export consistency | Да |
| AC-009-09 | Stable routes, reload, Back/Forward, loading/empty/error/forbidden/not-found/retry и 360/375/390 работают. | Browser multi-viewport E2E | Да |
| AC-009-10 | Demo amounts/copy видимо маркированы; real prices, provider, bank/1C/Bitrix/FX отсутствуют. | Source/UI inventory | Да |
| AC-009-11 | Existing auth/CRM/quote/offer/shipment/tracking/documents/tasks/chats regressions, migration reapply и isolated restore PASS. | Regression/restore | Да |
| AC-009-12 | Tests/typecheck/lint/build/checks, exact managed preview, private stacked PR и redacted evidence PASS; production/real data не изменены. | CI/deploy/submission | Да |

## Deliverables

- migration, finance domain API/read models, role-scoped UI/export и tests;
- expanded-role synthetic smoke и browser/mobile evidence;
- exact managed preview code commit;
- private stacked PR на TASK-2026-008 branch;
- migration/reapply/isolated restore evidence;
- append-only submission/evidence; independent review и human acceptance отдельно.

## Stop conditions

- требуется реальный threshold, FX rate, payment provider, tax/legal rule или production;
- OQ-004/OQ-025/OQ-049 приходится закрывать предположением;
- role/direct-ID/client projection невозможно доказать;
- exact base dirty/mismatched или требуется destructive rewrite.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-17 | proposed | in_progress | Product owner authorization + task curator | Full-product roadmap утверждён; TASK-2026-008 сдана private PR #5, finance wave открыта stacked без заявления acceptance |
