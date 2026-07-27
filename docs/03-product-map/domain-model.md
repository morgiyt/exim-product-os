# Доменная модель

## Два слоя

```text
Слой данных (фиксированные сущности)
        ↕
Слой процессов (workflow-шаблоны, версии, этапы)
```

## Фиксированные сущности (D-065)

```text
Компания
├── Клиенты (пользователи)
├── Лиды
├── Запросы на расчёт
│   └── Ставки
├── Коммерческие предложения
├── Договоры
│   └── Заявки к договору
├── Перевозки
│   ├── Рейсы
│   ├── Документы
│   ├── События
│   ├── Задачи
│   └── Платежи
└── Чат
```

| Сущность | Назначение |
|---|---|
| Company | Клиентская или партнёрская компания |
| Client | Пользователь клиентской компании |
| Lead | Лид |
| QuoteRequest | Запрос на расчёт |
| RateQuote | Ставка |
| CommercialOffer | Коммерческое предложение |
| Contract | Договор |
| ContractApplication | Заявка к договору |
| Shipment | Перевозка |
| Trip | Рейс |
| Document | Документ |
| Task | Задача |
| Payment | Платёж |
| Event | Событие (внутреннее / клиентское) |

## Слой workflow (D-066…D-074)

```text
WorkflowTemplate
├── WorkflowTemplateVersion
│   └── WorkflowStage
│       ├── StageRolePermission
│       ├── ClientStageSettings
│       ├── RequiredCustomFields
│       ├── AllowedTransitions
│       └── StageNotifications
├── CustomFieldDefinition
└── WorkflowInstance (на объекте)
    ├── CurrentStage
    ├── StageHistory
    ├── Deadline / Reminder / Escalation
    └── ChangeAudit
```

| Сущность | Назначение |
|---|---|
| WorkflowTemplate | Шаблон процесса для типа объекта |
| WorkflowTemplateVersion | Версия шаблона |
| WorkflowStage | Этап: названия, порядок, цвет, роли, видимость, требования |
| StageRolePermission | Права роли на этапе |
| ClientStageSettings | Клиентское название, описание, публикация |
| CustomFieldDefinition | Настраиваемое поле (8 типов) |
| CustomFieldValue | Значение поля на объекте |
| WorkflowInstance | Экземпляр процесса на объекте |
| StageTransition | Переход между этапами с аудитом |
| ChangeAudit | Старое/новое, автор, дата, причина |
| NotificationRule | Правило уведомления этапа |
| EscalationRule | Правило эскалации |
| Deadline | Ожидаемый срок этапа |

## Бизнес-данные поверх сущностей

Сохраняются из предыдущих решений и не зависят от этапа:

- версии расчётов и перерасчёты (D-056, D-027);
- изменения цены (D-031);
- плановые даты (D-035);
- tracking-обновления (D-061);
- данные водителя — внутренний слой (D-062);
- заметки передачи клиента (D-021).

## Базовый финансовый шаблон (D-074)

Стартовый `WorkflowTemplate` для `Payment`:

```text
Счёт не выставлен → … → Закрыто
+ Просрочено / Возврат / Спор / Отменено
```

## Референсный шаблон перевозки v1 (D-058)

Операционные этапы логистики — содержимое первой версии шаблона перевозки, не код приложения.

## Принципы

- объект при создании получает актуальную версию шаблона (D-068);
- изменение шаблона не переписывает историю;
- клиент видит только этапы с `ClientStageSettings.visible = true`.

Подробнее: [Configurable Workflow Foundation](../01-foundation/configurable-workflow-foundation).
