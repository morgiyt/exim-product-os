# Матрица проверки функций

Technical route/framework reconnaissance: [Production Technical Recon 2026-07-27](audits/2026-07-27-production-technical-recon). Deep-link architecture is tracked as [GAP-001](gap-registry#gap-001), not as BUG-001.

Дата проверки: 2026-07-27  
Область проверки: опубликованное приложение, публичная auth-часть и одна авторизованная сессия с фактической ролью **менеджер**.

Статусы защищённых функций не означают отсутствие реализации. Если функция была недоступна для безопасной проверки в текущей роли или без исходного кода, она помечена как **Невозможно проверить**, а не как **Не реализовано**.

Подробные BUG-записи: [Bug Registry](bug-registry).

| # | Функция | Связанная страница | Роль | Статус | Доказательство проверки | Обнаруженная проблема | Требование Product OS | Следующее действие |
|---:|---|---|---|---|---|---|---|---|
| 1 | Публичный вход | `/login` | Все | Работает | Страница входа отображается | Desktop layout узкий | [Product Foundation](../01-foundation/product-foundation) | Выровнять auth UX |
| 2 | Регистрация клиента | `/register` | Клиент | Работает частично | Тестовая регистрация дошла до `/verify` | Завершение требует mailbox | [CL-002](../04-pages/client-cabinet), [H-001/OQ-023](../09-decisions/open-questions) | Выдать pre-confirmed test account |
| 3 | Восстановление пароля | `/forgot-password` | Все | Только интерфейс | Форма отображается | Отправка письма не выполнялась | [Роли](../02-process/roles) | Проверить с test mailbox |
| 4 | Подтверждение email | `/verify` | Клиент | Только интерфейс | Экран отображается | Resend не выполнялся | [H-001/OQ-023](../09-decisions/open-questions) | Проверить с test mailbox |
| 5 | Защита `/app` без сессии | `/app` | Все | Работает | Без сессии был redirect на `/login` | Нет | [Права и видимость](../03-product-map/permissions) | Оставить regression test |
| 6 | Авторизация и сохранение сессии | `/app` | Менеджер | Работает | После входа и reload защищённая зона осталась доступна | Проверена только одна роль | [MVP v1](../07-mvp/mvp-v1) | Добавить role test accounts |
| 7 | Определение текущей роли | `/app` | Менеджер | Работает | Активна кнопка `Менеджер`, dashboard содержит менеджерские KPI | Роль нельзя считать полноценной RBAC-проверкой | [Роли](../02-process/roles) | Проверить серверные права |
| 8 | Переключение ролей | `/app` | Клиент/Менеджер/Логист | Невозможно проверить | Кнопки видны; один раз после прямого возврата на `/app` активной была `Клиент`, затем без ручного переключения снова `Менеджер` | Ролевое состояние UI нестабильно и не подтверждает RBAC | [Права и видимость](../03-product-map/permissions) | Проверить на sandbox users |
| 9 | Доступ администратора | `/app/admin` | Администратор | Невозможно проверить | Прямой URL дал пустой экран в текущей сессии | Нет admin account | [AD-001](../04-pages/admin-cabinet) | Выдать admin test account |
| 10 | Боковое меню | `/app` | Менеджер | Работает | Все пункты меню открывались через UI | URL остаётся `/app` | [Карта приложения](../03-product-map/app-map) | Добавить deep links или документировать SPA-only |
| 11 | Deep-link navigation contract | `/app` plus hash/internal state | Менеджер | Работает частично | GAP-001: sidebar uses `#workflow`, `#shipments`, `#tracking`; `/app/requests` is not an implemented route | Documentation/tests may assume path routes that the app does not implement | [Реестр страниц](../04-pages/page-registry), [GAP-001](gap-registry#gap-001) | Decide SPA-only vs path-based contract |
| 12 | Dashboard менеджера | `/app`, Главная | Менеджер | Работает частично | Загружается обзор, KPI, быстрые действия | Состав не совпадает полностью с MG-001 | [MG-001](../04-pages/manager-cabinet) | Сверить блоки dashboard с Product OS |
| 13 | Dashboard клиента | `/app` | Клиент | Невозможно проверить | Не было client account | Нет ролевого доступа | [CL-001](../04-pages/client-cabinet) | Выдать client test account |
| 14 | Dashboard логиста | `/app` | Логист | Невозможно проверить | Роль не переключалась | Нет logistician account | [LG-001](../04-pages/logistics-cabinet) | Выдать logistician test account |
| 15 | Dashboard администратора | `/app/admin` | Администратор | Невозможно проверить | Admin UI не доступен текущей ролью | Нет admin account | [AD-001](../04-pages/admin-cabinet) | Выдать admin test account |
| 16 | Список и карточка клиентов | `/app/clients`, CRM | Менеджер/Администратор | Невозможно проверить | В меню есть CRM, но отдельный clients URL пустой | Нет списка клиентов и карточки в доступном UI | [MG-002](../04-pages/manager-cabinet) | Проверить с seeded clients |
| 17 | Создание запроса на расчёт | `/app`, Заявки | Менеджер | Работает | Создана тестовая заявка `CODEX-AUDIT`; после reload сохранилась | Карточка заявки не открывалась как отдельная сущность | [CL-002](../04-pages/client-cabinet), [D-006](../01-foundation/decisions) | Проверить детали и audit trail |
| 18 | Изменение этапа заявки | `/app`, Заявки | Менеджер | Невозможно проверить | Карточка `CODEX-AUDIT` открывалась с назначением логиста, deadline и отправкой на расчёт | Нельзя безопасно нажать, потому что действие может назначить реального пользователя/задачу | [REQ-003](../06-requirements/REQ-003-configurable-workflow-mvp), [D-065...D-074](../01-foundation/decisions) | Проверить в sandbox с тестовым логистом |
| 19 | Передача запроса логисту | Заявка | Менеджер/Логист | Невозможно проверить | В карточке был виден action `Назначить и отправить на расчёт` | Не выполнялось из-за риска затронуть реального пользователя | [MG-003](../04-pages/manager-cabinet), [LG-002](../04-pages/logistics-cabinet) | Проверить role workflow с тестовым логистом |
| 20 | Добавление ставки | Карточка заявки | Логист | Невозможно проверить | Нет logistician account и карточки ставки | Ставки не доступны | [LG-002](../04-pages/logistics-cabinet), [D-043...D-056](../01-foundation/decisions) | Seed request and rate flow |
| 21 | Формирование клиентской цены | Карточка заявки | Менеджер | Невозможно проверить | Нет формы цены/маржи в доступной заявке | Price composition не доступен | [MG-003](../04-pages/manager-cabinet), [D-008](../01-foundation/decisions) | Проверить после ставки |
| 22 | Создание перевозки | `/app`, Перевозки | Менеджер | Невозможно проверить | Форма новой заявки подтягивает существующие реквизиты отправителя | Небезопасно создавать без sandbox shipment data | [D-009](../01-foundation/decisions), [MVP v1](../07-mvp/mvp-v1) | Создать sandbox shipment data |
| 23 | Список перевозок | `/app`, Перевозки | Менеджер | Работает частично | Раздел загружается с пустым состоянием и фильтрами | Нет тестовой перевозки | [Доменная модель](../03-product-map/domain-model) | Seed shipment |
| 24 | Вкладка перевозок в workflow | `/app`, Заявки -> Перевозки | Менеджер | Работает частично | Показывает текст: перевозок пока нет, создайте из согласованной заявки | Нет кнопки создания из согласованной заявки | [D-009](../01-foundation/decisions) | Проверить после статуса договора |
| 25 | Добавление рейсов | Карточка перевозки | Менеджер/Логист | Невозможно проверить | Нет безопасной тестовой перевозки | Карточка перевозки недоступна | [D-010](../01-foundation/decisions), [Доменная модель](../03-product-map/domain-model) | Seed shipment with trips |
| 26 | Внутреннее tracking-событие | Tracking/рейс | Логист | Невозможно проверить | Нет logistician account и shipment | События недоступны | [D-060, D-061](../01-foundation/decisions), [События рейса](../05-statuses/trip-events) | Проверить на тестовой перевозке |
| 27 | Публикация события менеджером | Tracking/рейс | Менеджер | Невозможно проверить | Нет события и publish action | Публикация недоступна | [D-012...D-014](../01-foundation/decisions) | Seed internal event |
| 28 | Статус клиенту | Кабинет клиента | Клиент | Невозможно проверить | Нет client account | Client visibility не проверена | [CL-004](../04-pages/client-cabinet), [D-072](../01-foundation/decisions) | Проверить клиентский слой |
| 29 | Tracking search | `/app`, Отслеживание | Менеджер | Работает частично | Поиск `ZK-2302` вернул `Не найдено` | Созданная заявка не становится активной перевозкой | [CL-004](../04-pages/client-cabinet) | Проверить после создания shipment |
| 30 | Документы | `/app/documents`, Услуги -> Документы | Все роли | Только интерфейс | Есть фильтр `Документы` в каталоге услуг; прямой URL пустой | Нет списка документов/файлов | [CL-004](../04-pages/client-cabinet), [Доменная модель](../03-product-map/domain-model) | Реализовать/проверить documents module |
| 31 | Чат | `/app`, Чаты | Клиент/Менеджер | Только интерфейс | Есть заголовок и `+ Новый чат` | Сообщения не отправлялись, список чатов отсутствует | [D-015, D-016](../01-foundation/decisions) | Проверить sandbox chat |
| 32 | Уведомления | `/app`, иконка уведомлений | Менеджер | Работает частично | Центр уведомлений открывается, показывает `Нет уведомлений` | Нельзя проверить доставку событий | [D-073](../01-foundation/decisions), [MVP v1](../07-mvp/mvp-v1) | Seed notification |
| 33 | CRM | `/app`, CRM | Менеджер | Только интерфейс | Заголовок, вкладки, `+ Новый лид` | Лиды/карточки не проверялись | [MG-002](../04-pages/manager-cabinet) | Проверить sandbox leads |
| 34 | Аналитика | `/app`, Аналитика | Менеджер | Только интерфейс | Видим только заголовок | Нет данных/графиков в видимой области | [MG-001](../04-pages/manager-cabinet) | Seed metrics |
| 35 | Мобильный защищённый UI | `/app`, 390x844 | Менеджер | Работает частично | Dashboard отображается, нижняя навигация видна | Есть горизонтальный скролл внизу viewport | [Product Foundation](../01-foundation/product-foundation) | Исправить mobile overflow |
| 36 | Переключение список/канбан | `/app`, Заявки | Менеджер | Работает частично | В одном проходе kanban отображал `CODEX-AUDIT`; при повторной проверке кнопка `Канбан` оставила таблицу | Нестабильное состояние view switch | [REQ-003](../06-requirements/REQ-003-configurable-workflow-mvp) | Добавить стабильный state test |
| 37 | `/app` bootstrap stability | `/app` | Менеджер | Не работает | BUG-001: `/app` intermittently remains at `Загружаем рабочее пространство` after reload/Back/Forward | Protected workspace does not always appear after successful auth | [MVP v1](../07-mvp/mvp-v1), [BUG-001](bug-registry#bug-001) | Add 10/10 reload and Back/Forward regression |
| 38 | Mobile quick actions width | `/app`, protected dashboard | Клиент view mode | Работает частично | `.dash-link` quick-action row extended document width to about `1054px` at 375/360px | Page-level horizontal overflow | [Product Foundation](../01-foundation/product-foundation) | Constrain quick-action row and add mobile scrollWidth regression |

## Количество функций по статусам

- Работает: 6
- Работает частично: 10
- Только интерфейс: 6
- Не работает: 1
- Не реализовано: 0
- Невозможно проверить: 15
