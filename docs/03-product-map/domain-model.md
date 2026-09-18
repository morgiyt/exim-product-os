# Доменная модель EXIM Super App

Модель описывает бизнес-понятия и границы, а не конкретные таблицы, ORM или число технических сервисов.

## Platform layer

```text
UserAccount
Organization
├── OrganizationMembership
├── OrganizationCapability
├── ModuleEntitlement
├── PlanVersion
├── WorkspaceSubscription
├── UsageSnapshot
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
| PlanVersion | Immutable набор module limits; Wave 12 содержит только явно маркированные task-local demo fixtures |
| WorkspaceSubscription | Versioned effective period и manual demo activation; не означает платёж |
| UsageSnapshot | Scoped фактическое usage относительно effective limits |
| AuditEvent | Критическое событие платформы или tenant |

Wave 12 реализует техническую модель без payment/card/invoice/charge/refund/provider сущностей. Реальная коммерческая модель остаётся OQ-037.

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

Контур подтверждён. CargoListing/TransportListing/ExchangeResponse/ExecutorSelection реализованы Wave 9/10; Report/ModerationCase и platform audit входят в task-ready Wave 11. ContactAccessEvent, ExchangeConversation и VerificationProfile остаются отключённым draft до OQ-039…OQ-043.

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
| VerificationProfile | Состояние проверки; точная модель TBD, Wave 11 не создаёт |
| Report | Жалоба участника; Wave 11 task-ready public-target contract |
| ModerationCase | Versioned рассмотрение и append-only решение moderator |

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
