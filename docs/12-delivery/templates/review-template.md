---
review_id: REV-TASK-YYYY-NNN-01
task_id: TASK-YYYY-NNN
task_revision: 1
submission_id: SUB-TASK-YYYY-NNN-01
reviewed_by: REQUIRED
reviewer_role: independent_reviewer
started_at: REQUIRED_WITH_TIMEZONE
completed_at: null
verified_app_commit: REQUIRED
verified_preview_url: REQUIRED_OR_BLOCKED
preview_integrity_result: REQUIRED_PASS_FAIL_OR_BLOCKED
recommendation: pending
---

# Independent review

Допустимая рекомендация: `changes_requested`, `blocked`, `ready_for_acceptance`.

`reviewed_by` не может совпадать с implementer или `submitted_by`. До завершения review поля `completed_at` и `recommendation` остаются `null`/`pending`. Если Preview отсутствует или не соответствует commit, reviewer фиксирует наблюдаемый URL/ошибку и ставит `preview_integrity_result: BLOCKED` или `FAIL`, не выдумывая verified URL.

## Commit / Preview integrity

## Независимо выполненные проверки

## Reviewer AC matrix

| AC ID | Result | Evidence | Расхождение с submission | Комментарий |
|---|---|---|---|---|

Допустимые результаты: `PASS`, `FAIL`, `NOT_VERIFIED`.

## Найденные BUG/GAP

## Обязательные исправления

## Residual risks

## Рекомендация acceptance authority

Reviewer не редактирует submission исполнителя.
