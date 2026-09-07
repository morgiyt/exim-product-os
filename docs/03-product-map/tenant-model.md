# Tenant-модель

## ID и цель

**ID:** MODEL-005<br>
**Цель:** разделить платформу, организацию, tenant/workspace и компании-контрагенты.

## Канонические различия и рабочая logical model

Различия `Organization` / `TenantWorkspace` / `Company` обязательны. Конкретные cardinality, названия таблиц и точный capability-справочник являются draft до OQ-034…OQ-036.

```text
UserAccount
└── OrganizationMembership
    └── Organization
        ├── ExchangeCapabilities
        ├── ModuleEntitlements
        └── TenantWorkspace (если подключён Private OS)
            ├── WorkspaceMemberships + roles
            └── Companies / clients / requests / shipments / documents
```

## Правила

1. `UserAccount` — глобальная учётная запись, но её доступ определяется memberships.
2. `Organization` — участник платформы и Exchange.
3. `TenantWorkspace` — приватная область Private OS организации.
4. `Company` внутри workspace — клиент или контрагент tenant, а не сам tenant.
5. У организации может быть несколько Exchange-capabilities.
6. Наличие Exchange-capability не выдаёт доступ к Private OS.
7. Наличие роли Private OS не публикует данные в Exchange.
8. Каждая приватная сущность имеет workspace/tenant scope.
9. Доступ между несколькими tenants не предполагается автоматически.
10. `exim.kz` — первый экземпляр tenant, а не условие в универсальном коде.

## Минимальная проверка

- пользователь без membership не открывает организацию;
- пользователь `TenantWorkspace A` не читает workspace B через UI, URL, search или API;
- client company A1 внутри workspace A не читает объекты client company A2;
- tenant admin A не становится platform admin;
- организация может иметь capabilities cargo publisher и carrier одновременно;
- отключённый entitlement блокирует модуль на сервере;
- смена роли или membership фиксируется в аудите.

## Открытые вопросы

- OQ-034 — создание и владение tenant;
- OQ-035 — участие одной организации в нескольких tenants;
- OQ-036 — объединение и конфликт ролей;
- OQ-044 — системные и tenant-шаблоны workflow.
