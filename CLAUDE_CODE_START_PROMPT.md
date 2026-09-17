# Claude Code — текущая implementation task

Текущая задача полностью адресована. Не проси владельца повторно присылать repository или объяснять, где код: используй exact identifiers ниже и выполни preflight.

---

Твоя текущая задача — выполнить `TASK-2026-011`: отдельные безопасные объявления грузов и транспорта в EXIM Exchange.

## Authoritative targets

```text
PRODUCT_OS_REPO=https://github.com/morgiyt/exim-product-os.git
PRODUCT_OS_REF=product-os-task-2026-011-r1
APPLICATION_REPO=https://github.com/morgiyt/exim-super-app.git
APPLICATION_BASE_BRANCH=task/TASK-2026-010-workflow-template-studio
APPLICATION_EXPECTED_HEAD=418cd628e968c864ea89680cf6d9f228675e2922
APPLICATION_BRANCH=task/TASK-2026-011-exchange-listings
PR_TARGET=https://github.com/morgiyt/exim-super-app.git#task/TASK-2026-010-workflow-template-studio
TARGET_ENVIRONMENT=https://superapp.185-129-49-242.sslip.io
DEPLOYMENT_LINKAGE=current release symlink + shared/deployed.sha + exact Docker image tag + ready endpoint
TEST_DATA=existing synthetic two-tenant fixtures only; add synthetic Exchange fixtures without real PII
```

Это private application repository владельца. Public integrator repository, production, real customer data, Hub, Daily и Product OS application writes запрещены.

## Неприкосновенная граница Product OS

Во время application run Product OS строго read-only. Не редактируй Markdown, lock, build output, branch или tag и не устанавливай туда зависимости. В конце `git status --porcelain` Product OS должен совпадать с baseline.

Все application changes выполняются только в checkout, чей `origin` точно совпадает с `APPLICATION_REPO`. Не создавай новый scaffold/repository и не угадывай stack по Vercel/другому EXIM repo.

## Обязательное чтение

Прочитай полностью:

- application `README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/ai-workflow/README.md`, `current-task.md` и TASK-2026-011;
- Product OS `README.md`, `AGENTS.md`, decisions и open questions;
- `docs/06-requirements/REQ-007-exchange-listings.md`;
- `docs/04-pages/exchange-listings.md` и общий `platform-and-exchange.md`;
- `docs/05-statuses/lifecycles.md`;
- `docs/12-delivery/tasks/TASK-2026-011-exchange-listings.md`;
- `docs/07-mvp/full-product-roadmap.md`.

## Preflight

До записи зафиксируй root/origin/branch/HEAD/clean status обоих repos, applicable instructions, stack только по application manifests/code, штатные build/lint/typecheck/test/migration commands и exact preview linkage. Не stash/reset/discard чужие изменения.

Если всё совпало, создай `task/TASK-2026-011-exchange-listings` от exact base и продолжай без второго подтверждения. При mismatch/dirty tree/production-only path остановись до записей и оформи blocker.

## Разрешённый scope

- additive separate Exchange schema: cargo/transport listings, versions/events и server-generated public projection;
- совмещаемые `cargo_publisher`/`transport_publisher` capabilities и enabled Exchange entitlement;
- conservative preview mutation actor `tenant_admin` с ownership/server authorization;
- independent drafts only, без link/copy/conversion из Private OS;
- validated common + road/rail/sea/air/multimodal field groups;
- lifecycle `draft → published ↔ paused → closed`, deterministic expiration, idempotency, optimistic version и audit;
- public feed/detail только published, own listings management и minimum organization profile;
- stable routes/states, keyboard/mobile, tests, migration/reapply/restore и managed preview.

## Запрещённый scope

- Private OS → Exchange conversion или automatic publish;
- full search/filter/ranking/saved search, responses, selection и contacts;
- KYC/verification/moderation/complaints/ratings;
- paid plans/provider/billing/real prices or real commercial limits;
- arbitrary public JSON, contacts/private IDs/staff/finance/document payload;
- separate deployable microservice, production, real data, visual redesign или правки public integrator repo.

Не закрывай OQ-034…043 предположением. Используй только task-level preview defaults из TASK-2026-011.

## Сдача

1. Открой private stacked application PR в exact PR target.
2. Разверни только managed preview на exact runtime commit.
3. Добавь новые append-only `submission-01.md` и `evidence-manifest-01.md` в application `docs/ai-workflow/reports/TASK-2026-011/`.
4. Укажи каждый AC-011-01…14, migration/reapply, capability/entitlement/role/cross-tenant/direct-ID tests, exact public payload assertions, browser/mobile, backup/isolated restore, exact image и GitHub checks.
5. FAIL/NOT_RUN/BLOCKED не скрывай. Не создавай review/acceptance и не объявляй собственную работу принятой.

---

Сначала preflight, затем сразу implementation. Дополнительное подтверждение exact repository/branch не требуется, если все identifiers совпали.
