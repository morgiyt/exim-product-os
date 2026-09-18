# Матрица реализации

Дата актуализации: 2026-09-18. Self-hosted managed preview; synthetic accounts/organizations, два tenants и отдельный Exchange public contour. Это implementer evidence, а не независимая приёмка.

| Область | Функция | Статус live | Релиз | Следующее доказательство |
|---|---|---|---|---|
| Auth | Защищённый `/app`, login/logout и семь ролей | Работает на preview | Gate | Independent rerun |
| Auth | Email callback | Ошибочные сценарии исправлены и тестируются | Gate | Реальный valid provider callback до production |
| Auth | Recovery context | Server flow реализован; provider delivery не подключён | Gate | Expired/used token browser test |
| Shell | Reload | Работает на stable object routes | Gate | Independent rerun |
| Shell | Deep link/Back/Forward | Работает для request и shipment cards | Gate | Independent rerun |
| Shell | Mobile 360–390 | Нет page-level overflow в workflow/shipment/CRM/tasks/chats/finance/workflow-editor/Exchange listing/search/response/platform moderation экранах | Gate / Wave 11 | Расширить на plan/entitlement TASK-2026-014 |
| Roles | Client/manager/logistician/tenant-admin/accountant/sales_head/logistics_head | Отдельные server-derived contexts работают | Gate / Wave 7 | Independent review |
| RBAC | Server-side permissions | Seven-account direct-request matrix PASS | Gate | Independent review |
| Tenant | Изоляция A/B и A1/A2 | Safe 404 matrix PASS | Gate | Independent review |
| Data | Согласованность request/shipment/CRM/work/finance/workflow views | Работает в role-scoped read models | Gate / Wave 8 | Продолжить для Exchange public projection |
| Search | Exact request/shipment/trip/CRM ID | Работает с safe unknown/foreign result | Gate / Wave 5 | Добавить tasks/chats exact search |
| Request | Список, карточка и canonical workflow | Работает на preview | Gate | Independent review |
| Request | Форма REQ-001 | Draft/validation/idempotent submit работают | Gate | Independent review |
| Rate | Несколько ставок логиста | Two-rate scenario PASS | Gate | Independent review |
| Offer | Маржа и клиентская цена | Versioned manager/client projections PASS | Gate | Independent review |
| Contract | Договорный gate | Prevent early Shipment и exact basis PASS | Gate | Independent review |
| Shipment | Создание из согласованного запроса | Exactly-one idempotent creation PASS | Gate | Independent review |
| Trip | Один Shipment → несколько Trips | Schema/API поддерживают; synthetic one-Trip path PASS | Gate | Multi-Trip browser scenario |
| Tracking | Manual event + manager publish | Correction + two safe publications PASS | Gate | Independent review |
| Documents | Versioning/visibility/direct ID | Published client download и foreign/unpublished denial PASS | Gate | Replacement browser scenario |
| CRM | Lead/Kanban/list/cards/conversion | Canonical server API и exact preview работают; PR #4 submitted | Full Product / Wave 5 | Independent review |
| Tasks | List/Kanban/comments/linked objects | Canonical tenant-safe server domain работает; PR #5 submitted | Full Product / Wave 6 | Independent review |
| Chats | Client/internal conversations/messages/read state/files | Canonical server path и protected download работают; PR #5 submitted | Full Product / Wave 6 | Independent review |
| Notifications | Center/preferences/dedupe | Server source, mandatory security/access category и safe targets работают | Full Product / Wave 6 | Independent review |
| Finance | Snapshot/margin/expenses/approval/invoice/payment/closing | Manual tenant-safe contour работает; PR #6 submitted | Full Product / Wave 7 | Independent review |
| Analytics | Sales/logistics/accountant dashboards и CSV | Role-scoped counts/fields/currencies проверены | Full Product / Wave 7 | Independent review |
| Workflow editor | Draft/validation/diff/activation | Tenant-safe immutable activation работает; PR #7 submitted | Full Product / Wave 8 | Independent review |
| Profile | Компания/пользователи/роли | UI работает | Gate | Tenant-scoped admin test |
| Services | Каталог и claims | UI, claims не подтверждены | Gate cleanup | Source or removal |
| Containers | Пустой каталог | UI вне текущего scope | OQ-048 | Product decision |
| Exchange | Cargo listings | Independent draft/publish/pause/resume/close/expire, safe public projection и profile работают; PR #8 submitted | Full Product / Wave 9 | Independent review |
| Exchange | Transport listings | Те же гарантии; combinable capabilities и five-mode typed details подтверждены; PR #8 submitted | Full Product / Wave 9 | Independent review |
| Exchange | Search/responses/selection | Реализовано на preview; PR #9 submitted; contacts и commercial rules disabled | Full Product / Wave 10 | Independent review |
| Access | Demo free/paid entitlements, subscriptions и usage | Active scope TASK-2026-014; real billing disabled | Full Product / Wave 12 | REQ-009 |
| Trust | Complaints/moderation/platform control | Реализовано на preview; PR #10 submitted; KYC/verified/legal/fraud disabled | Full Product / Wave 11 | Independent review |

Статус `Не подтверждено` не означает доказанное отсутствие кода. Он означает отсутствие безопасного end-to-end доказательства. Статус `Не обнаружено в live UI` также не доказывает отсутствие реализации в исходном коде.
