# Матрица реализации

Дата актуализации: 2026-09-17. Self-hosted managed preview; семь synthetic accounts, два tenants и три client companies. Это implementer evidence, а не независимая приёмка.

| Область | Функция | Статус live | Релиз | Следующее доказательство |
|---|---|---|---|---|
| Auth | Защищённый `/app`, login/logout и семь ролей | Работает на preview | Gate | Independent rerun |
| Auth | Email callback | Ошибочные сценарии исправлены и тестируются | Gate | Реальный valid provider callback до production |
| Auth | Recovery context | Server flow реализован; provider delivery не подключён | Gate | Expired/used token browser test |
| Shell | Reload | Работает на stable object routes | Gate | Independent rerun |
| Shell | Deep link/Back/Forward | Работает для request и shipment cards | Gate | Independent rerun |
| Shell | Mobile 360–390 | Нет page-level overflow в workflow/shipment/CRM экранах | Gate / Wave 5 | Расширить на tasks/chats TASK-2026-008 |
| Roles | Client/manager/logistician/tenant-admin | Отдельные server-derived contexts работают | Gate | Independent review |
| RBAC | Server-side permissions | Seven-account direct-request matrix PASS | Gate | Independent review |
| Tenant | Изоляция A/B и A1/A2 | Safe 404 matrix PASS | Gate | Independent review |
| Data | Согласованность request/shipment/CRM counts | Работает в role-scoped read models | Gate / Wave 5 | Продолжить для communications |
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
| Tasks | List/Kanban/comments | Legacy/localStorage path существует; canonical server domain не реализован | Full Product / Wave 6 | REQ-012 + TASK-2026-008 |
| Chats | Conversations/messages/read state | Legacy Supabase/localStorage paths существуют; tenant-safe active path не реализован | Full Product / Wave 6 | REQ-012 + TASK-2026-008 |
| Notifications | Center/preferences/dedupe | Local-only placeholder; server source of truth не реализован | Full Product / Wave 6 | REQ-012 + TASK-2026-008 |
| Profile | Компания/пользователи/роли | UI работает | Gate | Tenant-scoped admin test |
| Services | Каталог и claims | UI, claims не подтверждены | Gate cleanup | Source or removal |
| Containers | Пустой каталог | UI вне текущего scope | OQ-048 | Product decision |
| Exchange | Cargo listings | Не обнаружено в live UI | Launch MVP | REQ-007 |
| Exchange | Transport listings | Не обнаружено в live UI | Launch MVP | REQ-007 |
| Exchange | Search/responses/selection | Не обнаружено в live UI | Launch MVP | REQ-008 |
| Access | Free/paid entitlements | Не обнаружено в live UI | Launch MVP | REQ-009 |
| Trust | Profiles/verification/moderation | Не обнаружено в live UI | Launch MVP, conditional | REQ-010 / OQ-039 |

Статус `Не подтверждено` не означает доказанное отсутствие кода. Он означает отсутствие безопасного end-to-end доказательства. Статус `Не обнаружено в live UI` также не доказывает отсутствие реализации в исходном коде.
