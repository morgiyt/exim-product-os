---
task_id: TASK-2026-014
title: Modules, demo plans, subscriptions, entitlements and usage
revision: 1
release: Full Product / Wave 12
product_module: Platform + EXIM Exchange
status: in_progress
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-014-r1
application_repository: https://github.com/morgiyt/exim-super-app.git
application_base_branch: task/TASK-2026-013-exchange-trust-safety
application_expected_head: 8f9b2812c657e4c18f51fd9b93de1c188fc32296
target_environment: managed preview, synthetic data only
---

# TASK-2026-014 — Modules, demo plans, subscriptions, entitlements and usage

## Авторизация и цель

Владелец утвердил full-product roadmap, разрешил явно маркированные synthetic prices/content и поручил непрерывное stacked-выполнение. TASK-2026-013 сдана private PR #10: exact runtime `470a2a1`, report head `8f9b281`, 87/87 tests, browser/mobile, migration/reapply, backup/isolated restore и 3/3 runtime checks PASS; acceptance не заявляется.

Цель — реализовать Stage 15 и task-ready demo-часть REQ-009: immutable demo plan versions, manual platform-admin activation, subscriptions/effective entitlements, server limits, usage и две функциональные страницы. Нельзя создавать фиктивный billing, реальные списания или коммерческую оферту.

## Authoritative handoff

- Product OS: immutable `product-os-task-2026-014-r1`.
- Application repo: private `https://github.com/morgiyt/exim-super-app.git`.
- Exact stacked base: `task/TASK-2026-013-exchange-trust-safety` @ `8f9b2812c657e4c18f51fd9b93de1c188fc32296`.
- Implementation branch: `task/TASK-2026-014-modules-plans-entitlements`.
- PR target: exact stacked base branch; premature merge в `main` запрещён.
- Target: managed preview, synthetic data only.
- Production, real customer data и public integrator repository запрещены.

## Scope

1. Additive catalog/version model для modules и immutable plan versions.
2. Workspace-scoped subscription/grant, effective period, version, idempotency и ровно один active plan на module.
3. Transactional effective entitlement projection поверх существующего `module_entitlements` без browser-only enforcement и drift.
4. Два task-local Exchange fixtures: `exchange_free_demo_v1` и `exchange_plus_demo_v1` с явной demo маркировкой из REQ-009.
5. Server-enforced concurrent published-listing limits: free `1/1`, plus `10/10` для cargo/transport.
6. Exact usage read model, derived/transactionally reconciled with real published listings; foreign workspace leakage запрещена.
7. `platform_admin` manual activate/replace/end commands с reason, expected version, idempotency и append-only events/audit.
8. Tenant admin read-only own effective plan/limits/usage/history; no self-upgrade or payment path.
9. Downgrade/expiry сохраняют data/history, блокируют новые publish/resume сверх limit и разрешают pause/close/read.
10. `/exchange/plan` (ORG-003) и `/platform/entitlements` (PA-002) со stable URL, states, Retry, keyboard и mobile.
11. Source/API/schema inventory доказывает отсутствие cards, invoice, charge, refund, webhook и billing-provider secrets.
12. Full Private OS + Exchange regressions, migration/reapply/restore, exact Preview, private stacked PR и sanitized evidence.

## Task-level defaults, не закрывающие OQ-035/OQ-037/OQ-043

- Plan codes, limits и display price берутся только из REQ-009 task-level table и всегда показываются как `Демо / не является коммерческим предложением`.
- Plus display price `49 900 ₸ / 30 дней — Демо` не создаёт invoice/payment/charge и не утверждает валюту или period production plan.
- `platform_admin` — единственный mutation actor. `moderator`, `tenant_admin` и ordinary participants denied.
- Activation path только manual demo command; внешняя оплата не проверяется и не симулируется как успешная.
- Existing workspace-level `module_entitlements` остаётся enforcement boundary. Task не решает ownership организации между несколькими tenants.
- Plan не выдаёт organization capability, membership или role.
- Expired/disabled workspace сохраняет own history и может уменьшать usage; публичные ранее опубликованные данные не удаляются автоматически.

