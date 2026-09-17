# Реестр страниц

Статус реализации основан на live-аудите 2026-09-04 и не заменяет проверку исходного кода.

| ID | Страница | Модуль | Доступ | Релиз | Спецификация | Реализация |
|---|---|---|---|---|---|---|
| AU-001 | Вход | Platform | Все | Foundation Gate | Gate contract ready | Работает |
| AU-002 | Регистрация / организация | Platform | Новый пользователь | Launch MVP | Требует описания | Частично |
| AU-003 | Подтверждение и восстановление | Platform | Все | Foundation Gate | Gate contract ready | Дефект callback |
| PL-001 | Главная и выбор модуля | Platform | Авторизованные | Launch MVP | Черновик | Нет подтверждения |
| ORG-001 | Организация и capabilities | Platform | Участники организации | Launch MVP | Черновик | Профиль частично |
| ORG-002 | Участники, роли, приглашения | Platform | Tenant admin в Gate; финальная модель OQ-034 | Foundation Gate | Gate contract ready | Частично, права не проверены |
| ORG-003 | Модули и план | Platform | Organization admin | Launch MVP | Черновик | Не обнаружено в live UI |
| CL-001 | Главная клиента | Private OS | Клиент | Foundation Gate | Gate contract ready | UI-режим есть, RBAC не проверен |
| CL-002 | Новый запрос | Private OS | Клиент | Foundation Gate | Gate contract ready | Частично |
| CL-003 | Мои запросы | Private OS | Клиент | Foundation Gate | Gate contract ready | Частично |
| CL-004 | Карточка перевозки | Private OS | Клиент | Foundation Gate | Gate contract ready | Нет тестовой перевозки |
| CL-005 | Список рейсов | Private OS | Клиент | Foundation Gate | Gate contract ready | Не подтверждено |
| CL-006 | Документы | Private OS | Клиент | Foundation Gate | Gate contract ready | UI частично |
| CL-007 | Чат с менеджером | Private OS | Клиент | Post-Gate | Требует описания | UI есть |
| MG-001 | Главная менеджера | Private OS | Менеджер | Foundation Gate | Gate contract ready | Частично, счётчики расходятся |
| MG-002 | Карточка клиента | Private OS | Менеджер | Foundation Gate | Gate contract ready | Частично |
| MG-003 | Карточка запроса | Private OS | Менеджер | Foundation Gate | Gate contract ready | Частично, действий workflow нет |
| MG-004 | Коммерческое предложение | Private OS | Менеджер | Foundation Gate | Gate contract ready | Не подтверждено |
| MG-005 | Карточка перевозки | Private OS | Менеджер | Foundation Gate | Gate contract ready | Нет данных |
| MG-006 | Публикация события | Private OS | Менеджер | Foundation Gate | Gate contract ready | Не подтверждено |
| MG-007 | Передача клиента | Private OS | Менеджер | Post-Gate | Требует описания | Не проверено |
| MG-008 | Договор / заявка к договору | Private OS | Менеджер в Gate; юрист Post-Gate/TBD | Foundation Gate | Gate contract ready: minimum gate | Не подтверждено |
| LG-001 | Очередь расчётов | Private OS | Логист | Foundation Gate | Gate contract ready | UI-режим частично |
| LG-002 | Форма расчёта | Private OS | Логист | Foundation Gate | Gate contract ready | Не подтверждена |
| LG-003 | Согласование с партнёром | Private OS | Логист | Foundation Gate | Gate contract ready: section allowed | Не подтверждено |
| LG-004 | Исполнение перевозки | Private OS | Логист | Foundation Gate | Gate contract ready | Нет данных |
| LG-005 | Документы от завода | Private OS | Логист | Foundation Gate | Gate contract ready | UI частично |
| LH-001 | Dashboard логистики | Private OS | Руководитель логистики | Full Product / Wave 7 | Wave 7 contract ready | Не реализовано |
| SH-001 | Dashboard продаж | Private OS | Руководитель продаж | Full Product / Wave 7 | Wave 7 contract ready | Не реализовано |
| SH-002 | Согласование низкой маржи | Private OS | Руководитель продаж | Full Product / Wave 7 | Wave 7 contract ready | Не реализовано |
| AC-001 | Счета, оплаты и закрытие | Private OS | Бухгалтер | Full Product / Wave 7 | Wave 7 contract ready | Не реализовано |
| AD-001 | Workflow-шаблоны | Private OS | Tenant admin | Foundation Gate read-only; Full Product / Wave 8 | Gate core + Wave 8 list contract ready | Read-only реализован; editor не реализован |
| AD-004 | Workflow draft editor | Private OS | Tenant admin preview default | Full Product / Wave 8 | Wave 8 contract ready | Не реализовано |
| AD-002 | Пользователи и роли | Private OS | Tenant admin | Foundation Gate | Gate contract ready | UI есть, scope не проверен |
| AD-003 | Tenant-аудит | Private OS | Tenant admin | Foundation Gate | Gate contract ready | Не подтверждено |
| EX-001 | Главная Exchange | Exchange | Участник | Full Product / Wave 9 | Wave 9 contract ready | Реализовано на preview; PR #8 submitted |
| EX-002 | Поиск грузов | Exchange | Участник | Full Product / Wave 10 | Wave 10 contract ready | Реализовано на preview; PR #9 submitted |
| EX-003 | Карточка груза | Exchange | Участник | Full Product / Wave 9 | Wave 9 contract ready | Реализовано на preview; PR #8 submitted |
| EX-004 | Создание груза | Exchange | Cargo publisher | Full Product / Wave 9 | Wave 9 contract ready | Реализовано на preview; PR #8 submitted |
| EX-005 | Поиск транспорта | Exchange | Участник | Full Product / Wave 10 | Wave 10 contract ready | Реализовано на preview; PR #9 submitted |
| EX-006 | Карточка транспорта | Exchange | Участник | Full Product / Wave 9 | Wave 9 contract ready | Реализовано на preview; PR #8 submitted |
| EX-007 | Создание транспорта | Exchange | Transport publisher | Full Product / Wave 9 | Wave 9 contract ready | Реализовано на preview; PR #8 submitted |
| EX-008 | Мои объявления | Exchange | Владелец | Full Product / Wave 9 | Wave 9 contract ready | Реализовано на preview; PR #8 submitted |
| EX-009 | Отклики и предложения | Exchange | Участники объекта | Full Product / Wave 10 | Wave 10 contract ready | Реализовано на preview; PR #9 submitted |
| EX-010 | Выбор исполнителя / контакты | Exchange | Владелец и выбранный | Full Product / Wave 10 | Wave 10 selection contract ready; contacts disabled | Выбор реализован; контакты отключены; PR #9 submitted |
| EX-011 | Профиль организации | Exchange | Участники | Full Product / Wave 9 | Wave 9 minimum profile contract ready | Реализовано на preview; PR #8 submitted |
| EX-012 | Жалоба на объявление / организацию | Exchange | Участник | Full Product / Wave 11 | Wave 11 contract ready | Не реализовано |
| PA-001 | Организации платформы | Platform admin | Platform admin | Full Product / Wave 11 | Wave 11 Exchange-control contract ready | Не реализовано |
| PA-002 | Модули и entitlements | Platform admin | Platform admin | Launch MVP | Требует описания | Не обнаружено в live UI |
| PA-003 | Модерация и жалобы | Platform admin | Moderator | Full Product / Wave 11 | Wave 11 preview contract ready; KYC/legal remain disabled | Не реализовано |
| PA-004 | Платформенный аудит | Platform admin | Platform admin | Full Product / Wave 11 | Wave 11 contract ready | Не реализовано |

Детали:

- [Контракты страниц Foundation Gate](./foundation-gate-contracts)
- [Платформа и Exchange](./platform-and-exchange)
- [Финансы, закрытие и аналитика](./finance-and-analytics)
- [Workflow Template Studio](./workflow-template-studio)
- [Exchange: объявления грузов и транспорта](./exchange-listings)
- [Exchange: поиск, сохранённые поиски и отклики](./exchange-search-responses)
- [Exchange Trust & Safety и Platform Admin](./exchange-trust-safety)
