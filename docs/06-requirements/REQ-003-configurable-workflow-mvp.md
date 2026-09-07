# REQ-003 — Configurable Workflow MVP

## Статус и цель

**Статус:** Foundation Gate core — ready for implementation; editor, inheritance и migrations — draft/later.
**Версия Product OS:** 0.5.0 — draft.
**Цель:** обеспечить версионируемые этапы QuoteRequest, Shipment и минимального Trip без обязательного полноценного визуального конструктора.

## Область

Foundation Gate требует:

- предустановленный `QuoteRequest workflow v1`;
- предустановленный `Shipment workflow v1` для `exim.kz`;
- предустановленный минимальный `Trip workflow v1` для Gate;
- версию шаблона на объекте;
- разрешённые переходы;
- права ролей;
- клиентские названия;
- историю переходов;
- read-only просмотр шаблонов администратором.

Редактор создания/изменения шаблонов через UI, drag-and-drop, form builder и миграция старых объектов не входят в Gate.

## Tenant-граница

- шаблон, версия, экземпляр и история имеют tenant или явную system scope;
- tenant A не использует и не меняет приватный шаблон tenant B;
- системное наследование остаётся OQ-044;
- Exchange использует отдельный lifecycle и не подключается к Private OS workflow автоматически.

## Минимальная модель

| Понятие | Назначение |
|---|---|
| WorkflowTemplate | Шаблон процесса и его scope |
| WorkflowTemplateVersion | Неизменяемая версия для новых объектов |
| WorkflowStage | Код, внутреннее и клиентское название, видимость и требования |
| WorkflowTransition | Разрешённый переход, роли и обязательные данные |
| WorkflowInstance | Экземпляр на конкретном объекте |
| WorkflowHistory | Старый/новый этап, автор, membership, дата и комментарий |

## Канонические lifecycle

