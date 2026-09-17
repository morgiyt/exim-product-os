---
task_id: TASK-2026-007
title: Канонические CRM, лиды и клиентские компании
revision: 1
release: Full Product / Wave 5
product_module: Private Operating OS
status: in_progress
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-007-r1
application_repository: https://github.com/morgiyt/exim-super-app.git
application_base_branch: task/TASK-2026-006-shipment-execution
application_expected_head: 83164cf690ff004a028dd911921ff0fb4a65707b
target_environment: managed preview, synthetic data only
---

# TASK-2026-007 — Канонические CRM, лиды и клиентские компании

## Авторизация и цель

Владелец утвердил full-product roadmap и непрерывное выполнение до функционально полного release candidate. TASK-2026-006 сдана private PR #3 и не объявляется accepted. Эта волна является отдельным stacked continuation.

Цель — заменить неработающий legacy CRM write path на server-authorized CRM: лиды, клиентские компании, контакты, основной менеджер, обязательная передача, взаимодействия и идемпотентная конверсия в канонический draft QuoteRequest.

## Authoritative handoff

- Product OS: immutable product-os-task-2026-007-r1.
- Application repo: private https://github.com/morgiyt/exim-super-app.git.
- Stacked base: task/TASK-2026-006-shipment-execution @ 83164cf690ff004a028dd911921ff0fb4a65707b.
- Feature branch: task/TASK-2026-007-crm-clients.
- PR target: task/TASK-2026-006-shipment-execution.
- Environment: managed preview, synthetic test data only.
- Production, real customer data and public integrator repository are forbidden.

## Scope

1. Additive CRM migration поверх существующих tenant-safe entities: contacts, manager assignments/transfer notes, interactions, conversions и lead version/audit fields.
2. Server domain API для list/card/create/update/stage/interaction/assignment/transfer/convert; никакого generic browser table write proxy.
3. Manager создаёт и ведёт только доступные ему лиды и client companies; tenant admin получает tenant-wide read/admin assignment layer.
4. Task-approved exim.kz lead lifecycle: new → qualified → proposal → negotiation → won/lost; lost требует причину.
5. У client company ровно один текущий primary manager; несколько контактов разрешены.
6. Передача manager требует current situation, agreed items, problems и next actions; assignment history неизменяема.
7. Interaction history хранит type, time, summary, next action и actor; изменение создаёт новую историю, а не скрытую перезапись.
8. Idempotent conversion создаёт или связывает одну client company и один canonical draft QuoteRequest; incomplete data даёт validation error без partial write и без demo-заполнителей.
9. Client company card агрегирует contacts, assignments, interactions, QuoteRequests, offers, Shipments и published documents из одного role-scoped read model.
10. CRM dashboard/list/kanban/cards/search имеют согласованные counts, owner filter, loss reasons, stable URLs и safe not-found.
11. Seven-account A1/A2/B1 negative matrix, migration/reapply/isolated restore, exact preview и private stacked PR.
12. Existing quote/shipment/auth/profile flows не регрессируют.

## Вне scope

- auto-invite или создание client account при конверсии;
- Bitrix, marketing import/export и внешние message channels;
- общий tasks/chats/notifications engine;
- universal pipeline/workflow editor;
- lead scoring, real commercial amounts, Exchange, billing и production;
- визуальный редизайн.

## Связи

- Requirement: REQ-011.
- Pages: MG-001, MG-002, MG-007; связанные MG-003…MG-006 read links.
- Decisions: D-003, D-005, D-021…D-024, D-038, D-059, D-065.
- Open questions: OQ-001, OQ-002, OQ-023 и внешние уведомления остаются открытыми и не реализуются.

## Preflight и ограничения

