# Текущее состояние EXIM Super App

**Последняя проверка baseline:** 2026-09-17

**Managed preview:** <https://superapp.185-129-49-242.sslip.io/app>

**Application repository:** <https://github.com/morgiyt/exim-super-app> — private

**Application branch:** `task/TASK-2026-008-tasks-chats-notifications` (active stacked wave поверх submitted TASK-2026-007)

**Stacked base head:** `857725a5f86015129378e54ea8f72ac86ba10d6a`

**Exact deployed application code:** `33cadb7fd90e8b009d99ffeccab8f190af689b80`

**Product OS:** 0.6.0 — draft

## Итог

Состояние: **self-hosted functional alpha / Private OS core in progress**.

Исторический Vercel/Supabase вариант больше не является текущим техническим baseline. Существующий код перенесён в отдельный managed preview рядом с Hub и Daily, но не смешан с ними. Runtime Supabase заменён на собственную server-side auth/session модель, PostgreSQL 16, приватное файловое хранилище и отдельные backup volumes.

Это не production-ready продукт: серверный фундамент, CRM и сквозной путь от QuoteRequest до Shipment/Trip in_transit работают, но коммуникации, финансы, полное закрытие, Exchange и release hardening ещё не завершены. Дальнейшая разработка идёт только в приватном репозитории владельца.

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
- локальные checks последней проверки: typecheck, lint, 42/42 tests и production build — PASS;
- private PR #1/#2/#3/#4 существуют как отдельный stacked chain и не self-merged.

## Реализовано частично

- shell и server read path работают, но legacy write parity ещё не подтверждена;
- tasks/chats/notifications имеют schema/legacy UI/localStorage paths, но не canonical server domain API;
- client/manager/logistician/tenant-admin accounts и full seven-account/two-tenant acceptance matrix созданы на synthetic preview;
- shipment documents имеют version, visibility, publication и direct-ID authorization; closing documents после in_transit остаются вне текущего workflow;
- tasks/comments/chats/attachments/read state/notifications — active scope TASK-2026-008.

## Не готово

- полный путь после in_transit до closing, включая нерешённые условия OQ-025;
- versioned workflow engine/editor;
- полноценные tenant-admin invitations и multi-membership UX;
- финансы, закрытие и достоверная аналитика;
- EXIM Exchange listings/search/responses/trust/tariffs;
- API/SSO/events с Hub и контекстный Jarvis;
- design handoff, release hardening и production cutover.

## Delivery state

- старые публичные PR #6 и #7 в репозитории интегратора закрыты, созданные нами remote branches удалены;
- private repository `morgiyt/exim-super-app` содержит submitted stacked PR #1…#4; новая communication wave стартует от exact head `857725a`;
- submissions TASK-2026-003…007 не являются acceptance;
- владелец утвердил продолжение по [full-product roadmap](../07-mvp/full-product-roadmap).

## История аудитов

- [Super App live audit 2026-09-04](audits/2026-09-04-super-app-live-audit) — исторический Vercel/Supabase срез;
- [Vercel audit 2026-07-27](audits/2026-07-27-vercel-audit);
- [Production technical recon 2026-07-27](audits/2026-07-27-production-technical-recon).

Исторические отчёты не переписываются. Новый baseline фиксируется отдельными dated reports и exact commits.
