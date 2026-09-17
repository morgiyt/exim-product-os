---
task_id: TASK-2026-008
title: Канонические задачи, чаты и in-app уведомления
revision: 1
release: Full Product / Wave 6
product_module: Private Operating OS
status: in_progress
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-008-r1
application_repository: https://github.com/morgiyt/exim-super-app.git
application_base_branch: task/TASK-2026-007-crm-clients
application_expected_head: 857725a5f86015129378e54ea8f72ac86ba10d6a
target_environment: managed preview, synthetic data only
---

# TASK-2026-008 — Канонические задачи, чаты и in-app уведомления

## Авторизация и цель

Владелец утвердил full-product roadmap и непрерывное выполнение до функционально полного release candidate. TASK-2026-007 сдана private PR #4 и не объявляется accepted. Эта волна является отдельным stacked continuation.

Цель — заменить localStorage и неработающие Supabase table/realtime paths одним tenant-safe server domain: внутренние задачи, комментарии, client/internal conversations, attachments, read state и in-app notifications.

## Authoritative handoff

- Product OS: immutable `product-os-task-2026-008-r1`.
- Application repo: private `https://github.com/morgiyt/exim-super-app.git`.
- Stacked base: `task/TASK-2026-007-crm-clients` @ `857725a5f86015129378e54ea8f72ac86ba10d6a`.
- Feature branch: `task/TASK-2026-008-tasks-chats-notifications`.
- PR target: `task/TASK-2026-007-crm-clients`.
- Environment: managed preview, synthetic test data only.
- Production, real customer data and public integrator repository are forbidden.

## Scope

1. Additive migration: canonical tasks/comments, conversations/members/messages/attachments, notifications/preferences/outbox fields and composite tenant references.
2. Server domain API/read models; no generic table proxy, localStorage source of truth or Supabase Realtime write path.
3. Internal tasks for manager/logistician/tenant-admin with exact same-workspace assignee and optional verified link to Lead/QuoteRequest/Shipment/Trip/ClientCompany.
4. Task lifecycle, optimistic version, idempotency, due/overdue, append-only comments/corrections and audit.
5. Internal conversations only for explicit staff members; client conversations only for one client company and current allowed manager contour.
6. Append-only messages/corrections, per-member read state and server-owned attachments with direct-ID authorization.
7. In-app notifications for assignment/reassignment, due/overdue, comments, allowed messages and access changes; dedupe and preferences.
8. Security/access notification categories cannot be disabled; external channels remain disabled.
9. Task/chat/notification counts are integrated into the common role-scoped read model and navigation badges.
10. List/kanban/cards/conversation/notification center/preferences, stable routes, reload/Back/Forward and mobile states.
11. Seven-account isolation, stale/replay/foreign/direct-file negative tests, migration/reapply/restore and existing-flow regressions.
12. Exact managed preview, private stacked PR, redacted submission/evidence; no self-merge or acceptance.

## Вне scope

- email/SMS/WhatsApp/Telegram/web push и external adapters;
- bots, autoreplies, Jarvis/AI responses, calls/video/voice notes;
- legal SLA, penalties, HR automation и real escalation policy;
- Exchange messaging, billing, KYC/moderation и production;
- universal workflow editor и визуальный редизайн.

## Связи

- Requirement: REQ-012.
- Pages: общие `Задачи`, `Чаты`, `Уведомления`; linked cards QuoteRequest/Shipment/Trip/ClientCompany.
- Decisions: D-016, D-017, D-065…D-074, D-086…D-089.
- Open questions и TBD внешних каналов не реализуются.

## Preflight и ограничения

- подтвердить exact roots/origins/base/head/clean state и immutable Product OS ref;
- Product OS read-only во время application implementation;
- actor/workspace/client company/sender/author/assignee выводятся сервером;
- client не получает internal task, conversation, attachment, staff identity или audit payload;
- production, real PII, реальные коммерческие значения, destructive cleanup и self-acceptance запрещены.

## Миграции и rollback

- новый последовательный migration ID с checksum;
- apply/reapply обязательны;
- fresh backup и isolated restore rehearsal;
- legacy task/chat/message rows сохраняются и получают документированную compatibility/backfill strategy без double-write;
- rollback приложения возвращает предыдущий image; additive schema не удаляется вслепую.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-008-01 | Additive schema содержит tenant-safe tasks/comments, conversations/members/messages/attachments и notifications/preferences; cross-workspace/client links невозможны. | Migration + DB constraints | Да |
| AC-008-02 | manager/logistician/admin работают только в разрешённом scope; client видит только client conversation; A1/A2/B1 и foreign direct IDs дают safe denial. | API authorization + seven-account E2E | Да |
| AC-008-03 | Task lifecycle, exact assignee, optimistic version и idempotency enforced; stale/arbitrary/foreign assignment rejected. | Domain positive/negative tests | Да |
| AC-008-04 | Due/overdue, priority, reassignment и append-only comments/corrections сохраняют actor/time/history и не меняют status автоматически. | API/domain + card E2E | Да |
| AC-008-05 | Linked task принимает только существующий Lead/QuoteRequest/Shipment/Trip/ClientCompany того же workspace и отображается в обеих карточках с согласованными counts. | Composite-link tests + browser | Да |
| AC-008-06 | Internal conversation требует explicit staff membership; client conversation ограничена одной client company и current manager contour без internal disclosure. | Authorization + manager/client E2E | Да |
| AC-008-07 | Messages append-only, correction создаёт новую запись, read state per member переживает reload; attachment upload/download имеет MIME/size/checksum и direct-ID guard. | API/file/browser E2E | Да |
| AC-008-08 | In-app notification создаётся один раз на domain event, имеет safe target, mark read/all read и preferences; mandatory security/access category нельзя отключить. | Outbox/dedupe/preferences tests | Да |
| AC-008-09 | Dashboard/navigation/list/card/conversation/notification counts согласованы; search/filters и safe projections соответствуют role scope. | Browser/API consistency | Да |
| AC-008-10 | Stable routes, reload, Back/Forward, loading/empty/error/forbidden/not-found/retry и 360/375/390 работают. | Browser multi-viewport E2E | Да |
| AC-008-11 | Legacy localStorage/Supabase active writes удалены; auth/CRM/quote/offer/shipment/tracking/documents regressions проходят; backup restore PASS. | Inventory/regression/restore | Да |
| AC-008-12 | Tests/typecheck/lint/build/checks, exact managed preview, private stacked PR и redacted submission evidence проходят; production/real data/Product OS implementation tree не изменены. | CI/deploy/submission evidence | Да |

## Deliverables

- application migration, domain API/read models, UI и tests;
- seven-account task/chat/notification smoke и browser/mobile evidence;
- exact managed preview code commit;
- private stacked PR на TASK-2026-007 branch;
- migration/reapply/isolated restore evidence;
- append-only submission и evidence manifest;
- independent review и human acceptance отдельно.

## Stop conditions

- exact stacked base отсутствует или dirty/mismatched;
- требуется внешний message channel, Jarvis response или real SLA;
- membership/client-company/direct-file scope недоказуем;
- требуется production, real PII, destructive rewrite или self-acceptance.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-17 | proposed | in_progress | Product owner authorization + task curator | Full-product roadmap и непрерывное выполнение утверждены; TASK-2026-007 сдана private PR #4, communication wave открыта stacked без заявления acceptance |