## Вне scope

- real plan names/prices/limits/currency/tax/trial, публичная оферта и legal copy;
- billing provider, card data, invoices, receipts, charges, refunds и webhooks;
- self-service checkout, promo codes, proration и automated renewal;
- contact release/paywall, bidding/commission и платформа как сторона сделки;
- KYC/verified/rating/fraud, Private OS conversion/linking, отдельный microservice;
- production, real data и visual redesign.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-014-01 | Additive schema разделяет immutable plan versions, workspace subscription/grant, effective entitlement и append-only events; unique/period/FK constraints не допускают две active subscription или cross-workspace link. | Migration + DB constraints | Да |
| AC-014-02 | Seed/reconciliation создаёт ровно task-approved free/plus demo versions с `is_demo`, disclaimer и exact limits; повтор не дублирует версии. | Migration/reapply tests | Да |
| AC-014-03 | Только `platform_admin` идемпотентно активирует/заменяет/завершает subscription с reason/period/expected version; moderator/tenant roles/direct foreign ID denied. | Authorization + lifecycle E2E | Да |
| AC-014-04 | Role/capability не обходят effective entitlement; disabled/expired module блокирует Exchange mutation прямым server request и не выдаёт implicit membership. | Negative API suite | Да |
| AC-014-05 | Free demo enforce `1 cargo + 1 transport`, plus demo `10 + 10`; concurrent/replay attempts не превышают limit и не создают лишнее объявление. | DB/service concurrency tests | Да |
| AC-014-06 | Usage/limit projection совпадает с фактическими published/resumed listings, scoped к active workspace и не раскрывает foreign organization. | Reconciliation + payload tests | Да |
| AC-014-07 | Upgrade free→plus немедленно меняет effective limit атомарно и сохраняет прежнюю subscription/event history. | Multi-role E2E + audit | Да |
| AC-014-08 | Downgrade/expiry при usage выше нового limit не удаляет listing/response/audit; new publish/resume denied, pause/close/read разрешены. | Lifecycle/retention E2E | Да |
| AC-014-09 | Tenant admin видит только own demo plan/version/period/usage/safe history и не может self-upgrade; client/manager/logistician payload plan data не получает без разрешённой страницы. | Role projection tests | Да |
| AC-014-10 | PA-002 показывает только public organization + subscription/usage metadata; platform admin не получает Private OS/contact/finance/document/membership payload. | Exact payload/source assertions | Да |
| AC-014-11 | UI/API/schema не содержат payment method, card, invoice, charge, refund, provider webhook или ложное «оплачено»; demo disclaimer видим в каждом price/plan surface. | Inventory + browser assertions | Да |
| AC-014-12 | Subscription/entitlement changes append-only audited с actor/action/before-after/reason/time/correlation без secret/PII; plan version не редактируется. | Audit + immutability tests | Да |
| AC-014-13 | `/exchange/plan` и `/platform/entitlements` поддерживают Reload/Back/Forward, keyboard, Retry, distinct states и 360/375/390 no-overflow. | Browser E2E | Да |
| AC-014-14 | Private OS, Exchange listing/search/response/moderation regressions, tests/typecheck/lint/build/checks, migration/reapply, backup/isolated restore, exact Preview/private PR/evidence PASS; Product OS/public repo/production untouched. | CI/deploy/submission | Да |

## Stop conditions

- требуется реальная оплата, provider credential, карта, invoice/refund или юридическая оферта;
- требуется назвать demo plan production-тарифом или скрыть demo disclaimer;
- требуется self-service upgrade без отдельного owner decision;
- требуется удалить/скрыть историю при downgrade/expiry либо связать plan с выдачей роли;
- exact base dirty/mismatched, destructive rewrite или доступны только production/real data;
- task-level safe default невозможен без закрытия OQ предположением.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-18 | proposed | in_progress | Product owner authorization + task curator | Утверждённый Stage 15 открыт после private submission TASK-2026-013; D-088 разрешает только явно маркированные synthetic plans/prices, billing/real commerce остаются OQ-037 |
