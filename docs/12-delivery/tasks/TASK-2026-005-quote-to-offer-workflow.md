---
task_id: TASK-2026-005
title: Канонический QuoteRequest → RateQuote → CommercialOffer
revision: 1
release: Full Product / Wave 3
product_module: Private Operating OS
status: submitted
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-005-r1
application_repository: https://github.com/morgiyt/exim-super-app.git
application_base_branch: task/TASK-2026-004-stable-shell-read-model
application_expected_head: f2604b76e5b72e6d9d72f5f6b68072dde2400c2f
target_environment: managed preview, synthetic data only
---

# TASK-2026-005 — Канонический QuoteRequest → RateQuote → CommercialOffer

## Авторизация и цель

Владелец утвердил full-product roadmap и непрерывное выполнение до функционально полного release candidate. TASK-2026-004 сдана отдельным private PR #1 и не объявляется accepted. Эта волна является stacked continuation: она не сливается в `main`, пока не принята зависимая база.

Цель — заменить legacy browser write-path каноническими server-side domain commands и провести запрос от draft до точной версии ответа клиента на CommercialOffer. Все действия должны быть tenant-safe, идемпотентны, версионированы и аудированы.

## Authoritative handoff

- Product OS: immutable `product-os-task-2026-005-r1`.
- Application repo: private `https://github.com/morgiyt/exim-super-app.git`.
- Stacked base: `task/TASK-2026-004-stable-shell-read-model` @ `f2604b76e5b72e6d9d72f5f6b68072dde2400c2f`.
- Feature branch: `task/TASK-2026-005-quote-to-offer-workflow`.
- PR target: `task/TASK-2026-004-stable-shell-read-model`.
- Environment: managed preview, only synthetic test data.
- Production and real customer data are forbidden.

## Причина и исходный gap

Foundation, access context и read model работают, но legacy UI всё ещё содержит прямые Supabase-style write commands, а `orders` не является канонической моделью QuoteRequest/RateQuote/CommercialOffer. Нельзя строить AgreementBasis, Shipment и Exchange поверх неверсированного и неаудируемого write-path.

## Scope

1. PostgreSQL migrations для immutable workflow definitions/versions, instances, transitions/history, QuoteRequest, RateQuote, CommercialOffer и client decisions.
2. Seed `QuoteRequest workflow v1` первого tenant только с Gate-enabled transitions REQ-003; TBD/Post-Gate branches остаются disabled.
3. Server domain services с actor/workspace/client-company scope, idempotency key, optimistic version conflict и tenant audit.
4. Client/manager draft и submit: company/contact из session scope; обязательны from/to/cargo/weight/volume; validation не стирает draft.
5. Manager review, возврат за данными, повторная отправка, назначение логиста и передача в расчёт.
6. Назначенный logistician принимает запрос, переводит в `rate_search`, создаёт минимум две независимые versioned RateQuote и отдельно завершает поиск.
7. Manager выбирает одну RateQuote, создаёт versioned CommercialOffer с demo client price/services/terms и отправляет конкретную версию клиенту.
8. Client видит только safe projection конкретной версии и отвечает approve/reject/clarification; повторная команда не создаёт второй decision.
9. Все списки/card/dashboard используют тот же read model и client labels; stable object URL переживает reload/Back/Forward.
10. Tenant admin видит read-only template/version/stages/transitions без editor controls.
11. Synthetic preview fixtures для happy path, clarification и negative A1/A2/B1 matrix.
12. Migration apply/reapply, rollback rehearsal, tests, private stacked PR, exact preview и submission/evidence.

## Вне scope

- AgreementBasis, partner basis, Shipment, Trip, TrackingEvent и documents — следующая волна;
- recalculation, arbitrary cancel, low-margin trigger и tenant-admin override;
- full workflow editor или миграция instance между template versions;
- CRM lead conversion, invitations, Exchange, billing и реальные цены;
- production, реальные данные и визуальный редизайн.

## Связи

- REQ: REQ-001, REQ-003, REQ-004, REQ-005; REQ-006 только до client decision.
- Pages: CL-002, CL-003, MG-003, MG-004, LG-001, LG-002, AD-001, AD-003.
- Lifecycles: QuoteRequest workflow v1 Gate-enabled.
- Decisions/defaults: D-005, D-006, D-007, D-025, D-041, D-042, D-056, D-063 и task-approved Gate defaults.
- OQ/TBD: recalculation actor, low-margin threshold, arbitrary cancellation, universal tenant workflow inheritance.

## Preflight

- подтвердить root/origin/base/HEAD/clean status application и Product OS;
- прочитать repository instructions, migrations, current schema, auth/access-context/read-model и native commands;
- доказать, что база совпадает с `f2604b76e5b72e6d9d72f5f6b68072dde2400c2f`;
- создать feature branch от exact stacked base; существующие изменения не stash/reset/discard;
- сохранить Product OS read-only во время application implementation.

## Допустимые изменения

- additive PostgreSQL migrations и synthetic backfill/fixtures;
- server domain modules, API routes, application UI/adapters и tests;
- task-local application reports/evidence/addenda;
- managed preview deployment exact code commit и безопасный rollback.

## Запрещённые действия

