# Стартовый промпт для Claude Code

Перед передачей этого текста интегратор обязан дописать значения, помеченные `REQUIRED`. Давать доступ без точного репозитория, baseline и безопасной среды недостаточно для записи в код.

---

Твоя текущая задача — выполнить `TASK-2026-001`: реализовать Foundation Gate в подтверждённом рабочем репозитории EXIM Super App.

## Authoritative targets

```text
PRODUCT_OS_REPO=https://github.com/morgiyt/exim-product-os.git
PRODUCT_OS_REF=product-os-task-2026-001-r1
APPLICATION_REPO=<REQUIRED EXACT GIT REMOTE URL>
APPLICATION_BASE_BRANCH=<REQUIRED REMOTE BRANCH>
APPLICATION_EXPECTED_HEAD=<REQUIRED EXACT SHA OF APPLICATION_BASE_BRANCH>
PR_TARGET=<REQUIRED; MUST EQUAL APPLICATION_REPO#APPLICATION_BASE_BRANCH>
TARGET_ENVIRONMENT=<REQUIRED PREVIEW/STAGING/TEST TARGET>
DEPLOYMENT_LINKAGE=<REQUIRED WAY TO PROVE PREVIEW COMMIT>
TEST_DATA=<REQUIRED SAFE FIXTURES OR TEST DATABASE>
TEST_ACCOUNTS=<REQUIRED SAFE ACCESS METHOD FOR REQ-004 MATRIX>
PRODUCTION_DEPLOY=FORBIDDEN
```

Если любое REQUIRED-значение отсутствует, выполни только read-only preflight и создай `docs/12-delivery/reports/TASK-2026-001/blocker-01.md` по blocker template в отдельном Product OS report PR. Не выбирай repository по названию папки, Vercel URL, истории или сходству stack. Не выполняй `git init`, scaffold нового приложения или перенос кода в другой EXIM-проект.

## Граница двух репозиториев

1. `exim-product-os` — источник продуктовой истины. Во время реализации он строго read-only: не менять документы, lockfile, dependencies и build/cache output, не создавать здесь application code.
2. Application repository — единственное место кода. До записи его `origin`, base branch и baseline должны точно совпасть с handoff.
3. При сдаче разрешён отдельный additive-only Product OS report PR: только новый `submission-NN.md`, `blocker-NN.md` или `addendum-NN.md`, matching `evidence-manifest-NN.md` и явно разрешённые обезличенные artifacts. Не создавай и не меняй `review-*`, `acceptance*`, task, registry, current-task, README или существующий report/evidence.

В конце preflight `git status --porcelain` Product OS должен совпадать с baseline.

## Обязательное чтение

Прочитай полностью:

- `README.md`, `AGENTS.md` и applicable instructions обоих репозиториев;
- `docs/12-delivery/README.md`;
- `docs/12-delivery/current-task.md`;
- `docs/12-delivery/tasks/TASK-2026-001-foundation-gate.md`;
- Platform Foundation, decisions и open questions;
- `docs/06-requirements/index.md` и каждый `REQ-001…REQ-006`;
- `docs/04-pages/foundation-gate-contracts.md`;
- `docs/07-mvp/foundation-gate.md`;
- `docs/10-implementation/current-state.md`;
- `docs/10-implementation/audits/2026-09-04-super-app-live-audit.md`.

## Preflight

До первого изменения покажи для обоих repos: resolved root, origin, branch, exact HEAD, clean/dirty status и прочитанные instructions. Для app repo дополнительно покажи stack только по manifests/config/code, штатные build/lint/typecheck/test/migration commands, доказанную deployment linkage и доступную test/Preview среду. Проверь, что `PR_TARGET` точно равен `APPLICATION_REPO#APPLICATION_BASE_BRANCH`; fork/upstream-схема в этой revision не разрешена.

Не stash/reset/discard чужие изменения. На mismatch, dirty tree, неизвестном target, конфликте Product OS с source или доступе только к production — остановись и сдай blocker.

Если identifiers совпали, app worktree чистый и безопасная среда доступна, создай feature branch по соглашениям app repo и сразу продолжай реализацию без второго подтверждения.

## Разрешённый scope

По подтверждённому поручению владельца task curator выбрал Foundation Gate первым implementation package. Реализуй REQ-001…REQ-006, task-level Gate defaults и page contracts волнами, указанными в `TASK-2026-001`.

Не входят: REQ-007…REQ-010/Exchange, private→public conversion, контейнерный marketplace, смена stack/auth/deployment, новые `TBD`-правила и production deploy.

Не удаляй существующие данные и не сбрасывай базу. Каждая миграция имеет apply, rollback, backward-compatibility и data-impact описание. После каждого блока запускай штатные проверки приложения.

## Сдача

Открой application PR и Preview на exact commit. Затем открой отдельный Product OS report PR с:

- `docs/12-delivery/reports/TASK-2026-001/submission-01.md`;
- `docs/12-delivery/evidence/TASK-2026-001/evidence-manifest-01.md`.

Используй шаблоны `docs/12-delivery/templates/`. Укажи failed/not-run проверки честно. Не создавай review/acceptance и не меняй canonical status: submission, merge и deploy не являются независимой приёмкой.

---
