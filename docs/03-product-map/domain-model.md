# Доменная модель EXIM Super App

Модель описывает бизнес-понятия и границы, а не конкретные таблицы, ORM или число технических сервисов.

## Platform layer

```text
UserAccount
Organization
├── OrganizationMembership
├── OrganizationCapability
├── ModuleEntitlement
├── Plan / SubscriptionState
└── TenantWorkspace (опционально для Private OS)
```

| Сущность | Назначение |
|---|---|
| UserAccount | Глобальная учётная запись |
| Organization | Участник платформы и владелец модулей/объявлений |
| OrganizationMembership | Членство пользователя в организации |
| OrganizationCapability | Совмещаемые возможности организации в Exchange |
| TenantWorkspace | Изолированный Private OS организации |
| WorkspaceMembership | Роли пользователя внутри tenant |
| ModuleEntitlement | Доступ к модулю/функции и лимитам |
| Plan | Коммерческий набор entitlements; детали TBD |
| SubscriptionState | Состояние доступа, не обязательно платёж внутри приложения |
| AuditEvent | Критическое событие платформы или tenant |

## Private Operating OS

```text
TenantWorkspace
├── Company / Client
├── Lead
├── QuoteRequest
│   ├── RateQuote
│   └── CommercialOfferVersion
├── Contract
│   └── ContractApplication
├── Shipment
│   └── Trip
├── Document
├── Task
├── Payment
├── TrackingEvent
└── PrivateConversation
```

Все сущности имеют tenant/workspace scope. Shipment создаётся после договорного gate и не повторяет lifecycle расчёта.

## Workflow layer Private OS

```text
WorkflowTemplate
├── WorkflowTemplateVersion
│   └── WorkflowStage
│       ├── StageRolePermission
│       ├── ClientStageSettings
│       ├── RequiredCustomFields
│       └── AllowedTransitions
└── WorkflowInstance
    ├── CurrentStage
    ├── StageHistory
    └── ChangeAudit
```

Шаблон принадлежит tenant или имеет явную системную область. Системное наследование — OQ-044.

## Биржа грузов и транспорта — рабочая logical model

Сам контур подтверждён, но точный набор сущностей ниже является draft до OQ-039…OQ-043.

```text
Organization
├── CargoListing
├── TransportListing
├── ExchangeResponse
├── ExecutorSelection
├── ContactAccessEvent
├── ExchangeConversation
├── VerificationProfile
├── Report
└── ModerationCase
```

| Сущность | Назначение |
|---|---|
| CargoListing | Биржевое объявление о грузе |
| TransportListing | Биржевое предложение транспорта/вместимости |
| ExchangeResponse | Отклик на объявление |
| ExecutorSelection | Выбор участника владельцем объявления |
| ContactAccessEvent | Аудит открытия контактов |
| ExchangeConversation | Отдельное общение участников Exchange |
| VerificationProfile | Состояние проверки; точная модель TBD |
| Report | Жалоба участника |
| ModerationCase | Рассмотрение и решение модератора |

Выбор исполнителя не создаёт автоматически Shipment в чужом tenant и не делает платформу стороной сделки.

## Связь Private OS и Exchange — OQ-038

```text
QuoteRequest -- mechanism TBD / OQ-038 --> CargoListing
CargoListing -- interaction TBD / OQ-040 --> optional private follow-up
```

Предлагаемые guardrails, не утверждённый flow:

- private object и public listing не должны быть одним неразделимым объектом;
- связь и происхождение данных должны аудироваться;
- внешнему слою разрешается только утверждённый набор полей;
- внутренние поля не копируются;
- закрытие одного объекта не должно молча переписать другой.

## Инварианты

- `Organization` не равно `Company` внутри tenant;
- capabilities организации могут совмещаться;
- все приватные объекты имеют tenant scope;
- все Exchange-объекты имеют owner organization;
- клиентский, tenant и Exchange payload различаются;
- история статусов и цен не перезаписывается;
- физическая microservice-топология не следует из доменной модели.
