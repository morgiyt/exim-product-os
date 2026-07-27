# Vercel audit 2026-07-27

## Scope

External audit of the published application at <https://exim-super-app.vercel.app/app>.

The audit did not edit application code, delete data, send real messages, make payments, download or publish personal documents, change company settings, or log out before completion.

Explicit limitations:

- no full set of confirmed test accounts for client, manager, logistician and administrator;
- no `exim-app` repository in the workspace;
- the first pass checked only the public auth part;
- the continuation checked one authenticated session whose visible role was manager.

Credentials, cookies, tokens and browser storage values were not recorded, printed or added to documentation.

## Product OS baseline

Requirements were read from Product OS before and during the audit:

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
- [REQ-003](../../06-requirements/REQ-003-configurable-workflow-mvp);
- [Открытые вопросы](../../09-decisions/open-questions).

## Tested pages and sections

| Page or section | Result |
|---|---|
| `/login` | Public page renders |
| `/register` | Public page renders; test registration leads to verify |
| `/forgot-password` | Public page renders; email sending not tested |
| `/verify` | Public page renders; resend not tested |
| `/app` without session | Redirects to `/login` |
| `/app` with current session | Loads protected app |
| Главная | Manager dashboard/overview loads |
| Перевозки | Empty shipment list and filters load |
| Заявки | Request list/kanban loads; `CODEX-AUDIT` request created and persisted |
| CRM | Interface shell loads |
| Аналитика | Interface shell loads |
| Чаты | Interface shell loads; messages not sent |
| Задачи | Interface shell loads |
| Отслеживание | Search UI loads; test request not found as shipment |
| Контейнеры | Catalog UI loads |
| Услуги | Services catalog UI loads |
| Профиль | Profile form loads; saving not tested |
| Direct `/app/*` URLs | Open blank screens in authenticated session |

Continuation finding: current role was ultimately confirmed as `Менеджер`. During one direct return to `/app`, the active role button briefly read `Клиент`, then without manual role switching the app returned to `Менеджер` and manager dashboard. This is treated as UI/state instability, not as verified client-role access.

## Role coverage

| Role | Status | Evidence |
|---|---|---|
| Current role | Работает | Visible role is `Менеджер`; manager dashboard sections load |
| Client | Невозможно проверить | No separate confirmed client test account |
| Manager | Работает частично | Current session allowed manager dashboard and request creation |
| Logistician | Невозможно проверить | No separate logistician test account; role switching not used |
| Administrator | Невозможно проверить | No admin test account; `/app/admin` blank in current session |

## Safe scenarios

### Quote request

Completed:

1. Opened `Заявки`.
2. Created a test quote request with `CODEX-AUDIT` prefix.
3. Verified it appears in list and kanban.
4. Refreshed the page.
5. Verified the test request still exists after reload.

Not completed:

- changing stage: no visible safe stage transition control was found;
- manager-to-logistician handoff: a detail modal showed assignment/deadline/send-to-calculation controls, but they were not executed because they could assign a real user or create a real work item;
- client price formation: no rate/price controls were visible.

### Shipment and tracking

Completed:

1. Opened `Перевозки`.
2. Confirmed empty shipment state.
3. Opened new shipment/request form only far enough to identify that it uses existing sender data.
4. Closed the form without submitting.
5. Opened `Отслеживание`.
6. Searched for the test request number and confirmed it was not found as an active shipment.

Not completed:

- shipment creation;
- trip creation;
- internal tracking event;
- manager publication of event;
- client-visible status.

Reason: no safe sandbox shipment existed, and creating one could affect existing working data.

## What really works

- Public auth pages render.
- Protected `/app` blocks unauthenticated access.
- Current manager session opens protected app and survives reload.
- Sidebar navigation works inside `/app`.
- Manager dashboard loads.
- Test request creation works.
- Created test request persists after reload.

## What works partially

- Registration works up to email verification.
- Manager dashboard is present but not fully aligned to Product OS.
- Request workflow has list and kanban, but no verified stage transition.
- Shipments section has empty state and filters, but no safe test shipment flow.
- Tracking search works as UI, but cannot display the created request as shipment.
- Notifications center opens but has no test event data.
- Mobile dashboard renders but has horizontal overflow.

## Interface only

- Forgot password.
- Verify email.
- CRM shell.
- Analytics shell.
- Chat shell.
- Tasks shell.
- Documents only as service/category UI.

## Missing or not observable

- Client, logistician and admin role dashboards.
- Client list and client card.
- Request handoff to logistician.
- Rate entry.
- Client price formation.
- Shipment creation.
- Trips.
- Internal tracking events.
- Event publication by manager.
- Client-visible shipment status.
- Source-level implementation details.

## Critical issues

1. Direct authenticated `/app/*` URLs open blank screens.
2. No visible stage transition for the created `CODEX-AUDIT` request.
3. Shipment/trip/tracking flow cannot be safely verified without sandbox data.
4. No full role-account set for Product OS certification.
5. No application source repository for source audit.
6. Mobile protected app shows horizontal overflow.
7. Role/view state is unstable: role button and `Канбан`/`Список` behavior varied between repeated checks.

## Product OS gaps

- REQ-003 is only partially represented: request cards and stages are visible, but configurable transitions, history, handoff, MVP completion and role-specific workflow pages are not verified.
- D-065...D-074 remain unverified except for visible stage labels and persisted test request.
- Manager pages are partially present; client, logistician and administrator pages are not verified.
- Documents, chat and notifications are not production-verifiable from current data.

## Screenshots

![Login desktop](../../public/app-audit/2026-07-27/login-desktop.png)

![Register desktop](../../public/app-audit/2026-07-27/register-desktop.png)

![Verify desktop](../../public/app-audit/2026-07-27/verify-desktop.png)

![Login mobile 390](../../public/app-audit/2026-07-27/login-mobile-390.png)

![No authenticated session redirect](../../public/app-audit/2026-07-27/authenticated/no-auth-session-redirect.png)

![Manager dashboard](../../public/app-audit/2026-07-27/authenticated/manager-dashboard.png)

![Manager incoming dashboard](../../public/app-audit/2026-07-27/authenticated/manager-incoming-dashboard.png)

![Manager requests with CODEX-AUDIT](../../public/app-audit/2026-07-27/authenticated/manager-requests-codex-audit.png)

![Manager tracking no shipment](../../public/app-audit/2026-07-27/authenticated/manager-tracking-no-shipment.png)

![Mobile manager dashboard](../../public/app-audit/2026-07-27/authenticated/mobile-manager-dashboard.png)

## Safe for leadership demo

- Public auth screens with UX caveat.
- Manager dashboard as partial prototype.
- Creation and persistence of a `CODEX-AUDIT` quote request.
- Empty notifications/tracking states as current facts, not as completed modules.

## Not safe to present as ready

- Full quote-to-shipment workflow.
- Stage transition and logistician handoff.
- Rates, client price, shipment, trips and tracking events.
- Documents and chat as working modules.
- Client/logistician/admin role compliance.

## Next priorities

1. Provide confirmed sandbox accounts for all roles.
2. Fix or document direct `/app/*` routing.
3. Implement visible workflow transition controls for REQ-003 and D-065...D-074.
4. Seed end-to-end shipment data for safe audit.
5. Provide `exim-app` source repository for architecture, API, DB, auth and mock-data audit.
