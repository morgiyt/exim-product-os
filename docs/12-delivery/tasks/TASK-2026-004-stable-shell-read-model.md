---
task_id: TASK-2026-004
title: Стабильная рабочая оболочка и единый read model
revision: 2
release: Full Product / Wave 2
product_module: Platform + Private Operating OS
status: submitted
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-004-r2
application_repository: https://github.com/morgiyt/exim-super-app.git
application_base_branch: main
application_expected_head: ef411cf
target_environment: managed preview, synthetic data only
---

# TASK-2026-004 — Стабильная рабочая оболочка и единый read model

## Авторизация и цель

Владелец утвердил full-product roadmap и непрерывное выполнение до release-ready продукта. TASK-2026-003 сохранена отдельной сдачей в приватном repository, но не объявляется принятой. Чтобы ожидание независимого review не блокировало утверждённый roadmap, эта волна является отдельным continuation от private `main`.

Цель — убрать расхождение, при котором сервер уже видит заявки и перевозки, а главная страница показывает нули или локальные данные. Все видимые списки, KPI, поиск и переходы должны опираться на один server-derived tenant/role read model.

## Scope

1. Единый server-side dashboard/read model для заявок, перевозок, KPI и поиска в разрешённом actor scope.
2. Совместимый адаптер существующей оболочки: server data заменяет локальные demo-перевозки и inbox, не становясь источником авторизации.
3. Одинаковые counts/statuses в dashboard, workflow list, shipments, inbox и search при одинаковом scope.
4. Стабильные URL/hash routes: direct open, reload, Back/Forward и безопасный fallback.
5. Явные loading, empty, error, forbidden и not-found состояния с Retry для сетевой ошибки.
6. Role-aware navigation без клиентского переключателя, способного повысить права.
7. Поиск по точному ref/ID только внутри разрешённого tenant/client-company scope без раскрытия чужого объекта.
8. Regression tests, browser evidence, managed preview и version-controlled submission.

## Вне scope

- новые business write-команды и переходы workflow;
- канонические QuoteRequest/RateQuote/CommercialOffer/Shipment migrations — следующая волна;
- Exchange, billing, реальные цены, production и реальные данные;
- визуальный редизайн.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-004-01 | Dashboard/read model получает данные только через server-derived workspace/role/client-company context и `private_os` entitlement. | API + authorization tests | Да |
| AC-004-02 | При одинаковом scope dashboard, workflow list, shipments и inbox показывают одинаковое число заявок/перевозок и согласованные статусы. | Integration + browser evidence | Да |
| AC-004-03 | Клиент видит только свою client company; logistician — только назначенные заявки/перевозки; manager/tenant admin — весь свой workspace. | Negative role matrix | Да |
| AC-004-04 | Клиентский payload не содержит internal cost, margin, carrier, driver и staff-only notes; logistician не получает client price/margin. | Schema assertions | Да |
| AC-004-05 | Search по ref/ID находит разрешённый объект; чужой и неизвестный идентификатор дают одинаковый безопасный not-found результат. | API negative tests | Да |
| AC-004-06 | Direct URL/hash, reload и Back/Forward сохраняют раздел/объект; неизвестный route безопасно ведёт в not-found/fallback без loop. | Browser navigation E2E | Да |
| AC-004-07 | Loading/empty/error/forbidden/not-found различимы; network error имеет Retry; бесконечного bootstrap нет. | Failure injection + browser evidence | Да |
| AC-004-08 | 360/375/390 px не имеют page-level overflow в основных разделах Wave 2. | Multi-viewport browser evidence | Да |
| AC-004-09 | CI/build/lint/typecheck/tests проходят; managed preview связан с exact code commit; production/real data не затронуты. | CI + deployment evidence | Да |
| AC-004-10 | TASK-2026-004 оформлена отдельной branch/PR в приватном repository владельца и не self-merges. | Git/PR evidence | Да |

## Stop conditions

- для согласованных counts требуется открыть другой tenant/client company;
- исправление требует generic browser-to-database proxy или доверия к client-supplied role/workspace;
- доступны только production или реальные данные;
- base dependency невозможно доказать.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-17 | proposed | in_progress | Product owner authorization + task curator | Full-product roadmap и автономное продолжение утверждены; TASK-2026-003 сдана отдельно и не объявляется accepted |
| 2026-09-17 | revision 1 | revision 2 | Product owner + task curator | Канонический application repository перенесён в приватный `morgiyt/exim-super-app`; scope и acceptance criteria не изменены |
| 2026-09-17 | in_progress | submitted | Codex implementation agent + task curator | Private PR #1 открыт; runtime `164f66b`, report/guard head `f2604b7`, 27/27 tests и три GitHub checks PASS; independent review и human acceptance не выполнены |
