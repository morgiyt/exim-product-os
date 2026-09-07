---
report_id: SUB-TASK-YYYY-NNN-01
task_id: TASK-YYYY-NNN
task_revision: 1
submission_attempt: 1
submitted_by: REQUIRED
submitted_at: REQUIRED_WITH_TIMEZONE
product_os_ref: REQUIRED
product_os_commit: REQUIRED
app_repository: REQUIRED
app_branch: REQUIRED
app_commit: REQUIRED
pull_request: REQUIRED
preview_url: REQUIRED_OR_BLOCKED
preview_deployment_id: REQUIRED_OR_BLOCKED
status: submitted
---

# Submission report

> Это отчёт исполнителя, не независимая проверка и не приёмка.

## Executive summary

## Baseline и preflight

| Repo | Root | Origin | Base branch | Baseline SHA | Initial status | Instructions read |
|---|---|---|---|---|---|---|

## Что изменено

## Что намеренно не изменялось

## Файлы и модули

## Миграции и данные

- Migration IDs:
- Apply:
- Rollback:
- Backward compatibility:
- Existing-data impact:

## Команды и результаты

| Команда | Среда | Результат | Duration | Evidence ID | Комментарий |
|---|---|---|---|---|---|

## Acceptance matrix исполнителя

| AC ID | Claim | Result | Evidence IDs | Кто выполнял | Комментарий |
|---|---|---|---|---|---|

Допустимые результаты: `PASS_BY_IMPLEMENTER`, `FAIL`, `NOT_RUN`, `MANUAL_REQUIRED`, `BLOCKED`.

## Role / tenant matrix

| Account label | Role | Tenant | Client company | Проверенный сценарий | Result | Evidence ID |
|---|---|---|---|---|---|---|

Credentials в таблицу не записывать.

## Regression

## Failed, skipped и not-run

## Known issues и residual risks

## Rollback plan

## Blockers

| Blocker | Влияние | Владелец | Следующее действие |
|---|---|---|---|

## Evidence manifest

Ссылка: `docs/12-delivery/evidence/<TASK-ID>/evidence-manifest-NN.md`.

## Декларация

Этот submission описывает состояние exact `app_commit`. Он не означает независимую проверку, человеческую приёмку или разрешение production deploy.
