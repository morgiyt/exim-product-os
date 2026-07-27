# Vercel audit 2026-07-27

## Scope

External audit of the published application at <https://exim-super-app.vercel.app/app>.

This audit checks only what was reachable from the public web application without confirmed role credentials. It does not edit the application, delete data, send real messages, make payments, or inspect the application source code.

## Product OS baseline

Requirements were read from Product OS before rewriting this report:

- [Product Foundation](../../01-foundation/product-foundation);
- [Configurable Workflow Foundation](../../01-foundation/configurable-workflow-foundation);
- [От лида до перевозки](../../02-process/lead-to-shipment);
- [Роли](../../02-process/roles);
- [Карта приложения](../../03-product-map/app-map);
- [Права и видимость](../../03-product-map/permissions);
- [Доменная модель](../../03-product-map/domain-model);
- [Реестр страниц](../../04-pages/page-registry);
- [Жизненные циклы](../../05-statuses/lifecycles);
- [MVP v1](../../07-mvp/mvp-v1);
- [Открытые вопросы](../../09-decisions/open-questions).

## Tested pages

| Page | Result |
|---|---|
| `/` | HTTP 307 to `/login` |
| `/app` | HTTP 307 to `/login` |
| `/login` | Public page renders |
| `/register` | Public page renders; test registration leads to verify |
| `/forgot-password` | Public page renders; email sending not tested |
| `/verify` | Public page renders; resend not tested |
| `/app/clients` | HTTP 307 to `/login` without session |
| `/app/requests` | HTTP 307 to `/login` without session |
| `/app/shipments` | HTTP 307 to `/login` without session |
| `/app/documents` | HTTP 307 to `/login` without session |
| `/app/chat` | HTTP 307 to `/login` without session |
| `/app/notifications` | HTTP 307 to `/login` without session |
| `/app/settings` | HTTP 307 to `/login` without session |
| `/app/admin` | HTTP 307 to `/login` without session |
| `/app/logistics` | HTTP 307 to `/login` without session |
| `/app/rates` | HTTP 307 to `/login` without session |
| `/app/tracking` | HTTP 307 to `/login` without session |

## Role coverage

| Role | Status | Reason |
|---|---|---|
| Client | Невозможно проверить | Test account requires email confirmation |
| Manager | Невозможно проверить | No manager credentials provided |
| Logistician | Невозможно проверить | No logistician credentials provided |
| Administrator | Невозможно проверить | No admin credentials provided |

## What really works

- Public login screen renders.
- Public registration screen renders and routes a test registration to email verification.
- Protected routes redirect unauthenticated users to `/login`.
- Public login page has no horizontal overflow at 390px viewport.

## What works partially

- Registration works up to email verification.
- Login recognizes an unconfirmed test account and routes it to verification.

## Interface only

- Forgot-password screen was observed but email submission was not tested.
- Verify screen was observed but resend email was not tested.

## Missing or not observable

Not observable without role accounts:

- role dashboards;
- client list and client card;
- quote request creation;
- manager-to-logistician handoff;
- logistics rate entry;
- client price formation;
- shipment creation;
- trip management;
- internal tracking events;
- manager publication of client-visible events;
- documents;
- chat;
- notifications;
- data persistence after reload;
- mobile protected app.

## Critical issues

1. No confirmed test accounts for client, manager, logistician and administrator.
2. No application source repository for frontend/backend/API/database audit.
3. Email confirmation blocks self-service audit account from entering the protected app.

## UX findings

1. Desktop `login` and `verify` pages occupy a narrow left area and leave much of the screen empty.
2. `register` uses a different full desktop layout, making auth screens inconsistent.
3. The email field on `login` is too narrow; the placeholder is visually cut off.
4. Test registration cannot be completed without mailbox access.
5. Four role accounts were not provided.

## Screenshots

![Login desktop](../../public/app-audit/2026-07-27/login-desktop.png)

![Register desktop](../../public/app-audit/2026-07-27/register-desktop.png)

![Verify desktop](../../public/app-audit/2026-07-27/verify-desktop.png)

![Login mobile 390](../../public/app-audit/2026-07-27/login-mobile-390.png)

## Safe for leadership demo

- Public auth screens with a clear note about UX findings.
- Unauthenticated redirect behavior.
- The audit limitation statement.

## Not safe to present as ready

- Any protected workflow.
- Any Product OS compliance claim for role dashboards, request-to-shipment flow, tracking, documents, chat or notifications.
- Any claim about real persistence inside the application.

## Next priorities

1. Provide confirmed role accounts.
2. Provide app source repository.
3. Seed test workflow data.
4. Re-run protected Browser audit.
5. Compare source implementation with [REQ-003](../../06-requirements/REQ-003-configurable-workflow-mvp).

