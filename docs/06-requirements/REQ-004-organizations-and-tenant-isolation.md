# REQ-004 — Организации, memberships и tenant isolation

## Статус и цель

**Статус:** ready for implementation в Foundation Gate.<br>
**Цель:** убрать предположение «в приложении одна компания» и доказать серверную изоляцию приватных данных.

## Минимум

- глобальный account;
- organization membership;
- tenant/workspace для Private OS;
- несколько ролей membership при необходимости;
- owner/scope у всех приватных объектов;
- module entitlement;
- аудит изменения membership/role/entitlement.

Конкретные таблицы и auth-провайдер не предписываются.

## Правила

- `exim.kz` — первый tenant, но не условие универсального кода;
- organization и client company внутри tenant различаются;
- tenant admin ограничен своим tenant;
- возможности организации в Exchange не взаимоисключающие;
- UI-переключатель роли не выдаёт серверное право;
- поиск, аналитика, документы, задачи и чаты соблюдают tenant scope.

## Критерии приёмки

Создаются два отдельных `TenantWorkspace A` и `TenantWorkspace B` с разными organization memberships. Workspace A содержит client companies A1 и A2 с отдельными client accounts, а также отдельные accounts manager A, logistician A и tenant admin A. Workspace B содержит client company B1 с отдельным client account B1 и отдельным tenant admin B. Таким образом, минимальная матрица содержит семь accounts и доказывает как межtenant-изоляцию, так и изоляцию двух client companies внутри одного workspace. Под «администратором» в Gate понимается именно tenant admin, не platform admin.

- пользователь workspace A не читает клиентов, заявки, ставки, задачи, документы, чаты и перевозки workspace B;
- ограничения работают через UI, прямой URL, поиск и прямой серверный запрос;
- запрещённые поля не присутствуют в ответе;
- tenant admin A не управляет workspace B;
- клиент одной client company внутри workspace A не читает объекты другой client company того же workspace;
- роли и memberships сохраняются после reload;
- смена прав попадает в аудит;
- организация может иметь две Exchange-capabilities одновременно;
- отключённый модуль недоступен на сервере.

## Не входит

- окончательный self-service onboarding tenant;
- биллинг;
- перенос пользователя между несколькими tenants без решения OQ-035;
- физическая microservice-архитектура.
