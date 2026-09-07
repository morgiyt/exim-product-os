# Матрица реализации

Дата актуализации: 2026-09-04. Проверка одной admin-сессией; client/manager/logistician RBAC не сертифицирован.

| Область | Функция | Статус live | Релиз | Следующее доказательство |
|---|---|---|---|---|
| Auth | Защищённый `/app` в существующей auth-сессии | Работает | Gate | Полный login/logout regression всеми ролями |
| Auth | Email callback | Дефект ложного успеха | Gate | success/error/invalid tests |
| Auth | Recovery context | Только UI | Gate | valid/expired link tests |
| Shell | 10/10 reload | Работает в последнем проходе | Gate | Проверить на Gate Preview |
| Shell | Deep link/Back/Forward | Не работает последовательно | Gate | Route/hash acceptance |
| Shell | Mobile 360–390 | Не работает | Gate | scrollWidth + visual test |
| Roles | Client/manager/logist UI modes | Есть, смешивают блоки | Gate | Отдельные аккаунты |
| RBAC | Server-side permissions | Не проверено | Gate | Direct forbidden requests |
| Tenant | Изоляция A/B | Не проверено | Gate | Two-company matrix |
| Data | Согласованность и объяснимость request counts | Не работает: scopes не объяснены | Gate | Одинаковый scope или явные фильтры |
| Search | Существующий request ID | Не работает | Gate | Positive/negative search |
| Request | Список и Kanban | Работает частично | Gate | Stable status/action tests |
| Request | Полная форма REQ-001 | Частично | Gate | Empty form + persistence |
| Rate | Несколько ставок логиста | Не подтверждено | Gate | Two-rate scenario |
| Offer | Маржа и клиентская цена | UI частично | Gate | Manager/client payload test |
| Contract | Договорный gate | Не подтверждено | Gate | Prevent early Shipment |
| Shipment | Создание из согласованного запроса | Не подтверждено | Gate | Idempotent creation |
| Trip | Один Shipment → несколько Trips | Не подтверждено | Gate | Create/read test |
| Tracking | Manual event + manager publish | Не подтверждено | Gate | Two published events |
| CRM | Lead/Kanban/list | Работает частично | Gate regression; развитие Post-Gate | Safe regression |
| Tasks | List/Kanban | Работает, загрузка заметна | Gate regression; развитие Post-Gate | Role/scope regression |
| Chats | Три группы | Работает частично | Gate regression; развитие Post-Gate | Client/private scope test |
| Profile | Компания/пользователи/роли | UI работает | Gate | Tenant-scoped admin test |
| Services | Каталог и claims | UI, claims не подтверждены | Gate cleanup | Source or removal |
| Containers | Пустой каталог | UI вне текущего scope | OQ-048 | Product decision |
| Exchange | Cargo listings | Не обнаружено в live UI | Launch MVP | REQ-007 |
| Exchange | Transport listings | Не обнаружено в live UI | Launch MVP | REQ-007 |
| Exchange | Search/responses/selection | Не обнаружено в live UI | Launch MVP | REQ-008 |
| Access | Free/paid entitlements | Не обнаружено в live UI | Launch MVP | REQ-009 |
| Trust | Profiles/verification/moderation | Не обнаружено в live UI | Launch MVP, conditional | REQ-010 / OQ-039 |

Статус `Не подтверждено` не означает доказанное отсутствие кода. Он означает отсутствие безопасного end-to-end доказательства. Статус `Не обнаружено в live UI` также не доказывает отсутствие реализации в исходном коде.
