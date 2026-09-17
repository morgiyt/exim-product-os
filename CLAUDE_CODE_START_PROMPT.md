# Стартовый промпт для Claude Code

Текущая implementation task полностью адресована. Не проси владельца повторно присылать repository или объяснять, где код: используй exact identifiers ниже и выполни preflight.

---

Твоя текущая задача — выполнить `TASK-2026-010`: Workflow Template Studio и безопасную activation для уже утверждённых QuoteRequest, Shipment и Trip.

## Authoritative targets

```text
PRODUCT_OS_REPO=https://github.com/morgiyt/exim-product-os.git
PRODUCT_OS_REF=product-os-task-2026-010-r1
APPLICATION_REPO=https://github.com/morgiyt/exim-super-app.git
APPLICATION_BASE_BRANCH=task/TASK-2026-009-finance-closing-analytics
APPLICATION_EXPECTED_HEAD=2c3b4844365500481665f1071c5486aeced7efd7
APPLICATION_BRANCH=task/TASK-2026-010-workflow-template-studio
PR_TARGET=https://github.com/morgiyt/exim-super-app.git#task/TASK-2026-009-finance-closing-analytics
TARGET_ENVIRONMENT=https://superapp.185-129-49-242.sslip.io
DEPLOYMENT_LINKAGE=current release symlink + shared/deployed.sha + exact Docker image tag + ready endpoint
TEST_DATA=existing synthetic two-tenant A1/A2/B1 fixtures only
TEST_ACCOUNTS=operator-managed secure synthetic QA credentials; never print or commit
PRODUCTION_DEPLOY=FORBIDDEN
PUBLIC_INTEGRATOR_REPOSITORY=FORBIDDEN
```

Если exact repository/ref/HEAD не совпадает, worktree dirty, безопасные synthetic credentials недоступны или target ведёт в production — остановись до записи и оформи blocker. Не создавай новый scaffold, не выбирай другой EXIM repo и не переноси код в публичный repository.

## Граница двух репозиториев

1. `exim-product-os` — product truth и во время implementation строго read-only.
2. `morgiyt/exim-super-app` — единственное место application code, migrations, tests и application delivery report.
3. Не меняй Hub, EximDaily, их databases, cookies, secrets, networks или routes.
4. Не печатай credentials, tokens, cookies, env values, private keys, account emails, raw customer payloads или backup contents.

## Обязательное чтение

Прочитай полностью:

- `README.md`, `AGENTS.md`, `CLAUDE.md` и applicable nested instructions application repo;
- `docs/ai-workflow/README.md`, `current-task.md` и application TASK-2026-010;
- Product OS `README.md`, `AGENTS.md`, decisions и open questions;
- `docs/06-requirements/REQ-003-configurable-workflow-mvp.md`;
- `docs/06-requirements/REQ-014-workflow-template-studio.md`;
- `docs/04-pages/workflow-template-studio.md`;
- `docs/12-delivery/tasks/TASK-2026-010-workflow-template-studio.md`;
- `docs/07-mvp/full-product-roadmap.md`;
- `docs/10-implementation/current-state.md`.

## Preflight

До записи зафиксируй root/origin/branch/HEAD/clean status обоих repos, applicable instructions, stack только по application manifests/code, штатные build/lint/typecheck/test/migration commands и exact preview linkage. Не stash/reset/discard чужие изменения.

Если всё совпало, создай `task/TASK-2026-010-workflow-template-studio` от exact base и продолжай без второго подтверждения.

## Разрешённый scope

- additive tenant-safe draft/version/activation/field/notification schema;
- editor только для QuoteRequest/Shipment/Trip;
- task-level synthetic-preview actor `tenant_admin`;
- optimistic/idempotent drafts, deterministic validation, preview/diff;
- immutable activation with checksum/reason/audit;
- existing instances pinned, new instances use active version;
- reactivation previous version for new instances only;
- immediate in-app notifications only;
- stable routes/states/mobile, regressions, restore and exact preview.

## Запрещено додумывать

- постоянную governance OQ-030;
- новые object types OQ-029;
- system inheritance/tenant override OQ-044;
- migration existing instances OQ-031;
- escalation/SLA defaults OQ-032;
- arbitrary scripts/formulas/SQL/pricing rules;
- Exchange editor, production, real data и redesign.

## Сдача

1. Открой private stacked application PR в exact PR target.
2. Разверни только managed preview на exact runtime commit.
3. Добавь новые append-only `submission-01.md` и `evidence-manifest-01.md` в application `docs/ai-workflow/reports/TASK-2026-010/`.
4. Укажи каждый AC-010-01…12, migration/reapply, cross-tenant/direct-ID, pinned/new instance versions, browser/mobile, backup/isolated restore, exact image и GitHub checks.
5. FAIL/NOT_RUN/BLOCKED не скрывай. Не создавай review/acceptance и не объявляй собственную работу принятой.

---