- generic browser-to-database proxy и доверие к client-supplied role/workspace/stage/price;
- direct legacy Supabase writes для scope этой задачи;
- реализация веток, помеченных TBD/Post-Gate/disabled;
- создание Shipment до следующей task;
- публикация Private OS data в Exchange;
- production deploy, реальные PII, реальные цены, секреты в Git или evidence;
- self-review, self-acceptance и автоматический merge.

## Миграции и rollback

- каждая migration получает новый последовательный ID и checksum;
- legacy synthetic orders либо детерминированно backfill в QuoteRequest, либо остаются read-only compatibility rows с документированной стратегией; скрытая двойная запись запрещена;
- apply и repeat apply обязательны;
- rollback сначала репетируется на свежем backup в отдельном test/restore контуре;
- удаление/перезапись существующих данных без доказанного reversible plan запрещены.

## Deliverables

- application code, migrations и tests в отдельной branch;
- private stacked PR с exact base/head;
- managed preview exact code commit;
- three-role browser happy path и negative tenant/role matrix;
- migration apply/reapply/rollback evidence;
- additive submission/evidence manifest без credentials/PII;
- Product OS canonical tree не изменяется application PR.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-005-01 | Additive schema содержит versioned WorkflowTemplate/Version/Stage/Transition/Instance/History, QuoteRequest, RateQuote, CommercialOffer и exact client decision; tenant/client composite references исключают cross-workspace связи. | Migration + DB constraints | Да |
| AC-005-02 | Новый QuoteRequest получает immutable active workflow version; только Gate-enabled transitions доступны; actor, required data, before/after, membership, time, reason и object version проверяются/аудируются сервером. | Domain/API positive + negative tests | Да |
| AC-005-03 | Client создаёт draft только своей client company, manager — только разрешённому клиенту; submit требует scoped company/contact + from/to/cargo/weight/volume, сохраняет введённые данные при ошибке и идемпотентен. | Form/API/E2E | Да |
| AC-005-04 | Manager может review/request-data/review-again/assign logistician; назначение чужого tenant/user и произвольная установка stage отклоняются без object disclosure. | Authorization + transition tests | Да |
| AC-005-05 | Только назначенный logistician видит очередь и создаёт независимые RateQuote; первая/вторая ставка не меняет stage, completion разрешён только при минимум двух valid quotes; ставки не перезаписываются. | Domain/API + logistician E2E | Да |
| AC-005-06 | Logistician payload не содержит client price/margin; client payload не содержит RateQuote/internal cost/partner/carrier/staff fields; negative A1/A2/B1 direct requests не раскрывают объект. | Payload schema + seven-account matrix | Да |
| AC-005-07 | Manager выбирает конкретную RateQuote и создаёт immutable CommercialOffer version с client price/services/terms/reason; следующая версия сохраняет предыдущую, low-margin automation отсутствует. | Domain/version tests + manager E2E | Да |
| AC-005-08 | Client отвечает approve/reject/clarification только на exact current sent version; stale/foreign/repeated decision отклонён или возвращает тот же idempotent result; reject/clarification требуют reason/comment по контракту. | Client/API E2E + concurrency tests | Да |
| AC-005-09 | Dashboard/list/card/search показывают один stage/client label и exact offer version после reload; direct URL, Back/Forward, safe not-found и mobile 360/375/390 работают. | Browser E2E + multi-viewport evidence | Да |
| AC-005-10 | Tenant admin видит read-only workflow v1, stages, transitions, roles и client labels только своего scope; create/edit/activate/delete/override controls и APIs отсутствуют или server-rejected. | Admin API/UI negative tests | Да |
| AC-005-11 | Migration apply/reapply и restore/rollback rehearsal проходят на synthetic backup; compatibility strategy не создаёт скрытую double-write и documented data counts совпадают. | Migration/restore logs + reconciliation | Да |
| AC-005-12 | Tests/typecheck/lint/build/checks проходят; private stacked PR и exact preview связаны с code commit; production/real data/Product OS не изменены; FAIL/NOT_RUN/BLOCKED не скрыты. | CI/deploy/submission evidence | Да |

## Stop conditions

- exact stacked base отсутствует или dirty/mismatched;
- требуются реальные данные, production или неутверждённая бизнес-ветка;
- migration нельзя безопасно применить/повторить/восстановить;
- реализация требует trusting client-supplied scope, generic table proxy или скрытую double-write;
- невозможно доказать безопасный client/logistician payload.

## Риски

- legacy `orders` может расходиться с новой канонической моделью: разрешён только явный compatibility adapter/reconciliation;
- concurrent manager/client actions требуют optimistic version и idempotency;
- synthetic prices обязаны иметь видимую маркировку и не должны выглядеть реальным коммерческим предложением;
- stacked PR зависит от незамёрженной TASK-2026-004 и не может быть принят отдельно от неё.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-17 | proposed | in_progress | Product owner authorization + task curator | Full-product roadmap уже утверждён; TASK-2026-004 сдана отдельным private PR, следующая зависимая волна открыта stacked без заявления acceptance |
| 2026-09-17 | in_progress | submitted | Codex implementation agent + task curator | Private PR #2, exact managed preview, семиролевой E2E, migration/restore evidence и submission сохранены; independent review и acceptance остаются отдельными |
