---
task_id: TASK-2026-013
title: EXIM Exchange — trust, complaints, moderation and platform administration
revision: 1
release: Full Product / Wave 11
product_module: Platform + EXIM Exchange
status: in_progress
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-013-r1
application_repository: https://github.com/morgiyt/exim-super-app.git
application_base_branch: task/TASK-2026-012-exchange-search-responses
application_expected_head: 4689ac079f8762ab0e6936012424a2bebcf3dbe1
target_environment: managed preview, synthetic data only
---

# TASK-2026-013 — EXIM Exchange: trust, complaints, moderation and platform administration

## Авторизация и цель

Владелец утвердил full-product roadmap и непрерывное stacked-выполнение. TASK-2026-012 сдана private PR #9: exact runtime `10fa061`, report head `4689ac0`, 78/78 tests, browser/mobile/failure-injection, backup/isolated restore и GitHub checks; acceptance не заявляется.

Цель — реализовать Stage 14 и task-ready безопасную часть REQ-010: жалобы, отдельную platform-role boundary, очередь модерации, ограничение объявления, приостановку Exchange-доступа организации и неизменяемый platform audit. Нельзя создавать ложный KYC/verified статус или выдавать модератору доступ к Private OS.

## Authoritative handoff

- Product OS: immutable `product-os-task-2026-013-r1`.
- Application repo: private `https://github.com/morgiyt/exim-super-app.git`.
- Exact stacked base: `task/TASK-2026-012-exchange-search-responses` @ `4689ac079f8762ab0e6936012424a2bebcf3dbe1`.
- Implementation branch: `task/TASK-2026-013-exchange-trust-safety`.
- PR target: exact stacked base branch; premature merge в `main` запрещён.
- Target: managed preview, synthetic data only.
- Production, real customer data и public integrator repository запрещены.

## Scope

1. Отдельные platform-role assignments `moderator` и `platform_admin`, не являющиеся tenant/workspace membership и не выдаваемые tenant admin.
2. Безопасное bootstrap/provisioning синтетических platform accounts без self-signup или повышения роли через клиентский API.
3. `ExchangeAbuseReport` для опубликованного listing или public organization profile: allowlisted reason code, необязательное безопасное пояснение, idempotency и reporter ownership.
4. `ExchangeModerationCase`, versioned lifecycle, связь с reports/target и очередь без tenant-private payload.
5. Append-only moderation decisions/actions и platform audit с actor, before/after, reason code, note, time и correlation/idempotency key.
6. Moderator может triage/report resolution и временно restrict/unrestrict listing; platform admin может дополнительно suspend/restore organization только в Exchange.
7. Listing restriction хранится отдельно от business lifecycle, сразу исключает объект из search/public detail и запрещает owner publish/resume либо новые responses/selection.
8. Organization Exchange suspension скрывает её public listings и запрещает Exchange mutations, но не удаляет данные, не отключает Private OS и не меняет tenant membership.
9. Owner видит безопасный moderation outcome/reason label и историю доступных решений; reporter видит только статус своей жалобы без личности модератора и внутренних заметок.
10. Platform organization/case/audit read models с pagination/filtering и строгой role projection.
11. UI participant report flow, moderation queue/case, organization restriction и platform audit; stable routes, mobile, keyboard, Retry и distinct states.
12. Regression TASK-2026-011/012, migration/reapply/restore, exact managed preview, private stacked PR и redacted evidence.

## Task-level defaults, не закрывающие OQ-039…041

- Эта wave утверждает технический preview-контур complaints/moderation, но не утверждает юридическую политику, SLA, апелляции, KYC-провайдера или fraud scoring.
- KYC, document verification, `verified` badge и endorsement платформой отсутствуют. Базовый public profile остаётся непроверенным профилем организации.
- Reason codes — task-local configurable preview vocabulary: `spam`, `misleading`, `duplicate`, `prohibited_content`, `contact_attempt`, `suspected_fraud`, `other`. Это не юридическая квалификация.
- Любая активная Exchange membership может пожаловаться на чужой published listing/organization; self-report и report private/hidden target запрещены.
- Moderator видит только public Exchange projection, report text и moderation metadata. Private OS, финансы, документы, workspace memberships и контакты недоступны.
- Listing restriction разрешён moderator; organization Exchange suspension/restore — только platform admin. Назначение platform roles выполняется только защищённым server/bootstrap path.
- Restriction/suspension обратимы новым append-only action; прежние решения и evidence не переписываются и не удаляются.
- Уведомление владельца только in-app. Email/SMS/WhatsApp, final legal/dispute copy и appeal workflow остаются вне task.

