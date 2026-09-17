# Текущее состояние EXIM Super App

**Последняя проверка baseline:** 2026-09-17

**Managed preview:** <https://superapp.185-129-49-242.sslip.io/app>

**Application repository:** <https://github.com/morgiyt/exim-super-app> — private

**Application branch:** `task/TASK-2026-004-stable-shell-read-model`

**Branch head:** `7542e1d`

**Exact deployed application code:** `afc85f6feb6dda989b6efda8aec6d5b1a0527e86`

**Product OS:** 0.6.0 — draft

## Итог

Состояние: **self-hosted functional alpha / foundation in progress**.

Исторический Vercel/Supabase вариант больше не является текущим техническим baseline. Существующий код перенесён в отдельный managed preview рядом с Hub и Daily, но не смешан с ними. Runtime Supabase заменён на собственную server-side auth/session модель, PostgreSQL 16, приватное файловое хранилище и отдельные backup volumes.

Это не production-ready продукт: серверный фундамент работает, но большая часть legacy интерфейса ещё не переведена на полноценные domain write API, сквозной Private OS не завершён, Exchange отсутствует. Дальнейшая разработка идёт только в приватном репозитории владельца.

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
- локальные checks последней проверки: typecheck, lint, 22 tests и production build — PASS.

## Реализовано частично

- shell и legacy разделы загружаются, но их write parity ещё не подтверждена;
- orders/CRM/tasks/chats/shipments/tracking имеют schema/legacy UI, но не полный server domain API;
- client/manager/logistician/tenant-admin accounts и full seven-account/two-tenant acceptance matrix созданы на synthetic preview;
- документы server-side работают, но полный visibility/version/replacement contract ещё впереди;
- dashboard и legacy списки пока могут показывать разные counts при одном server scope; это активный scope TASK-2026-004.

## Не готово

- полный путь request → rates → offer → agreement → shipment → trips → tracking → closing;
- versioned workflow engine/editor;
- полноценные tenant-admin invitations и multi-membership UX;
- стабильные object URLs, полный search/inbox/dashboard contract;
- финансы, закрытие и достоверная аналитика;
- EXIM Exchange listings/search/responses/trust/tariffs;
- API/SSO/events с Hub и контекстный Jarvis;
- design handoff, release hardening и production cutover.

## Delivery state

- старые публичные PR #6 и #7 в репозитории интегратора закрыты, созданные нами remote branches удалены;
- private repository `morgiyt/exim-super-app` содержит `main` на report head `ef411cf` и отдельную active branch TASK-2026-004;
- submission TASK-2026-003 не является acceptance;
- владелец утвердил продолжение по [full-product roadmap](../07-mvp/full-product-roadmap).

## История аудитов

- [Super App live audit 2026-09-04](audits/2026-09-04-super-app-live-audit) — исторический Vercel/Supabase срез;
- [Vercel audit 2026-07-27](audits/2026-07-27-vercel-audit);
- [Production technical recon 2026-07-27](audits/2026-07-27-production-technical-recon).

Исторические отчёты не переписываются. Новый baseline фиксируется отдельными dated reports и exact commits.
