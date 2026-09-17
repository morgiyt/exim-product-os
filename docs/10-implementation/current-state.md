# Текущее состояние EXIM Super App

**Последняя проверка baseline:** 2026-09-18

**Managed preview:** <https://superapp.185-129-49-242.sslip.io/app>

**Application repository:** <https://github.com/morgiyt/exim-super-app> — private

**Application branch:** `task/TASK-2026-013-exchange-trust-safety` (active stacked wave поверх submitted TASK-2026-012)

**Stacked base head:** `4689ac079f8762ab0e6936012424a2bebcf3dbe1`

**Exact deployed application code:** `10fa061570313c2022dc239171cb3fe70843d3ea`

**Product OS:** 0.6.0 — draft

## Итог

Состояние: **self-hosted functional alpha / Private OS operational core, Workflow Template Studio и Exchange listings/search/responses implemented; trust/safety in progress**.

Исторический Vercel/Supabase вариант больше не является текущим техническим baseline. Существующий код перенесён в отдельный managed preview рядом с Hub и Daily, но не смешан с ними. Runtime Supabase заменён на собственную server-side auth/session модель, PostgreSQL 16, приватное файловое хранилище и отдельные backup volumes.

Это не production-ready продукт: серверный фундамент, CRM, расчёт, предложение, договорный gate, Shipment/Trip, tracking/documents, задачи/чаты/уведомления, manual finance/closing contour, Workflow Template Studio и отдельные Exchange listings/search/responses работают. Trust/safety, tariffs, integrations и release hardening ещё не завершены. Дальнейшая разработка идёт только в приватном репозитории владельца.

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
- tenant-safe Workflow Template Studio создаёт optimistic drafts, валидирует stages/transitions/typed fields/notifications, показывает diff/role matrix и активирует immutable versions; existing instances остаются pinned, новые получают current active version;
- отдельные CargoListing/TransportListing, совмещаемые capabilities, entitlement/demo limits, lifecycle, safe public projection и minimum organization profile работают без Private OS conversion;
- все пять transport modes сохраняются typed allowlist, contacts/private/finance fields server-rejected, cross-tenant/direct-ID boundaries подтверждены;
- server-side Exchange search, stable cursor, membership-owned saved searches, safe response lifecycle и unique selection работают без contacts/commercial/private links;
- matched listing исчезает из search, peer responses отклоняются транзакционно, three-organization isolation и Retry failure recovery подтверждены;
- локальные/CI checks последней проверки: typecheck, lint, 78/78 tests и production build — PASS;
- fresh backup `20260917T225153Z` прошёл checksum и isolated no-port restore с 12 migrations;
- private PR #1…#9 существуют как отдельный stacked chain и не self-merged.

## Реализовано частично

- shell и server read path работают, но legacy write parity ещё не подтверждена;
- client/manager/logistician/tenant-admin accounts и full seven-account/two-tenant acceptance matrix созданы на synthetic preview;
- shipment documents имеют version, visibility, publication и direct-ID authorization; final Shipment `closed` остаётся отключён до OQ-025;
- workflow editor использует task-level preview actor `tenant_admin`; system inheritance, in-flight migration и external/SLA notifications остаются отключены до OQ.

## Не готово

- полный путь после in_transit до closing, включая нерешённые условия OQ-025;
- полноценные tenant-admin invitations и multi-membership UX;
- EXIM Exchange trust/tariffs;
- API/SSO/events с Hub и контекстный Jarvis;
- design handoff, release hardening и production cutover.

## Delivery state

- старые публичные PR #6 и #7 в репозитории интегратора закрыты, созданные нами remote branches удалены;
- private repository `morgiyt/exim-super-app` содержит submitted stacked PR #1…#9; Trust & Safety wave стартует от exact head `4689ac0`;
- submissions TASK-2026-003…012 не являются acceptance;
- владелец утвердил продолжение по [full-product roadmap](../07-mvp/full-product-roadmap).

## История аудитов

- [Super App live audit 2026-09-04](audits/2026-09-04-super-app-live-audit) — исторический Vercel/Supabase срез;
- [Vercel audit 2026-07-27](audits/2026-07-27-vercel-audit);
- [Production technical recon 2026-07-27](audits/2026-07-27-production-technical-recon).

Исторические отчёты не переписываются. Новый baseline фиксируется отдельными dated reports и exact commits.
