# Claude Code — текущая implementation task

Текущая задача полностью адресована. Не проси владельца повторно присылать repository или объяснять, где код: используй exact identifiers ниже и выполни preflight.

---

Твоя текущая задача — выполнить `TASK-2026-012`: поиск, сохранённые поиски и безопасные отклики в EXIM Exchange.

## Authoritative targets

```text
PRODUCT_OS_REPO=https://github.com/morgiyt/exim-product-os.git
PRODUCT_OS_REF=product-os-task-2026-012-r1
APPLICATION_REPO=https://github.com/morgiyt/exim-super-app.git
APPLICATION_BASE_BRANCH=task/TASK-2026-011-exchange-listings
APPLICATION_EXPECTED_HEAD=ef5ee0093824088775fa7d454303c01d19217a89
APPLICATION_BRANCH=task/TASK-2026-012-exchange-search-responses
PR_TARGET=https://github.com/morgiyt/exim-super-app.git#task/TASK-2026-011-exchange-listings
TARGET_ENVIRONMENT=https://superapp.185-129-49-242.sslip.io
DEPLOYMENT_LINKAGE=current release symlink + shared/deployed.sha + exact Docker image tag + ready endpoint
TEST_DATA=existing synthetic two-tenant fixtures only; add synthetic Exchange response fixtures without real PII
```

Это private application repository владельца. Public integrator repository, production, real customer data, Hub, Daily и Product OS application writes запрещены.

## Неприкосновенная граница Product OS

Во время application run Product OS строго read-only. Не редактируй Markdown, lock, build output, branch или tag и не устанавливай туда зависимости. В конце `git status --porcelain` Product OS должен совпадать с baseline.

Все application changes выполняются только в checkout, чей `origin` точно совпадает с `APPLICATION_REPO`. Не создавай новый scaffold/repository и не угадывай stack по Vercel/другому EXIM repo.

## Обязательное чтение

Прочитай полностью:

- application `README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/ai-workflow/README.md`, `current-task.md` и TASK-2026-012;
- Product OS `README.md`, `AGENTS.md`, decisions и open questions;
- `docs/06-requirements/REQ-007-exchange-listings.md` и `REQ-008-exchange-search-and-responses.md`;
- `docs/04-pages/exchange-listings.md`, `exchange-search-responses.md` и общий `platform-and-exchange.md`;
- `docs/05-statuses/lifecycles.md`;
- `docs/12-delivery/tasks/TASK-2026-012-exchange-search-responses.md`;
- `docs/07-mvp/full-product-roadmap.md`.

## Preflight

До записи зафиксируй root/origin/branch/HEAD/clean status обоих repos, applicable instructions, stack только по application manifests/code, штатные build/lint/typecheck/test/migration commands и exact preview linkage. Не stash/reset/discard чужие изменения.

Если всё совпало, создай `task/TASK-2026-012-exchange-search-responses` от exact base и продолжай без второго подтверждения. При mismatch/dirty tree/production-only path остановись до записей и оформи blocker.

## Разрешённый scope

- server-side allowlisted search по published/unexpired/unmatched Wave 9 listings;
- route/date/mode/typed filters, cursor pagination и deterministic task-level order без заявления final ranking;
- membership-owned tenant-safe saved search CRUD без external notifications/background matching;
- additive ExchangeResponse/status events/ExecutorSelection без Private OS links;
- capability direction, conservative tenant_admin preview actor, entitlement/ownership/server authorization;
- one active response per organization/listing, self-response denial, idempotency, optimistic version и audit;
- lifecycle submitted → shortlisted → selected|rejected и submitted|shortlisted → withdrawn;
- unique transactional selection, auto-reject остальных active responses с системной причиной, listing matched и закрытие новых responses;
- non-commercial response note без contact/private identifiers;
- author/owner views, stable routes/states, keyboard/mobile, tests, migration/reapply/restore и managed preview.

## Запрещённый scope

- раскрытие контактов, ContactAccessEvent, phone/email/messenger exchange;
- price bid, торг, договор, платёж или гарантия платформы;
- KYC/verification/moderation/complaints/fraud/ratings;
- paid plans/provider/billing/real prices or commercial limits;
- final ranking/recommendation/ML и external notifications;
- Private OS conversion/link, separate microservice, production, real data, visual redesign или правки public integrator repo.

Не закрывай OQ-034…045 предположением. Используй только task-level preview defaults из TASK-2026-012.

## Сдача

1. Открой private stacked application PR в exact PR target.
2. Разверни только managed preview на exact runtime commit.
3. Добавь новые append-only `submission-01.md` и `evidence-manifest-01.md` в application `docs/ai-workflow/reports/TASK-2026-012/`.
4. Укажи каждый AC-012-01…14, migration/reapply, search/pagination/saved-search/capability/entitlement/self/foreign/direct-ID/contact tests, concurrency selection, browser/mobile, backup/isolated restore, exact image и GitHub checks.
5. FAIL/NOT_RUN/BLOCKED не скрывай. Не создавай review/acceptance и не объявляй собственную работу принятой.

---

Сначала preflight, затем сразу implementation. Дополнительное подтверждение exact repository/branch не требуется, если все identifiers совпали.
