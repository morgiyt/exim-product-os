# Текущее состояние EXIM Super App

**Последняя проверка baseline:** 2026-09-17

**Managed preview:** <https://superapp.185-129-49-242.sslip.io/app>

**Application repository:** <https://github.com/morgiyt/exim-super-app> — private

**Application branch:** `task/TASK-2026-010-workflow-template-studio` (active stacked wave поверх submitted TASK-2026-009)

**Stacked base head:** `2c3b4844365500481665f1071c5486aeced7efd7`

**Exact deployed application code:** `d4f436fb0ea7ec6b9de85d40651c9e7498ff369c`

**Product OS:** 0.6.0 — draft

## Итог

Состояние: **self-hosted functional alpha / Private OS operational core implemented, editor and Exchange in progress**.

Исторический Vercel/Supabase вариант больше не является текущим техническим baseline. Существующий код перенесён в отдельный managed preview рядом с Hub и Daily, но не смешан с ними. Runtime Supabase заменён на собственную server-side auth/session модель, PostgreSQL 16, приватное файловое хранилище и отдельные backup volumes.

Это не production-ready продукт: серверный фундамент, CRM, расчёт, предложение, договорный gate, Shipment/Trip, tracking/documents, задачи/чаты/уведомления и manual finance/closing contour работают. Полный workflow editor, Exchange, trust/tariffs, integrations и release hardening ещё не завершены. Дальнейшая разработка идёт только в приватном репозитории владельца.

## Подтверждено в текущем baseline

- отдельные процессы, PostgreSQL, документы, backups и секреты Super App;
- БД не имеет публичного host port;
- регистрация создаёт user/profile/organization/workspace/client company/client membership;
- login, session cookie, logout, password flow и membership guard;
- server API для profile, user state, files и read-only workflow snapshot;
- workspace/client-company columns и composite references в private business tables;
- migration checksum, backup/export/restore scripts и health endpoints;
- synthetic preview data only;
- Hub и Daily не используют Super App DB, cookies или secrets;
- explicit workspace/role context и server-side module guards;
- seven-account/two-tenant A1/A2/B1 acceptance matrix — PASS 7/7;
- единый server-derived read model синхронизирует dashboard/workflow/shipments/inbox/search;
- stable hash routes переживают direct open, reload и Back/Forward;
- client/logistician projections и exact scoped search проверены семью synthetic accounts;
- 360/375/390 px не имеют page-level overflow в проверенном workflow shell;
- canonical QuoteRequest → две RateQuote → CommercialOffer → exact client decision работает через server domain API;
- AgreementBasis → exactly one Shipment → Trip → in_transit, safe tracking publication и versioned documents работают;
- dashboard и Shipment list используют согласованные canonical counts; stable route/reload/Back/Forward проверены;
- role payload boundaries, direct-ID file authorization и A1/A2/B1 isolation подтверждены seven-account smoke;
- canonical Lead → ClientCompany/Contact/ManagerAssignment → draft QuoteRequest работает через server domain API без legacy order double-write;
- CRM dashboard/kanban/list/cards, manager transfer history, exact search, stable route/reload и 360/375/390 проверены;
- canonical tasks/comments/chats/attachments/read state/in-app notifications работают через server domain API; protected files, dedupe и linked business cards проверены;
- tenant-safe finance snapshots, server margin, expenses/corrections, low-margin approval, invoice/payment/closing и role-scoped dashboards/CSV работают на synthetic preview;
- accountant/sales_head/logistics_head contexts, correction reopen/re-ready, foreign/direct-ID payload boundaries и currency-separated totals проверены;
- локальные checks последней проверки: typecheck, lint, 55/55 tests и production build — PASS;
- fresh backup `20260917T185629Z` прошёл checksum и isolated no-port restore с 7 migrations;
- private PR #1…#6 существуют как отдельный stacked chain и не self-merged.

## Реализовано частично

- shell и server read path работают, но legacy write parity ещё не подтверждена;
- client/manager/logistician/tenant-admin accounts и full seven-account/two-tenant acceptance matrix созданы на synthetic preview;
- shipment documents имеют version, visibility, publication и direct-ID authorization; final Shipment `closed` остаётся отключён до OQ-025;
- workflow templates/instances/versions работают в preset runtime, но tenant editor/activation — active scope TASK-2026-010.

## Не готово

- полный путь после in_transit до closing, включая нерешённые условия OQ-025;
- полный tenant Workflow Template Studio, activation history и typed custom field definitions;
- полноценные tenant-admin invitations и multi-membership UX;
- EXIM Exchange listings/search/responses/trust/tariffs;
- API/SSO/events с Hub и контекстный Jarvis;
- design handoff, release hardening и production cutover.

## Delivery state

- старые публичные PR #6 и #7 в репозитории интегратора закрыты, созданные нами remote branches удалены;
- private repository `morgiyt/exim-super-app` содержит submitted stacked PR #1…#6; editor wave стартует от exact head `2c3b484`;
- submissions TASK-2026-003…009 не являются acceptance;
- владелец утвердил продолжение по [full-product roadmap](../07-mvp/full-product-roadmap).

## История аудитов

- [Super App live audit 2026-09-04](audits/2026-09-04-super-app-live-audit) — исторический Vercel/Supabase срез;
- [Vercel audit 2026-07-27](audits/2026-07-27-vercel-audit);
- [Production technical recon 2026-07-27](audits/2026-07-27-production-technical-recon).

Исторические отчёты не переписываются. Новый baseline фиксируется отдельными dated reports и exact commits.
