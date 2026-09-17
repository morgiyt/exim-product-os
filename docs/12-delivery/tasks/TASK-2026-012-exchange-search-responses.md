---
task_id: TASK-2026-012
title: EXIM Exchange — поиск, сохранённые поиски и безопасные отклики
revision: 1
release: Full Product / Wave 10
product_module: EXIM Exchange
status: in_progress
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-012-r1
application_repository: https://github.com/morgiyt/exim-super-app.git
application_base_branch: task/TASK-2026-011-exchange-listings
application_expected_head: ef5ee0093824088775fa7d454303c01d19217a89
target_environment: managed preview, synthetic data only
---

# TASK-2026-012 — EXIM Exchange: поиск, saved searches и безопасные отклики

## Авторизация и цель

Владелец утвердил full-product roadmap и непрерывное stacked-выполнение. TASK-2026-011 сдана private PR #8: exact runtime `7554c46`, 72/72 tests, browser/mobile, backup/isolated restore и 3/3 GitHub checks PASS; acceptance не заявляется.

Цель — реализовать Stage 13 и task-ready REQ-008: tenant-safe поиск и сохранённые поиски, response/shortlist/reject/withdraw и ровно один выбор без раскрытия контактов, коммерческого торга или участия платформы в сделке.

## Authoritative handoff

- Product OS: immutable `product-os-task-2026-012-r1`.
- Application repo: private `https://github.com/morgiyt/exim-super-app.git`.
- Exact stacked base: `task/TASK-2026-011-exchange-listings` @ `ef5ee0093824088775fa7d454303c01d19217a89`.
- Implementation branch: `task/TASK-2026-012-exchange-search-responses`.
- PR target: exact stacked base branch; premature merge в `main` запрещён.
- Target: managed preview, synthetic data only.
- Production, real customer data и public integrator repository запрещены.

## Scope

1. Server-side search поверх Wave 9 public projections: listing type, route/geography, date range, modes и allowlisted typed parameters.
2. Cursor pagination, validated filter/sort schema и deterministic task-level order без заявления финального ranking.
3. Membership-owned saved searches: create/apply/rename/delete с tenant/organization/workspace isolation.
4. Additive `ExchangeResponse`, status events и `ExecutorSelection`; никакой связи с Private OS objects.
5. Capability direction: `transport_publisher` отвечает на CargoListing, `cargo_publisher` — на TransportListing.
6. Conservative preview mutation actor `tenant_admin`; active membership, ownership, capability и entitlement server-enforced.
7. One active response per listing/responding organization, self-response denied, idempotency и optimistic version.
8. Lifecycle `submitted → shortlisted → selected|rejected`, `submitted|shortlisted → withdrawn`, append-only audit.
9. Unique transactional selection; task-level listing `matched`, auto-reject остальных active responses с системной причиной, removal from public search и denial of new responses.
10. Minimal response note without commercial/contact/private fields; contact-like content rejected.
11. Separate author/owner views, safe public organization projection and direct-ID non-disclosure.
12. Stable routes/states, keyboard/mobile, regression, migration/reapply/restore, exact managed preview, private PR and redacted evidence.

## Task-level defaults, не закрывающие OQ

- Wave 10 response/selection mutation actor — `tenant_admin`; final organization governance remains OQ-034…036.
- Search requires authenticated active Exchange participant; anonymous public search is not authorized.
- Deterministic order is exact structured matches → `published_at DESC` → stable ID; it is not final product ranking (OQ-045).
- Saved searches are personal to membership and do not send email/push or run background matching.
- Response note has no price/financial terms; commercial fields and negotiation remain OQ-040.
- `matched` is a task-level storage state after unique selection; final relisting/cancellation rules remain OQ-040.
- Selection never reveals contacts and never creates `ContactAccessEvent`; OQ-043 remains open.
- Platform neutrality copy is operational, not final legal wording; OQ-041 remains open.

## Вне scope

- contact disclosure, phone/email/messenger exchange or ContactAccessEvent;
- price bids, auctions, negotiation, contract, payment or platform guarantee;
- KYC, verification, moderation, complaints, fraud, ratings/reviews;
- paid plans/provider/billing/real prices or commercial limits;
- final ranking/recommendation/ML and external notifications;
- Private OS conversion/linking, separate microservice, production, real data or visual redesign.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-012-01 | Additive search/response/selection schema не связывается с Private OS; composite ownership/FK/check constraints исключают cross-organization relations. | Migration + DB constraints | Да |
| AC-012-02 | Search читает только published/unexpired/unmatched public projection и поддерживает allowlisted route/date/mode/typed filters без arbitrary keys. | API/domain tests | Да |
| AC-012-03 | Cursor pagination и deterministic order стабильны без duplicates/gaps на равных timestamps; unknown cursor/filter/sort safe-rejected. | Pagination tests | Да |
| AC-012-04 | Saved search CRUD идемпотентен и изолирован по membership/organization/workspace; чужой direct ID даёт safe denial. | Multi-account API/E2E | Да |
| AC-012-05 | Cargo response требует transport capability, transport response — cargo capability; active membership, tenant_admin preview actor и entitlement проверяются сервером. | Authorization matrix | Да |
| AC-012-06 | Self-response, duplicate active response, owner/foreign mutation, disabled entitlement и non-published/expired/matched listing отклоняются разными safe errors. | Negative suite | Да |
| AC-012-07 | Response note отклоняет price/contact/private identifiers и не возвращает member/workspace/user/finance/document data в payload. | Validation + exact payload assertions | Да |
| AC-012-08 | Response create/withdraw, owner shortlist/reject и status reads versioned, idempotent, optimistic и audited; финальные состояния необратимы. | Lifecycle/audit tests | Да |
| AC-012-09 | Автор видит только свои responses, owner — responses к своим listings; третья organization и foreign direct ID ничего не раскрывают. | Three-organization E2E | Да |
| AC-012-10 | Select транзакционно создаёт ровно один ExecutorSelection, выбранный response `selected`, остальные active responses `rejected` с системной причиной, listing `matched`; concurrency/повтор не создают дубль. | Transaction/concurrency tests | Да |
| AC-012-11 | Matched listing исчезает из public search, сохраняется owner history и не принимает новые responses. | Search/lifecycle E2E | Да |
| AC-012-12 | Selected surfaces не раскрывают контакты, не создают ContactAccessEvent/договор/платёж и показывают neutral platform copy. | Source/API/UI assertions | Да |
| AC-012-13 | Search/saved/response/selection routes, Reload/Back/Forward, keyboard, Retry и 360/375/390 no-overflow PASS. | Browser E2E | Да |
| AC-012-14 | Existing Wave 9 + Private OS regressions, tests/typecheck/lint/build/checks, migration/reapply, backup/isolated restore, exact preview/private PR/evidence PASS; Product OS/public repo/production untouched. | CI/deploy/submission | Да |

## Stop conditions

- требуется раскрыть контакты, внедрить price bid/торг или юридически считать platform стороной;
- требуется moderation/KYC/billing/final ranking либо Private OS conversion;
- exact base dirty/mismatched, требуется переписать Wave 9 data или доступна только production/real data;
- task-level safe default невозможно реализовать без закрытия OQ предположением.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-18 | proposed | in_progress | Product owner authorization + task curator | Утверждённый Stage 13 открыт после private submission TASK-2026-011; contacts, commercial fields, moderation и final ranking остаются закрыты |
