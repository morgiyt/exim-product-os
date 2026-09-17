---
task_id: TASK-2026-006
title: AgreementBasis → Shipment → Trip → tracking и документы
revision: 1
release: Full Product / Wave 4
product_module: Private Operating OS
status: submitted
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-006-r1
application_repository: https://github.com/morgiyt/exim-super-app.git
application_base_branch: task/TASK-2026-005-quote-to-offer-workflow
application_expected_head: a880ed0
target_environment: managed preview, synthetic data only
---

# TASK-2026-006 — AgreementBasis → Shipment → Trip → tracking и документы

## Авторизация и цель

Владелец утвердил full-product roadmap и непрерывное выполнение до функционально полного release candidate. TASK-2026-005 сдана private PR #2 и не объявляется accepted. Эта волна является stacked continuation.

Цель — после согласования точной версии CommercialOffer безопасно зафиксировать договорное основание, создать ровно один Shipment, провести Shipment и минимум один Trip до `in_transit`, добавить tracking events и отдельно опубликовать клиентские версии событий и документов.

## Authoritative handoff

- Product OS: immutable `product-os-task-2026-006-r1`.
- Application repo: private `https://github.com/morgiyt/exim-super-app.git`.
- Stacked base: `task/TASK-2026-005-quote-to-offer-workflow` @ `a880ed0`.
- Feature branch: `task/TASK-2026-006-shipment-execution`.
- PR target: `task/TASK-2026-005-quote-to-offer-workflow`.
- Environment: managed preview, only synthetic test data.
- Production and real customer data are forbidden.

## Scope

1. Additive schema для AgreementBasis, Shipment, Trip, TrackingEvent, client publication и document versions.
2. Предустановленные immutable `Shipment workflow v1` и минимальный `Trip workflow v1` только с Gate-enabled переходами до `in_transit`.
3. Manager фиксирует task-approved contractual basis только для approved exact CommercialOffer; история и actor сохраняются.
4. Создание Shipment server-side запрещено до valid basis и идемпотентно создаёт ровно один объект со ссылками на QuoteRequest, exact CommercialOffer, selected RateQuote и basis.
5. Маршрут, груз, client company, manager и logistician переносятся сервером без доверия к browser-supplied scope.
6. Назначенный logistician проводит Shipment только `preparation → factory_contact → pickup_waiting → loading → in_transit`.
7. Назначенный logistician идемпотентно создаёт один или несколько Trips; road fixture содержит internal carrier/vehicle/driver, но client projection их исключает.
8. Trip проходит только `preparation → transport_assigned → loading → in_transit`; Post-Gate transitions и arbitrary override отклоняются.
9. Logistician создаёт manual tracking events и corrections; manager отдельной командой публикует safe client version.
10. Documents имеют version, storage key, visibility и audit; direct-ID authorization запрещает чужой tenant/client company и unpublished staff-only файл.
11. Shipment/Trip list/card/search/dashboard используют один read model, safe client labels и stable URLs.
12. Synthetic three-role happy path, A1/A2/B1 negative matrix, migration/reapply/restore, private stacked PR и evidence.

## Вне scope

- полное закрытие Shipment/Trip после `in_transit`, customs/final delivery/problem/cancel branches;
- электронная подпись, реальный договорный провайдер, KYC, GPS/telematics и внешние carrier integrations;
- finance/payment/closing automation;
- CRM conversion, Exchange, billing, production и реальные данные;
- визуальный редизайн.

## Связи

- REQ: REQ-002, REQ-003, REQ-004, REQ-005, REQ-006.
- Pages: CL-003…CL-006, MG-005, MG-006, MG-008, LG-003…LG-005, AD-001, AD-003.
- Lifecycles: Shipment workflow v1 и Trip workflow v1 Gate-enabled path.
- Decisions/defaults: D-009, D-010, D-032, D-047, D-052, D-058, D-061, D-062 и task-approved Gate defaults.
- OQ/TBD: permanent contract actor, full closing stages, customs applicability, GPS, ЭЦП и legal wording.

## Preflight и ограничения

- подтвердить exact root/origin/base/head/clean status и immutable Product OS ref;
- сохранить Product OS read-only во время application implementation;
- запрещены generic table proxy, client-supplied tenant/role/price/stage и скрытая double-write;
- client не выполняет Shipment/Trip transitions и не видит carrier/driver/internal references;
- публикация tracking/document — отдельное server-authorized действие;
- production, реальные PII, реальные документы/цены и self-acceptance запрещены.

