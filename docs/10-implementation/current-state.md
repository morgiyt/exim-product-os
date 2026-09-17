# Текущее состояние EXIM Super App

**Последняя проверка baseline:** 2026-09-17

**Managed preview:** <https://superapp.185-129-49-242.sslip.io/app>

**Application repository:** <https://github.com/alanbykov11work-ux/exim>

**Application branch:** `task/TASK-2026-002-self-hosted-postgres`

**Branch head:** `b3dd29751fbb9a6334f255e58576764dd44a29cd`

**Exact deployed application code:** `2a140832b81a363c4589a6b781b12ed4cc67d1ed`

**Product OS:** 0.6.0 — draft

## Итог

Состояние: **self-hosted functional alpha / foundation in progress**.

Исторический Vercel/Supabase вариант больше не является текущим техническим baseline. Существующий код перенесён в отдельный managed preview рядом с Hub и Daily, но не смешан с ними. Runtime Supabase заменён на собственную server-side auth/session модель, PostgreSQL 16, приватное файловое хранилище и отдельные backup volumes.

Это не production-ready продукт: серверный фундамент работает, но большая часть legacy интерфейса ещё не переведена на полноценные domain write API, сквозной Private OS не завершён, Exchange отсутствует, а application PR #6 ожидает независимый review.

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
- локальные checks последней проверки: typecheck, lint, 17 tests и production build — PASS.

## Реализовано частично

- shell и legacy разделы загружаются, но их write parity ещё не подтверждена;
- orders/CRM/tasks/chats/shipments/tracking имеют schema/legacy UI, но не полный server domain API;
- client/manager/logistician/tenant-admin accounts существуют, но full seven-account/two-tenant acceptance matrix ещё не завершена;
- документы server-side работают, но полный visibility/version/replacement contract ещё впереди;
- current actor выбирается из membership, однако до TASK-2026-003 выбор при нескольких memberships не является явным session context.

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

- application PR [#6](https://github.com/alanbykov11work-ux/exim/pull/6) открыт и ждёт requested review от code owner;
- submission не является acceptance;
- владелец утвердил продолжение по [full-product roadmap](../07-mvp/full-product-roadmap);
- TASK-2026-003 ведётся stacked от exact head PR #6 и не может быть слит в `main`, пока base dependency не включён или безопасно не rebased.

## История аудитов

- [Super App live audit 2026-09-04](audits/2026-09-04-super-app-live-audit) — исторический Vercel/Supabase срез;
- [Vercel audit 2026-07-27](audits/2026-07-27-vercel-audit);
- [Production technical recon 2026-07-27](audits/2026-07-27-production-technical-recon).

Исторические отчёты не переписываются. Новый baseline фиксируется отдельными dated reports и exact commits.