## Вне scope

- KYC/AML, проверка документов, external verification provider, verified badge или гарантия платформы;
- рейтинги, отзывы, trust score, автоматический fraud/risk scoring и ML;
- финальные policy/legal/dispute/appeal тексты, SLA и ответственность;
- раскрытие контактов, commercial bidding, договоры/платежи между участниками;
- billing/plans, Private OS conversion/linking, отдельный microservice;
- hard delete reports/cases/actions, production, real data и visual redesign.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-013-01 | Additive trust schema использует composite ownership/target constraints; reports/cases/actions не содержат Private OS foreign keys или unrestricted payload. | Migration + DB constraints | Да |
| AC-013-02 | `moderator`/`platform_admin` отделены от tenant roles; tenant admin, registration и ordinary API не могут выдать platform role или прочитать platform queue. | Authorization matrix | Да |
| AC-013-03 | Active Exchange participant идемпотентно создаёт report только на чужой public target с allowlisted reason; self/private/foreign/invalid target safe-rejected. | Three-organization API/E2E | Да |
| AC-013-04 | Reporter видит только свои reports и safe status; target owner видит только разрешённый outcome; чужой direct ID не раскрывает report/case/actor/internal note. | Exact payload + negative tests | Да |
| AC-013-05 | Moderator queue/case получает public target projection и moderation metadata без Private OS, contacts, finance, memberships или unrestricted documents. | Payload/source assertions | Да |
| AC-013-06 | Report/case lifecycle versioned, optimistic, idempotent и audited; terminal resolution не переписывает историю, повтор/concurrency не создаёт дубль action. | Lifecycle/concurrency tests | Да |
| AC-013-07 | Moderator restrict listing делает его недоступным в search/public detail и блокирует publish/resume/response/selection прямым серверным запросом; owner history сохраняется. | Multi-role E2E | Да |
| AC-013-08 | Unrestrict создаёт новое action, восстанавливает только допустимый business state и не удаляет прежнее решение/audit. | Lifecycle/audit tests | Да |
| AC-013-09 | Platform admin suspend organization скрывает все её public listings и блокирует Exchange mutations; Private OS login/data остаются доступны, restore обратим и audited. | Cross-module isolation E2E | Да |
| AC-013-10 | Moderator не может suspend organization, управлять platform roles или обходить scope; platform admin actions требуют reason и не дают implicit tenant membership. | Permission negative suite | Да |
| AC-013-11 | Ни один public/owner/moderator payload или UI не показывает KYC/verified/rating/endorsement; source inventory не содержит fake verification path. | API/UI/source assertions | Да |
| AC-013-12 | Platform audit append-only, фильтруем и содержит actor/action/target/before-after/reason/time/correlation без secret/credential/PII leakage. | Audit tests + redaction review | Да |
| AC-013-13 | Report, moderation, organization-control и audit routes поддерживают Reload/Back/Forward, keyboard, Retry, distinct error/forbidden/not-found и 360/375/390 no-overflow. | Browser E2E | Да |
| AC-013-14 | Exchange/Private OS regressions, tests/typecheck/lint/build/checks, migration/reapply, backup/isolated restore, exact preview/private PR/evidence PASS; Product OS/public repo/production untouched. | CI/deploy/submission | Да |

## Stop conditions

- требуется назвать организацию verified/KYC-approved либо собирать документы без утверждённого процесса;
- требуется открыть moderator доступ к Private OS, контактам, finance или tenant memberships;
- требуется финальная юридическая квалификация, dispute/appeal SLA, автоматический fraud score или irreversible delete;
- exact base dirty/mismatched, требуется destructive rewrite либо доступна только production/real data;
- безопасный task-level default невозможен без закрытия OQ предположением.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-18 | proposed | in_progress | Product owner authorization + task curator | Утверждённый Stage 14 открыт после private submission TASK-2026-012; complaints/moderation preview не создаёт KYC/verified/legal claims и не закрывает OQ-039…041 |
