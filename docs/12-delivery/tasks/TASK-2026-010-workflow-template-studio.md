---
task_id: TASK-2026-010
title: Workflow Template Studio и безопасная activation
revision: 1
release: Full Product / Wave 8
product_module: Private Operating OS
status: submitted
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-010-r1
application_repository: https://github.com/morgiyt/exim-super-app.git
application_base_branch: task/TASK-2026-009-finance-closing-analytics
application_expected_head: 2c3b4844365500481665f1071c5486aeced7efd7
target_environment: managed preview, synthetic data only
---

# TASK-2026-010 — Workflow Template Studio и безопасная activation

## Авторизация и цель

Владелец утвердил full-product roadmap и непрерывное выполнение. TASK-2026-009 сдана private PR #6, exact runtime `d4f436f`, 55/55 tests и 3/3 GitHub checks PASS; acceptance не заявляется.

Цель — реализовать REQ-014: tenant-safe form-based editor и immutable activation версий QuoteRequest/Shipment/Trip без миграции действующих объектов и без закрытия OQ-029…032/OQ-044 предположением.

## Authoritative handoff

- Product OS: immutable `product-os-task-2026-010-r1`.
- Application repo: private `https://github.com/morgiyt/exim-super-app.git`.
- Stacked base: `task/TASK-2026-009-finance-closing-analytics` @ `2c3b4844365500481665f1071c5486aeced7efd7`.
- Feature branch: `task/TASK-2026-010-workflow-template-studio`.
- PR target: `task/TASK-2026-009-finance-closing-analytics`.
- Environment: managed preview, synthetic test data only.
- Production, real customer data and public integrator repository are forbidden.

## Scope

1. Tenant-safe draft/version/activation/field/notification schema from REQ-014.
2. Editor only for existing QuoteRequest, Shipment and Trip templates.
3. Task-level preview actor `tenant_admin`; non-admin and foreign/direct-ID denial.
4. Clone active version → mutable optimistic draft; append-only audit.
5. Form-based stages, transitions, typed fields and immediate in-app rules.
6. Deterministic graph/client-layer/runtime compatibility validation.
7. Preview, role matrix and diff without activation side effects.
8. Exact checksum + reason activation into immutable version.
9. Existing instances pinned; new instances use active version.
10. Reactivation of previous immutable version for new objects only.
11. Stable routes, states, accessibility/mobile and existing-flow regression.
12. Expanded tenant-admin smoke, migration/reapply/restore, exact preview, private PR and redacted evidence.

## Task-level defaults, не закрывающие OQ

- `tenant_admin` управляет drafts/activation только в synthetic preview; постоянная governance остаётся OQ-030.
- System templates read-only; inheritance/override не реализуются до OQ-044.
- Новые object types запрещены до OQ-029.
- Автоматическая migration existing instances запрещена до OQ-031.
- Только immediate in-app notifications; SLA/escalations запрещены до OQ-032.

## Вне scope

- Exchange workflow/editor;
- system-template inheritance и cross-tenant copy;
- in-flight instance migration;
- arbitrary scripts/formulas/SQL/pricing logic;
- time-based escalation и external channels;
- drag-and-drop canvas requirement;
- production, real data, redesign и закрытие OQ.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-010-01 | Additive schema/constraints tenant-safe; cross-workspace template/draft/version/activation links невозможны. | Migration + DB constraints | Да |
| AC-010-02 | Только active tenant_admin preview context мутирует own tenant drafts; other roles/tenant/direct IDs получают safe denial. | Authorization + multi-account E2E | Да |
| AC-010-03 | Clone/create/save draft versioned/idempotent; stale version и changed-payload reuse rejected без потери draft. | API/domain E2E | Да |
| AC-010-04 | Stage/transition validation проверяет codes, one start, reachability, terminal/dead-end, roles и required data. | Positive/negative validation suite | Да |
| AC-010-05 | Typed fields и sensitivity allowlist валидируются; staff-only definition/value не попадает client projection. | Schema/payload assertions | Да |
| AC-010-06 | Только immediate in-app notification rules; recipient scope/dedupe/client-safe copy PASS; external/escalation paths отсутствуют. | Notification E2E + source inventory | Да |
| AC-010-07 | Preview/diff/role matrix не меняют active version и instance data. | Browser/API state assertions | Да |
| AC-010-08 | Activation требует validation PASS, exact checksum и reason; создаёт immutable version/activation audit атомарно. | Transaction/version E2E | Да |
| AC-010-09 | Existing instances остаются pinned; new objects используют новую active version; reactivation меняет default только для новых. | Cross-version object E2E | Да |
| AC-010-10 | Stable list/template/draft routes, reload, Back/Forward, errors/retry/conflict, keyboard и 360/375/390 PASS. | Browser multi-viewport E2E | Да |
| AC-010-11 | Existing auth/CRM/quote/offer/shipment/trip/tracking/docs/tasks/chats/finance regressions, migration reapply и isolated restore PASS. | Regression/restore | Да |
| AC-010-12 | Tests/typecheck/lint/build/checks, exact managed preview, private stacked PR и redacted evidence PASS; production/real data untouched. | CI/deploy/submission | Да |

## Stop conditions

- требуется выбрать постоянную governance, новый object type, inheritance или migration policy;
- требуется time-based escalation/external delivery;
- validation не может гарантировать runtime/client boundary;
- exact base dirty/mismatched или требуется destructive rewrite;
- доступна только production/real data.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-18 | proposed | in_progress | Product owner authorization + task curator | Full-product roadmap продолжен безопасным editor scope после private submission TASK-2026-009; открытые OQ сохранены |
| 2026-09-18 | in_progress | submitted | Codex implementation agent + task curator | Private PR #7, exact runtime `b3da470`, 62/62 tests, browser/mobile, backup/isolated restore и 3/3 checks PASS; acceptance не заявляется |
