# Workflow Template Studio — контракты страниц

## Статус и граница

**Статус:** Ready for implementation в TASK-2026-010.

**Модуль:** Private Operating OS.

**Доступ preview:** `tenant_admin` текущего workspace по task-level default REQ-014.
**Запрет:** это не Exchange editor, не system-template governance и не migration tool.

## AD-001 — Workflow-шаблоны

### Цель

Показать tenant admin активные immutable versions QuoteRequest, Shipment и Trip, drafts и activation history своего workspace.

### Данные

- template name, object type и tenant/system scope;
- active version, checksum, activated at/by и reason;
- draft status, base version, object version, author и updated at;
- количество stages/transitions/fields/notification rules;
- существующие instance counts только агрегированно и в разрешённом workspace.

### Действия

- открыть active version read-only;
- создать draft-копию active version;
- открыть существующий draft;
- открыть activation history;
- повторить загрузку после network error.

### Состояния и запреты

- loading, empty, error + retry, forbidden, not found и conflict различаются;
- system template нельзя edit/delete;
- template другого tenant отсутствует и по direct ID;
- active version нельзя изменить или удалить;
- stable list/detail URL переживает reload и Back/Forward.

## AD-004 — Редактор draft и activation preview

### Цель

Без изменения кода собрать и проверить следующую tenant-owned version уже утверждённого QuoteRequest, Shipment или Trip workflow.

### Блоки

1. **Header:** template, object type, base version, draft status/object version.
2. **Stages:** code, internal/client labels, visibility, start/terminal, order.
3. **Transitions:** stable code, from/to, roles, required reason/data.
4. **Fields:** stable key, type, sensitivity, validation/options.
5. **Notifications:** transition, recipient roles, internal/client-safe copy.
6. **Validation:** addressable errors/warnings without automatic repair.
7. **Preview:** table/graph, client layer и role matrix.
8. **Diff:** base active version → draft.
9. **Activation:** exact checksum, reason, confirmation and resulting version.
10. **Audit:** draft/validation/activation actors and timestamps.

### Кнопки и результат

- `Сохранить draft` — optimistic version + idempotency;
- `Проверить` — возвращает stable validation result;
- `Предпросмотр` — ничего не активирует;
- `Готово к активации` — только после PASS validation;
- `Активировать` — создаёт immutable version и activation event;
- `Отказаться от draft` — soft state `abandoned`, без удаления history;
- `Создать draft из версии` — новая независимая рабочая копия.

### Ошибки

- stale draft показывает conflict и предлагает reload/diff, но не перезаписывает чужое изменение;
- invalid graph/field/role/client copy показывает section + stable error code;
- network error сохраняет локально введённое состояние формы до retry;
- foreign/not-found не раскрывает template metadata;
- failed activation не создаёт partial version/activation.

### Mobile

- stage/transition tables скроллятся внутри карточки;
- document width равен viewport на 360/375/390 px;
- все controls доступны с клавиатуры, label и focus state;
- graph не является единственным способом понять workflow.

## Критерии приёмки страниц

- server response и UI соответствуют REQ-014 role/tenant boundary;
- direct open, reload, Back/Forward восстанавливают list/template/draft;
- active version read-only; draft mutation требует exact version;
- validation/preview/diff не активируют workflow;
- activation требует reason + checksum confirmation;
- существующие instances явно подписаны как pinned и не мигрируют;
- task-level preview default и оставшиеся OQ видимы в help copy;
- final redesign не требуется для functional acceptance.
