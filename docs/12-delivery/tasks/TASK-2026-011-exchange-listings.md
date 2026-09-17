---
task_id: TASK-2026-011
title: EXIM Exchange — объявления грузов и транспорта
revision: 1
release: Full Product / Wave 9
product_module: EXIM Exchange
status: submitted
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-011-r1
application_repository: https://github.com/morgiyt/exim-super-app.git
application_base_branch: task/TASK-2026-010-workflow-template-studio
application_expected_head: 418cd628e968c864ea89680cf6d9f228675e2922
target_environment: managed preview, synthetic data only
---

# TASK-2026-011 — EXIM Exchange: объявления грузов и транспорта

## Авторизация и цель

Владелец утвердил full-product roadmap и непрерывное выполнение. TASK-2026-010 сдана private PR #7: exact runtime `b3da470`, 62/62 tests, browser/mobile, backup/isolated restore и 3/3 GitHub checks PASS; acceptance не заявляется.

Цель — реализовать Stage 12 и task-ready часть REQ-007: отдельные публичные `CargoListing`/`TransportListing`, safe lifecycle и минимальный organization profile без публикации Private OS, responses/contacts, moderation или billing.

## Authoritative handoff

- Product OS: immutable `product-os-task-2026-011-r1`.
- Application repo: private `https://github.com/morgiyt/exim-super-app.git`.
- Stacked base: `task/TASK-2026-010-workflow-template-studio` @ `418cd628e968c864ea89680cf6d9f228675e2922`.
- Feature branch: `task/TASK-2026-011-exchange-listings`.
- PR target: `task/TASK-2026-010-workflow-template-studio`.
- Environment: managed preview, synthetic data only.
- Production, real customer data and public integrator repository are forbidden.

## Scope

1. Separate Exchange schema for organization-owned cargo/transport listings, versions/events and public profile projection.
2. Preserve existing organization/workspace/membership model; add `cargo_publisher` and `transport_publisher` as combinable capabilities without destructive rewrite.
3. Enabled `exchange` module entitlement; task-local configurable demo active-listing limit with clear non-commercial label.
4. Conservative preview mutation actor `tenant_admin`; server checks current active workspace membership, organization ownership, capability and entitlement.
5. Independent draft creation only; no foreign key, copy or conversion from QuoteRequest/Shipment/Private OS.
6. Common typed fields plus schema-validated `road`, `rail`, `sea`, `air`, `multimodal` groups; arbitrary JSON keys rejected.
7. Lifecycle `draft → published ↔ paused → closed`; deterministic `published|paused → expired`, idempotency, optimistic version and append-only audit.
8. Server-generated public allowlist and preview; no contacts/private IDs/staff fields/prices/margins/documents.
9. Exchange home/feed and public detail for published listings; search/filter/ranking/saved search intentionally deferred to TASK-2026-012.
10. My listings, create/edit/preview/publish/pause/resume/close flows and minimum organization profile.
11. Stable routes, accessibility/mobile states, cross-tenant/direct-ID negative tests and existing Private OS regression.
12. Migration/reapply/rollback note, backup/isolated restore, exact managed preview, private PR and redacted evidence.

## Task-level defaults, не закрывающие OQ

- Wave 9 actor для mutation — `tenant_admin`; окончательная organization governance остаётся OQ-034…036.
- Любая активная membership с enabled Exchange entitlement может читать published listings; unauthenticated public access не утверждается этой task.
- Создание полностью независимое. Private OS → Exchange conversion отсутствует до OQ-038.
- Mode field groups из page contract — preview baseline для сохранения данных, а не закрытие OQ-042.
- `published` — task canonical storage status; UI label «Опубликовано». Старый неканонический термин `active` не используется в новой схеме.
- `pending_moderation`, `matched`, `rejected`, `blocked` отключены до OQ-039/OQ-040 и следующих task.
- Demo active-listing limit хранится как конфигурация entitlement, видимо маркируется `Демо / не является коммерческим предложением` и не считается тарифом или утверждённой ценой.
- Профиль содержит только display name, capabilities и active listing counts; verification/rating/contacts запрещены.