- подтвердить exact roots/origins/base/head/clean state и immutable Product OS ref;
- Product OS read-only во время application implementation;
- tenant, role, owner, client company и conversion links проверяются сервером;
- client и logistician не получают CRM route, payload или direct-ID disclosure;
- conversion не пишет legacy orders/leads и не создаёт account/invitation;
- production, real PII, реальные коммерческие значения, destructive cleanup и self-acceptance запрещены.

## Миграции и rollback

- новый последовательный migration ID с checksum;
- apply/reapply обязательны;
- fresh backup и isolated restore rehearsal;
- существующие legacy lead rows сохраняются и получают документированную compatibility strategy без скрытой double-write;
- rollback приложения возвращает предыдущий image; additive schema не удаляется вслепую.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-007-01 | Additive schema содержит tenant-safe contacts, assignments, transfer note, interactions, conversion и lead version/audit; cross-workspace links невозможны. | Migration + DB constraints | Да |
| AC-007-02 | Manager создаёт/редактирует только свой CRM scope; tenant admin читает tenant-wide и управляет assignment; client/logistician/direct foreign ID получают safe denial. | API authorization + seven-account E2E | Да |
| AC-007-03 | Lead lifecycle разрешает только task-approved переходы; optimistic version и idempotency enforced; lost без причины и произвольный stage rejected. | Domain positive/negative tests | Да |
| AC-007-04 | Client company создаётся без дубля по exact ID/BIN в workspace, хранит несколько contacts и ровно один current primary manager. | Transaction/constraint tests + UI | Да |
| AC-007-05 | Manager transfer невозможен без четырёх обязательных блоков; current assignment закрывается, новый открывается, actor/time и обе стороны сохраняются. | API/domain + manager/admin E2E | Да |
| AC-007-06 | Interactions append-only/versioned и содержат type/time/summary/next action/actor; изменения и direct IDs аудируются. | History tests + card E2E | Да |
| AC-007-07 | Conversion с valid data атомарно создаёт/связывает одну company и один canonical draft QuoteRequest; repeat key возвращает те же IDs, invalid input не оставляет partial rows. | Transaction/idempotency E2E | Да |
| AC-007-08 | Конверсия не создаёт client account/invitation, не пишет legacy orders и не включает Bitrix/external messaging. | Negative inventory + reconciliation | Да |
| AC-007-09 | CRM dashboard/list/kanban/lead card/company card показывают согласованные counts, owner/loss filters, related requests/offers/shipments/documents и safe role projections. | Browser/API consistency | Да |
| AC-007-10 | Stable URLs, exact search, reload, Back/Forward, empty/error/forbidden/not-found и 360/375/390 работают. | Browser multi-viewport E2E | Да |
| AC-007-11 | Existing auth, quote, offer, Shipment/Trip/tracking/documents regressions проходят; legacy counts и compatibility strategy документированы; backup restore PASS. | Regression + restore evidence | Да |
| AC-007-12 | Tests/typecheck/lint/build/checks, exact managed preview, private stacked PR и redacted submission evidence проходят; production/real data/Product OS implementation tree не изменены. | CI/deploy/submission evidence | Да |

## Deliverables

- application migration, domain API/read model, CRM UI и tests;
- synthetic seven-account smoke и manager/admin/client browser evidence;
- exact managed preview code commit;
- private stacked PR на TASK-2026-006 branch;
- migration/reapply/isolated restore evidence;
- append-only submission и evidence manifest;
- independent review и human acceptance отдельно.

## Stop conditions

- exact stacked base отсутствует или dirty/mismatched;
- требуется автоматическое приглашение клиента, Bitrix или внешняя отправка;
- бизнес-правило нельзя отделить от OQ/TBD;
- tenant/manager scope, atomic conversion или restore недоказуемы;
- требуется production, real PII, destructive rewrite или self-acceptance.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-17 | proposed | in_progress | Product owner authorization + task curator | Full-product roadmap и непрерывное выполнение утверждены; TASK-2026-006 сдана private PR #3, CRM-волна открыта stacked без заявления acceptance |
