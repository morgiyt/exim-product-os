# Модули EXIM Super App

## Цель

Зафиксировать логические модули без преждевременного решения о количестве репозиториев, backend-сервисов или deploy.

| Модуль | Назначение | Foundation Gate | Launch MVP |
|---|---|:---:|:---:|
| Identity & Access | Аккаунты, сессии, memberships и роли | Да | Да |
| Organizations & Tenants | Организации, workspaces и изоляция | Да | Да |
| Entitlements | Immutable demo plans, subscriptions, effective access, limits и usage; real billing TBD | Основа | Wave 12 demo baseline |
| Private Operating OS | Внутренняя работа логистической компании | Сквозной процесс exim.kz | Да |
| Client Portal | Безопасный клиентский слой tenant | Сквозной процесс | Да |
| Биржа грузов/транспорта (`EXIM Exchange` — working name) | Грузы, транспорт и поиск; механизм взаимодействия — OQ-040 | Только границы | Да, точная механика draft |
| Moderation | Жалобы, reversible restriction/suspension и platform audit; KYC/verified/fraud disabled | Нет | Wave 11 implemented/submitted baseline |
| Platform Audit | Критические события доступа и администрирования | Основа | Да |
| Integrations | Bitrix, внешние уведомления, tracking-источники | Нет | По отдельным решениям |

## Правила

- модуль — логическая продуктовая граница, а не обязательно microservice;
- организация получает функции через entitlements;
- роль внутри tenant не заменяет entitlement;
- Private OS и Exchange используют общую identity-модель, но разные области данных;
- отключение модуля не должно удалять его историю;
- Wave 12 использует только task-local demo plans/prices; точная production-тарифная матрица и billing — OQ-037.