## Вне scope

- поиск, filters, ranking, saved searches и pagination beyond safe feed;
- responses, shortlist, accept/reject/withdraw, selection и contact disclosure;
- KYC, verification badges, moderation, complaints, ratings/reviews;
- plans, payment provider, billing, реальные цены/лимиты и списания;
- private request conversion, automatic publishing или shared Private OS payload;
- platform participation in a deal, contracts/payments between Exchange parties;
- отдельный deployable microservice, production, real data и visual redesign.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-011-01 | Additive Exchange schema отделена от Private OS; composite ownership/FK/check constraints исключают cross-organization links и arbitrary public payload. | Migration + DB constraints | Да |
| AC-011-02 | `cargo_publisher` и `transport_publisher` совместимы у одной organization; capability, active membership, current workspace и entitlement проверяются сервером. | DB/API authorization tests | Да |
| AC-011-03 | Только own `tenant_admin` preview actor создаёт/изменяет соответствующий listing type; other roles, foreign tenant и direct ID получают safe denial. | Multi-account E2E | Да |
| AC-011-04 | Cargo draft create/update idempotent и optimistic; required common/mode data валидируется, invalid draft не теряется и не публикуется. | Cargo domain/API tests | Да |
| AC-011-05 | Transport draft даёт те же гарантии и не требует взаимоисключающего «типа компании». | Transport domain/API tests | Да |
| AC-011-06 | `road/rail/sea/air/multimodal` details сохраняются без потери; unknown keys, contacts и private identifiers отклоняются. | Parameterized schema tests | Да |
| AC-011-07 | Public preview/payload строится сервером по allowlist и не содержит workspace/member/creator IDs, contacts, BIN, staff/private/finance/document data. | Exact payload assertions | Да |
| AC-011-08 | Publish/pause/resume/close/expire transitions валидны, versioned, idempotent и audited; отключённые statuses/commands server-rejected. | Lifecycle/audit tests | Да |
| AC-011-09 | Feed/detail другой organization возвращают только `published`; drafts/paused/closed/expired и foreign owner surfaces не раскрываются. | Cross-tenant read E2E | Да |
| AC-011-10 | Minimum profile выдаёт только display name, capabilities и published counts, без ложного verified/KYC/rating/contact signal. | Projection/UI assertions | Да |
| AC-011-11 | Disabled entitlement, missing capability, validation, conflict и task-local demo limit reached имеют разные safe states; данные не удаляются при disable. | Negative API/UI suite | Да |
| AC-011-12 | Stable Exchange home/my/create/edit/detail/profile routes, Reload/Back/Forward, keyboard, Retry и 360/375/390 no-overflow PASS. | Browser E2E | Да |
| AC-011-13 | Source/route inventory подтверждает отсутствие conversion, responses/contacts, moderation/verification, billing и microservice; existing auth/Private OS regressions PASS. | Regression + inventory | Да |
| AC-011-14 | Tests/typecheck/lint/build/checks, migration/reapply, backup/isolated restore, exact managed preview, private stacked PR и redacted evidence PASS; production/real data untouched. | CI/deploy/submission | Да |

## Stop conditions

- требуется опубликовать Private OS данные или связать private object с listing;
- требуется выбрать response/contact, moderation/KYC, billing или final role governance;
- mode-specific бизнес-правило невозможно оставить validated preview baseline без ложного утверждения;
- exact base dirty/mismatched или требуется destructive rewrite;
- доступна только production/real data.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-18 | proposed | in_progress | Product owner authorization + task curator | Утверждённый Stage 12 открыт после private submission TASK-2026-010; task-level safe defaults не закрывают OQ-034…042 |
| 2026-09-18 | in_progress | submitted | Codex implementation agent + task curator | Private PR #8; runtime `7554c46`; 72/72 tests, browser/mobile, migration/reapply, isolated restore и 3/3 GitHub checks PASS; acceptance не заявляется |
