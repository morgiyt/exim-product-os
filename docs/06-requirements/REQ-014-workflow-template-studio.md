# REQ-014 — Workflow Template Studio

## Статус и цель

**Статус:** Ready for implementation в границах TASK-2026-010.

**Релиз:** Full Product / Wave 8.
**Цель:** дать tenant администратору первого tenant безопасный form-based редактор версий QuoteRequest, Shipment и Trip workflow без изменения кода, переписывания активных экземпляров и закрытия OQ-029…OQ-032/OQ-044 догадкой.

## Граница решений

TASK-2026-010 использует следующие **task-level preview defaults**, но не превращает их в универсальную модель платформы:

- только активный `tenant_admin` текущего workspace создаёт, меняет, проверяет и активирует tenant-owned draft;
- этот временный actor действует только в synthetic managed preview; постоянная governance-модель остаётся OQ-030;
- редактируются только уже утверждённые object types `QuoteRequest`, `Shipment`, `Trip`; следующий набор шаблонов остаётся OQ-029;
- system templates и шаблоны другого tenant read-only/недоступны; inheritance/override остаётся OQ-044;
- activation влияет только на новые WorkflowInstance; автоматическая миграция существующих экземпляров запрещена до OQ-031;
- разрешены немедленные in-app notifications по transition; time-based escalation defaults запрещены до OQ-032.

## Tenant и actor boundary

- все drafts, versions, stages, transitions, fields, notification rules и activation events несут `workspace_id` либо явный `system_scope`;
- tenant A не читает и не меняет drafts/versions tenant B через UI, direct ID, export или server request;
- `client`, `manager`, `logistician`, `accountant`, `sales_head`, `logistics_head` не получают editor mutations;
- entitlement `private_os` и активное membership проверяются сервером на каждом чтении и действии;
- UI role switch не создаёт permission; actor выводится из server session/context.

## Модель

| Сущность | Назначение |
|---|---|
| WorkflowTemplate | Стабильная identity шаблона и object type внутри workspace/system scope |
| WorkflowDraft | Изменяемая рабочая копия с `object_version`, автором и base version |
| WorkflowDraftStage | Код, порядок, internal/client labels, visibility и terminal flag |
| WorkflowDraftTransition | Stable code, from/to, allowed roles, reason requirement и required data |
| WorkflowFieldDefinition | Stable key, тип, sensitivity, options и validation metadata |
| WorkflowNotificationRule | Только immediate in-app событие, target roles и safe copy |
| WorkflowTemplateVersion | Неизменяемый validated snapshot с номером и checksum |
| WorkflowActivation | Append-only запись actor/time/version и причина смены active version |

## Draft lifecycle

```text
draft → ready_for_activation → activated
   └──────────────→ abandoned
```

- `draft` меняется только с exact `object_version` и idempotency key;
- validation не исправляет draft автоматически и возвращает адресуемые ошибки;
- `ready_for_activation` требует успешной полной validation;
- activation создаёт новую immutable version и append-only activation event;
- activated version нельзя edit/delete; для изменений создаётся новый draft;
- `abandoned` сохраняется для audit и не становится active;
- повтор exact command идемпотентен, reuse key с другим payload отклоняется.

## Editor contract

### Stages

- stage code стабилен, уникален в draft и соответствует `^[a-z][a-z0-9_]{1,63}$`;
- ровно один start stage;
- internal label обязателен;
- client-visible stage требует непустой безопасный client label;
- terminal stage явно помечен и не имеет исходящих transitions;
- active version сохраняет порядок stages и stable codes.

### Transitions

- from/to ссылаются на stages того же draft;
- self-loop, неизвестный stage и пустой allowed-role set запрещены;
- каждый не-terminal stage достижим от start и имеет допустимый выход;
- allowed roles берутся из поддерживаемого server role vocabulary, а не из произвольной строки;
- arbitrary stage setter, JavaScript/expression execution и raw SQL запрещены;
- transition может требовать reason и allowlisted field keys.

### Field definitions

- поддерживаются типы `text`, `textarea`, `number`, `date`, `boolean`, `select`, `file_reference`;
- field key стабилен и уникален в template version;
- sensitivity только `client_safe` или `staff_only`;
- select требует непустой versioned options list;
- validation metadata ограничена длиной, min/max, required и allowlisted options;
- staff-only values не возвращаются client projection;
- arbitrary schema/code, formulas, pricing logic и secrets в field definition запрещены.

### Notifications

- только immediate in-app notification после успешного transition;
- получатели задаются поддерживаемыми ролями текущего workspace;
- client copy использует отдельный safe text и не включает internal fields;
- email/SMS/WhatsApp/Telegram/web push, scheduled SLA и escalation rules вне scope.

## Validation и activation

Перед activation сервер проверяет:

1. tenant/object-type scope и actor;
2. exact draft version и отсутствие concurrent change;
3. unique codes, one start, reachability и отсутствие dead-end non-terminal stages;
4. ссылки transitions/fields/roles;
5. client labels и sensitivity boundaries;
6. notification recipient/copy boundaries;
7. совместимость с runtime object type;
8. diff против base active version;
9. явную reason и confirmation exact checksum.

Activation не меняет `workflow_version_id` существующих QuoteRequest/Shipment/Trip. Новые объекты получают active version своего workspace/object type. Возврат к прежней логике выполняется новой append-only activation прежней immutable version для **новых** экземпляров.

## UI и состояния

- список templates/active versions/drafts;
- detail active version read-only;
- create draft from active version;
- form-based stages/transitions/fields/notification rules;
- validation panel с stable error codes и ссылкой на секцию;
- graph/table preview и diff before activation;
- activation confirmation с version/checksum/reason;
- history activation/audit;
- loading, empty, validation error, conflict, forbidden, not found, network error + retry;
- stable routes, reload, Back/Forward и 360/375/390 px без page-level overflow.

## Не входит

- новые object types помимо QuoteRequest/Shipment/Trip;
- system-template inheritance/tenant override;
- миграция in-flight instances;
- time-based escalations и external notifications;
- drag-and-drop canvas как обязательный способ редактирования;
- arbitrary scripts, formulas, pricing rules, SQL и custom server code;
- Exchange lifecycle/editor;
- production, real data и redesign.

## Acceptance criteria

- tenant admin A создаёт draft из active version, меняет его и видит diff; tenant admin B не видит direct ID;
- non-admin editor mutations получают `403`, unknown/foreign IDs — safe denial;
- stale `object_version`, replay и changed-payload reuse проверены;
- invalid graph/role/field/client-label/notification не активируется;
- activation создаёт immutable version, checksum и activation audit;
- existing instances остаются на прежней version, новые получают новую;
- reactivation прежней version меняет default только для новых objects;
- client projection не получает staff-only definitions/values/copy;
- immediate in-app rule создаёт deduplicated role-scoped notification;
- stable routes/error states/mobile работают;
- существующие QuoteRequest/Shipment/Trip flows и tests не регрессируют;
- migration reapply, backup/isolated restore, exact preview и private stacked PR PASS.

## Открытые вопросы, которые остаются открытыми

- OQ-029 — следующие template object types;
- OQ-030 — постоянные creator/editor/activation roles и separation of duties;
- OQ-031 — migration in-flight instances;
- OQ-032 — default escalations/SLA;
- OQ-044 — system inheritance и tenant overrides.