- QuoteRequest: [Жизненные циклы](../05-statuses/lifecycles#quoterequest-workflow-v1).
- Shipment: [Жизненные циклы](../05-statuses/lifecycles#shipment-workflow-v1-для-eximkz).
- Trip: [Жизненные циклы](../05-statuses/lifecycles#trip-workflow-v1).

Shipment начинается с `preparation` после договорного gate и не повторяет стадии расчёта.

## Gate transition contract

Каждый разрешённый переход проверяется сервером и записывает старый/новый этап, автора, membership, дату и обязательную причину/комментарий. Tenant-admin override в Gate отсутствует. Строки со статусом `TBD / disabled` нельзя реализовывать догадкой или открывать в UI.

### QuoteRequest

Создание `RateQuote` — отдельное объектное действие, а не workflow transition. Назначенный логист может создать несколько независимых RateQuote, пока QuoteRequest остаётся в `rate_search`. Каждая ставка получает свой ID и историю версий. Первая ставка не меняет этап. В Gate переход `rate_search → rate_received` разрешён только отдельным действием логиста после сохранения минимум двух валидных ставок.

| Из | В | Actor в Gate | Обязательные данные | Статус основания |
|---|---|---|---|---|
| — | `draft` | Клиент своей client company или менеджер разрешённого клиента | tenant/client scope, уникальный request ID | D-005/D-006 |
| `draft` | `manager_review` | Автор запроса | Валидный минимум REQ-001, idempotency key | Gate contract из текущего процесса |
| `manager_review` | `data_required` | Менеджер | Список недостающих данных и комментарий | Gate contract; отдельного D нет |
| `data_required` | `manager_review` | Клиент или менеджер, внёсший уточнение | Недостающие данные; история старых значений | Gate contract; точный UX later |
| `manager_review` | `sent_to_logistician` | Менеджер | Назначенный логист, маршрут, груз, вес, объём | D-007/D-042 |
| `sent_to_logistician` | `data_required` | Назначенный логист | Обязательный комментарий, чего не хватает | D-041 |
| `sent_to_logistician` | `rate_search` | Назначенный логист | Данные признаны достаточными | D-041/D-043 |
| `rate_search` | `rate_received` | Назначенный логист | Минимум два отдельных валидных RateQuote; каждый содержит дату, срок, цену, валюту, доступность, маршрут, транспорт, источник и комментарий | D-044/D-056 + Gate acceptance |
| `rate_received` | `offer_preparation` | Менеджер | Выбранный RateQuote и аудит выбора | D-008/D-044/D-045 |
| `offer_preparation` | `offer_to_client` | Менеджер | Итоговая цена, услуги, client copy и версия; low-margin threshold не придумывать | D-008/D-028/D-029 |
| `offer_to_client` | `clarification_requested` | Клиент | Комментарий/вопрос и точная версия предложения | Предлагаемый Gate default |
| `clarification_requested` | `offer_to_client` | Менеджер | Новая версия предложения или документированный ответ | Предлагаемый Gate default |
| `offer_to_client` | `approved` / `rejected` | Клиент в Gate UI | Дата, actor и точная версия; для отказа причина | D-045/D-059 + Gate default actor |
| `approved` | `contract_pending` | Менеджер | Выбран тип договорного основания | D-019 + Gate default actor |
| `contract_pending` | `contract_signed` | Менеджер фиксирует факт только для Gate | Тип, номер/ссылка, дата, подписанный документ или подтверждённая ссылка, actor | D-009/D-019; постоянный actor TBD |
| `contract_signed` | `converted_to_shipment` | Менеджер | Основание, выбранная ставка, ответственный логист, idempotency | D-009/D-032 |
| `converted_to_shipment` | `closed` | Системно в той же транзакции после создания Shipment | Ссылка на ровно один Shipment | Предлагаемый Gate technical default |
| `rate_received` | `recalculation` | — | Причина и versioning | `TBD / disabled in Gate`: actor не утверждён |
| `recalculation` | `rate_received` | — | Новая версия ставки | `TBD / disabled in Gate`: actor не утверждён |
| `rate_search` / `sent_to_logistician` | `closed_without_rate` | Менеджер только для случая D-063 | Обязательная причина | Частично D-063 |
| Любой иной этап | `cancelled` / `rejected` | — | Причина и полномочие | `TBD / disabled`, кроме явного client rejection выше |

### Shipment `exim.kz`

| Из | В | Actor в Gate | Обязательные данные | Статус основания |
|---|---|---|---|---|
| — | `preparation` | Менеджер создаёт Shipment | Contract basis, QuoteRequest, выбранная ставка, client, маршрут, груз, логист | D-009/D-032 |
| `preparation` | `factory_contact` | Назначенный логист | Первичное действие/комментарий | D-032/D-046/D-048 |
| `factory_contact` | `pickup_waiting` | Назначенный логист | Готовность/контакт и ожидаемые данные забора | D-048/D-058 |
| `pickup_waiting` | `loading` | Назначенный логист | Начало погрузки, дата и локация | D-048/D-058/D-061 |
| `loading` | `in_transit` | Назначенный логист | Завершение погрузки и факт отправления | D-050/D-058/D-061 |
| `in_transit` | `border_or_customs` | — | Дата, локация и источник события | `Post-Gate / disabled in Gate`; историческое основание D-048/D-058/D-060/D-061 |
| `border_or_customs` | `final_delivery` | — | Выпуск/продолжение движения и источник | `Post-Gate / disabled in Gate`; историческое основание D-058/D-061 |
| `final_delivery` | `delivered` | — | Факт доставки/разгрузки | `Post-Gate / disabled in Gate`; историческое основание D-037/D-048/D-058 |
| `delivered` | `documents_closing` | — | Доставка подтверждена | `TBD / disabled in Gate`: actor не утверждён |
| `documents_closing` | `closed` | — | АВР, оплата, возврат документов; полный набор OQ-025 | `TBD / disabled in Gate` |
| Рабочий этап | `problem` / `paused` / `cancelled` | — | Причина, полномочие и схема возврата | `TBD / disabled as stage`; проблему можно фиксировать отдельным audit/event по D-049 |

Foundation Gate обязан пройти путь до `in_transit` и опубликовать два безопасных tracking-события. Полное закрытие Shipment не входит в Gate до OQ-025. `factory_contact` входит в Gate-enabled путь стартового tenant-template `exim.kz`. `border_or_customs` сохраняется в референсном Post-Gate template, но переход к нему отключён в Gate; правила применимости и пропуска остаются `TBD`.

### Trip

В Gate Trip создаёт назначенный логист внутри доступного Shipment. Это предлагаемый Gate actor, а не универсальное решение для всех будущих tenants.

| Из | В | Actor в Gate | Обязательные данные | Статус основания |
|---|---|---|---|---|
| — | `preparation` | Назначенный логист | tenant/workspace, parent Shipment, уникальный Trip ID, sequence, откуда, куда, transport mode, назначенный логист, idempotency key | D-010/D-032 + предлагаемый Gate default |
| `preparation` | `transport_assigned` | Назначенный логист | Партнёр/перевозчик и mode-specific transport reference; для road fixture — машина и водитель во внутреннем слое | D-048 + предлагаемый Gate contract |
| `transport_assigned` | `loading` | Назначенный логист | Дата/время, локация и источник начала погрузки | D-048/D-061 |
| `loading` | `in_transit` | Назначенный логист | Дата/время, локация, источник и факт отправления | D-048/D-061 |
| `in_transit` | `customs_if_applicable` / `delivery` | — | Правило применимости, actor и обязательные данные | `TBD / disabled in Gate` |
| `customs_if_applicable` | `delivery` | — | Выпуск/продолжение движения и источник | `TBD / disabled in Gate` |
| `delivery` | `closed` | — | Подтверждение доставки и actor закрытия | `TBD / disabled in Gate` |

Gate-приёмка создаёт минимум один Trip и проводит его до `in_transit`. Carrier, driver, контакты и внутренний transport reference не возвращаются клиенту. Два tracking-события относятся к этому Trip и публикуются по отдельному клиентскому действию менеджера.

### Публикация клиенту

- внутренний переход Shipment и публикация клиенту — разные действия;
- логист меняет внутренний этап и создаёт tracking event;
- менеджер готовит и публикует клиентский текст/статус;
- изменение плановой даты выполняет менеджер с сохранением старой даты и причины;
- клиент не выполняет Shipment transitions;
- автоматическое создание client draft из internal transition не утверждено и в Gate не требуется.

## Клиентский слой

Внутренний код не обязан совпадать с клиентским названием. Например:

| Internal | Client label |
|---|---|
| `sent_to_logistician` | Выполняется расчёт |
| `rate_search` | Выполняется расчёт |
| `offer_preparation` | Готовим предложение |
| `border_or_customs` | Проходит обязательные процедуры |

Предлагаемый полный набор client labels для Gate фиксируется в read-only template и может быть изменён отдельным решением:

| Template | Internal | Gate client label |
|---|---|---|
| QuoteRequest | `draft` | Черновик |
| QuoteRequest | `manager_review` | Проверяем заявку |
| QuoteRequest | `data_required` | Нужно уточнение |
| QuoteRequest | `sent_to_logistician`, `rate_search` | Выполняется расчёт |
| QuoteRequest | `rate_received`, `offer_preparation` | Готовим предложение |
| QuoteRequest | `offer_to_client` | Предложение готово |
| QuoteRequest | `clarification_requested` | Уточняем предложение |
| QuoteRequest | `approved` | Предложение согласовано |
| QuoteRequest | `rejected` | Предложение отклонено |
| QuoteRequest | `contract_pending` | Оформляем документы |
| QuoteRequest | `contract_signed` | Документы оформлены |
| QuoteRequest | `converted_to_shipment`, `closed` | Создана перевозка |
| QuoteRequest | `closed_without_rate` | Расчёт завершён без предложения |
| Shipment | `preparation` | Готовим перевозку |
| Shipment | `factory_contact` | Уточняем готовность груза |
| Shipment | `pickup_waiting` | Ожидаем забор груза |
| Shipment | `loading` | Идёт погрузка |
| Shipment | `in_transit` | Груз в пути |
| Shipment | `border_or_customs` | Проходит обязательные процедуры |
| Shipment | `final_delivery` | Доставка к месту назначения |
| Shipment | `delivered` | Груз доставлен |
| Shipment | `documents_closing` | Завершаем документы |
| Shipment | `closed` | Перевозка завершена |
| Trip | `preparation` | Готовим рейс |
| Trip | `transport_assigned` | Транспорт назначен |
| Trip | `loading` | Идёт погрузка |
| Trip | `in_transit` | Груз в пути |
| Trip | `customs_if_applicable` | Проходит обязательные процедуры |
| Trip | `delivery` | Доставка к месту назначения |
| Trip | `closed` | Рейс завершён |

Клиентский payload не содержит internal name, internal comment, staff-only stage, обязательные внутренние поля и закрытую историю.

## Критерии приёмки

- новый объект получает активную версию шаблона своего tenant;
- старый объект не переключается на новую версию автоматически;
- запрещённый переход отклоняется сервером;
- переход другой роли отклоняется;
- обязательный комментарий/поле проверяется до перехода;
- каждый переход появляется в истории;
- reload сохраняет текущий этап;
- клиент получает только безопасный слой;
- отсутствие entitlement блокирует действие;
- read-only список шаблонов не позволяет молча изменить production workflow.
- первая ставка не переводит QuoteRequest из `rate_search`; Gate-переход доступен только после двух валидных RateQuote;
- Trip создаётся и меняет этап только по указанной Gate-матрице; клиент получает только безопасный label.

## Открытые вопросы

- OQ-029 — обязательный набор следующих шаблонов;
- OQ-030 — кто редактирует шаблоны;
- OQ-031 — миграция версий;
- OQ-032 — эскалации;
- OQ-044 — системные и tenant-шаблоны.
