# Матрица проверки функций

Дата проверки: 2026-07-27  
Область проверки: внешний аудит публичной части опубликованного приложения.

Статусы функций за авторизацией не означают отсутствие реализации. Без подтверждённых тестовых аккаунтов они имеют статус **«Невозможно проверить»**.

| # | Функция | Связанная страница | Роль | Статус | Доказательство проверки | Обнаруженная проблема | Требование Product OS | Следующее действие |
|---:|---|---|---|---|---|---|---|---|
| 1 | Публичная страница входа | `/login` | Все | Работает | Отображаются email, пароль, кнопка входа | Узкий desktop layout; email placeholder визуально обрезается | [Product Foundation](../01-foundation/product-foundation), [Карта приложения](../03-product-map/app-map) | Выровнять auth layout и проверить UX |
| 2 | Регистрация клиента | `/register` | Клиент | Работает частично | Тестовая регистрация приводит на `/verify?sent=1&email=...` | Завершение невозможно без доступа к email | [Кабинет клиента CL-002](../04-pages/client-cabinet), [H-001/OQ-023](../09-decisions/open-questions) | Выдать тестовый mailbox или pre-confirmed аккаунт |
| 3 | Восстановление пароля | `/forgot-password` | Все | Только интерфейс | Форма с email и кнопкой отображается | Отправка письма не выполнялась, чтобы не отправлять реальное сообщение | [Роли](../02-process/roles) | Проверить только с согласованным test mailbox |
| 4 | Подтверждение email | `/verify` | Клиент | Только интерфейс | Экран и кнопка повторной отправки отображаются | Повторная отправка не выполнялась | [H-001/OQ-023](../09-decisions/open-questions) | Проверить с тестовым mailbox |
| 5 | Защита `/app` без сессии | `/app`, `/app/*` | Все | Работает | HTTP 307 redirect на `/login` | Нельзя проверить post-login routing | [Права и видимость](../03-product-map/permissions) | Выдать подтверждённые role accounts |
| 6 | Сохранение сессии | `/app` | Все | Невозможно проверить | Подтверждённой сессии нет | Тестовый аккаунт не подтверждён | [MVP v1](../07-mvp/mvp-v1) | Проверить с подтверждённым аккаунтом |
| 7 | Доступ клиента | `/app` | Клиент | Невозможно проверить | Вход тестовым клиентом возвращает на `/verify` | Нет подтверждённого client account | [Кабинет клиента](../04-pages/client-cabinet) | Предоставить client credentials |
| 8 | Доступ менеджера | `/app` | Менеджер | Невозможно проверить | Защищённая часть недоступна | Нет manager account | [Кабинет менеджера](../04-pages/manager-cabinet) | Предоставить manager credentials |
| 9 | Доступ логиста | `/app` | Логист | Невозможно проверить | Защищённая часть недоступна | Нет logistician account | [Кабинет логиста](../04-pages/logistics-cabinet) | Предоставить logistician credentials |
| 10 | Доступ администратора | `/app/admin` | Администратор | Невозможно проверить | `/app/admin` redirect на `/login` без сессии | Нет admin account | [Кабинет администратора](../04-pages/admin-cabinet) | Предоставить admin credentials |
| 11 | Боковое меню и навигация | `/app` | Все | Невозможно проверить | Защищённая часть недоступна | Нет подтверждённой сессии | [Карта приложения](../03-product-map/app-map) | Проверить после role login |
| 12 | Dashboard клиента | `/app` | Клиент | Невозможно проверить | Защищённая часть недоступна | Нет client account | [CL-001](../04-pages/client-cabinet) | Проверить с client account |
| 13 | Dashboard менеджера | `/app` | Менеджер | Невозможно проверить | Защищённая часть недоступна | Нет manager account | [MG-001](../04-pages/manager-cabinet) | Проверить с manager account |
| 14 | Dashboard логиста | `/app` | Логист | Невозможно проверить | Защищённая часть недоступна | Нет logistician account | [LG-001](../04-pages/logistics-cabinet) | Проверить с logistician account |
| 15 | Dashboard администратора | `/app/admin` | Администратор | Невозможно проверить | Защищённая часть недоступна | Нет admin account | [AD-001](../04-pages/admin-cabinet) | Проверить с admin account |
| 16 | Список и карточка клиентов | `/app/clients` | Менеджер, администратор | Невозможно проверить | Redirect на `/login` без сессии | Нет manager/admin account | [MG-002](../04-pages/manager-cabinet), [D-005](../01-foundation/decisions) | Проверить с тестовым клиентом |
| 17 | Создание запроса на расчёт | `/app/requests` | Клиент, менеджер | Невозможно проверить | Redirect на `/login` без сессии | Нет client/manager account | [CL-002](../04-pages/client-cabinet), [D-006](../01-foundation/decisions) | Проверить создание и сохранение после reload |
| 18 | Передача запроса логисту | `/app/requests` | Менеджер | Невозможно проверить | Workflow за авторизацией | Нет manager/logistician account | [D-007](../01-foundation/decisions), [MG-003](../04-pages/manager-cabinet) | Проверить role transition |
| 19 | Добавление ставки | `/app/rates` или карточка запроса | Логист | Невозможно проверить | Redirect на `/login` без сессии | Нет logistician account | [D-043…D-056](../01-foundation/decisions), [LG-002](../04-pages/logistics-cabinet) | Проверить сохранение ставки |
| 20 | Формирование клиентской цены | Карточка запроса | Менеджер | Невозможно проверить | Workflow за авторизацией | Нет manager account | [D-008, D-029](../01-foundation/decisions), [MG-003](../04-pages/manager-cabinet) | Проверить итоговую цену и client visibility |
| 21 | Создание перевозки | `/app/shipments` | Менеджер | Невозможно проверить | Redirect на `/login` без сессии | Нет manager account | [D-009](../01-foundation/decisions), [MVP v1](../07-mvp/mvp-v1) | Проверить создание после договора |
| 22 | Добавление рейсов | Карточка перевозки | Менеджер, логист | Невозможно проверить | Workflow за авторизацией | Нет role accounts | [D-010](../01-foundation/decisions), [Доменная модель](../03-product-map/domain-model) | Проверить один shipment с несколькими trips |
| 23 | Внутреннее tracking-событие | Shipment/tracking | Логист | Невозможно проверить | `/app/tracking` redirect на `/login` | Нет logistician account | [D-060, D-061](../01-foundation/decisions), [События рейса](../05-statuses/trip-events) | Проверить внутреннее событие и источник |
| 24 | Публикация события менеджером | Shipment/tracking | Менеджер | Невозможно проверить | Workflow за авторизацией | Нет manager account | [D-012…D-014](../01-foundation/decisions), [Права и видимость](../03-product-map/permissions) | Проверить client-safe публикацию |
| 25 | Отображение статуса клиенту | Кабинет клиента | Клиент | Невозможно проверить | Workflow за авторизацией | Нет client account | [D-013, D-072](../01-foundation/decisions), [CL-004](../04-pages/client-cabinet) | Проверить только клиентский слой |
| 26 | Документы | `/app/documents` | Все роли | Невозможно проверить | Redirect на `/login` без сессии | Нет role accounts | [CL-004](../04-pages/client-cabinet), [Доменная модель](../03-product-map/domain-model) | Проверить права видимости файлов |
| 27 | Чат | `/app/chat` | Клиент, менеджер | Невозможно проверить | Redirect на `/login` без сессии; сообщения не отправлялись | Нет role accounts | [D-015, D-016](../01-foundation/decisions) | Проверить только тестовый чат |
| 28 | Уведомления | `/app/notifications` | Все роли | Невозможно проверить | Redirect на `/login` без сессии | Нет role accounts | [D-073](../01-foundation/decisions), [MVP v1](../07-mvp/mvp-v1) | Проверить seeded notification |
| 29 | Сохранение данных после обновления | Защищённые записи | Все роли | Невозможно проверить | Нельзя создать защищённые записи | Нет role accounts | [REQ-003](../06-requirements/REQ-003-configurable-workflow-mvp) | Проверить после создания тестовых объектов |
| 30 | Мобильный login | `/login` | Все | Работает | Viewport 390x844: `scrollWidth=390`, `bodyWidth=390` | Защищённый mobile UI не проверен | [Product Foundation](../01-foundation/product-foundation) | Проверить мобильный `/app` после login |

## Количество функций по статусам

- Работает: 3
- Работает частично: 1
- Только интерфейс: 2
- Не работает: 0
- Не реализовано: 0
- Невозможно проверить: 24

