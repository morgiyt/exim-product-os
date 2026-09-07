---
task_id: TASK-YYYY-NNN
task_revision: 1
decision_kind: acceptance_or_termination
submission_id: REQUIRED_FOR_ACCEPTANCE_OR_NA_WITH_REASON
review_id: REQUIRED_FOR_ACCEPTANCE_OR_NA_WITH_REASON
app_commit: REQUIRED_FOR_ACCEPTANCE_OR_NA_WITH_REASON
product_os_ref: REQUIRED
decision: pending
decided_by: null
decided_by_role: null
decided_at: null
---

# Human acceptance

> AI оставляет `decision: pending` и не заполняет поля человека. Acceptance authority не может совпадать с implementer этой сдачи.

## Условия перед решением

Для `accepted` и `changes_requested` обязательны exact submission, review и app commit. Для раннего `cancelled`/`superseded` эти поля получают `N/A_WITH_REASON`, а ниже фиксируются причина и replacement task, если он есть.

Перед `accepted` обязательно:

- обязательные AC независимо проверены;
- Preview соответствует app commit;
- release blockers закрыты либо имеют отдельный утверждённый waiver;
- migrations и rollback описаны;
- reviewer дал рекомендацию `ready_for_acceptance`.

## Решение человека

- Decision: `pending | accepted | changes_requested | cancelled | superseded`.
- Комментарий:
- Waiver/decision IDs:
- Причина раннего завершения и replacement task: `N/A` либо значение.
- Разрешён ли production deploy: `нет`, если отдельно не указано иное.

Merge application PR или наличие работающего Preview не заполняют этот документ автоматически.