## Миграции и rollback

- новый последовательный migration ID и checksum;
- apply и repeat apply обязательны;
- rollback репетируется на свежем backup в отдельной restore DB;
- legacy `transports`, `transport_updates` и `documents` не получают скрытую double-write; compatibility strategy и counts документируются;
- destructive cleanup существующих данных запрещён.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-006-01 | Additive schema содержит AgreementBasis, Shipment, Trip, TrackingEvent/publication и document versions с tenant/client composite constraints; cross-workspace parent links невозможны. | Migration + DB constraints | Да |
| AC-006-02 | AgreementBasis создаётся manager только для approved exact current CommercialOffer, хранит type/reference/effective fields/version/actor/audit; отсутствие basis или foreign/stale offer отклоняется. | Domain/API positive + negative tests | Да |
| AC-006-03 | Create Shipment идемпотентно даёт ровно один Shipment и в одной транзакции переносит canonical request/offer/rate/basis/client/route/cargo/logistician links; повтор и race не создают дубль. | Transaction/idempotency tests + manager E2E | Да |
| AC-006-04 | Shipment получает immutable active workflow version; разрешены только `preparation → factory_contact → pickup_waiting → loading → in_transit`, assigned logistician, required data, optimistic version и audit history. | Workflow positive/negative tests + E2E | Да |
| AC-006-05 | Logistician идемпотентно создаёт Trips с parent/sequence/route/mode/assignee; road fixture требует internal carrier/vehicle/driver; только assigned logistician видит internal execution data. | Trip API/domain + logistician E2E | Да |
| AC-006-06 | Trip получает immutable workflow version и проходит только `preparation → transport_assigned → loading → in_transit`; post-Gate/foreign/client/admin-override transitions server-rejected. | Workflow authorization tests | Да |
| AC-006-07 | Logistician создаёт минимум два ordered tracking events с source/time/location/internal note и versioned correction; изменение не перезаписывает исходную историю. | Tracking API/version tests | Да |
| AC-006-08 | Manager отдельно публикует allowlisted client version; client видит safe order/status/location/time без carrier/driver/internal reference/note/author membership; unpublished event не виден. | Payload assertions + three-role E2E | Да |
| AC-006-09 | Documents versioned и привязаны к Shipment/Trip; client скачивает только published client-visible version, direct-ID foreign/unpublished access даёт safe denial; replacement сохраняет history/audit. | File authorization + version tests | Да |
| AC-006-10 | Dashboard/list/card/search показывают согласованные Shipment/Trip status/labels/timeline; stable URLs, reload, Back/Forward, safe not-found и 360/375/390 работают. | Browser E2E + multi-viewport | Да |
| AC-006-11 | A1/A2/B1 и role projections доказаны отдельными accounts; legacy transport/update/document counts не меняются скрытой double-write; migration/reapply/restore rehearsal PASS. | Seven-account matrix + reconciliation | Да |
| AC-006-12 | Tests/typecheck/lint/build/checks проходят; private stacked PR и exact preview связаны с code commit; production/real data/Product OS не изменены; report честно отражает incident/FAIL/NOT_RUN/BLOCKED. | CI/deploy/submission evidence | Да |

## Deliverables

- application code, additive migration, tests и synthetic smoke;
- managed preview exact code commit;
- private stacked PR на TASK-2026-005 branch;
- migration/reapply/isolated restore evidence;
- role-safe browser/API evidence и append-only submission manifest;
- independent review и human acceptance остаются отдельными.

## Stop conditions

- exact stacked base отсутствует или dirty/mismatched;
- contractual basis требует реальной юридической формулировки либо внешнего провайдера;
- безопасная file authorization или role-safe tracking projection недоказуема;
- требуется production, real PII, GPS/ЭЦП, destructive data rewrite или Post-Gate branch;
- миграция/restore небезопасны.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-17 | proposed | in_progress | Product owner authorization + task curator | Full-product roadmap утверждён; TASK-2026-005 сдана private PR #2, следующая зависимая execution-волна открыта stacked без заявления acceptance |
| 2026-09-17 | in_progress | submitted | Codex implementation agent + task curator | Private PR #3, runtime 88e1cdb, 36/36 tests, seven-account E2E, browser/mobile и isolated restore evidence сохранены; acceptance не заявляется |
