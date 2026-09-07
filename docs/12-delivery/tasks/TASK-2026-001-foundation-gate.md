---
task_id: TASK-2026-001
title: Foundation Gate — безопасный Private OS core
revision: 1
release: Release 0 / pre-launch foundation
product_module: Platform + Private Operating OS
status: ready
handoff_gate: exact_application_identifiers_required_at_runtime
requested_by: product owner
implementer: integrator + Claude Code
reviewer: Codex or assigned independent reviewer
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-001-r1
application_repository: REQUIRED_IN_HANDOFF
application_base_branch: REQUIRED_IN_HANDOFF
application_expected_head: REQUIRED_EXACT_SHA_IN_HANDOFF
target_environment: preview_or_test_only
---

# TASK-2026-001 — Foundation Gate

## Авторизация и команда на старт

Владелец продукта 2026-09-07 поручил подготовить в Product OS `main` первое крупное задание Claude Code и запускать повторяемый цикл отчётности. Task curator выбрал Foundation Gate текущим pre-launch package и зафиксировал revision 1 (D-084). Задача Claude Code — реализовать [Foundation Gate](../../07-mvp/foundation-gate) в подтверждённом application repository.

Сначала выполняется read-only preflight. Если authoritative identifiers совпали и blocker отсутствует, Claude создаёт implementation branch и продолжает работу без второго запроса. Production deploy не разрешён.

## Authoritative implementation handoff

Перед передачей задания интегратор обязан дать значения в том же сообщении, где предоставляет доступ:

| Поле | Требование |
|---|---|
| `PRODUCT_OS_REPO` | `https://github.com/morgiyt/exim-product-os.git` |
| `PRODUCT_OS_REF` | `product-os-task-2026-001-r1` |
| `APPLICATION_REPO` | Точный Git remote URL, не название локальной папки |
| `APPLICATION_BASE_BRANCH` | Точная remote branch |
| `APPLICATION_EXPECTED_HEAD` | Точный immutable SHA `APPLICATION_BASE_BRANCH` |
| `PR_TARGET` | Обязан точно равняться `APPLICATION_REPO#APPLICATION_BASE_BRANCH`; fork/upstream в revision 1 не разрешён |
| `TARGET_ENVIRONMENT` | Точный Preview/staging/test target; production запрещён |
| `DEPLOYMENT_LINKAGE` | Как доказать связь Preview с application commit |
| `TEST_DATA` | Разрешённые fixtures/test DB; production data запрещены |
| `TEST_ACCOUNTS` | Безопасный способ получить семь role/scope accounts REQ-004 без записи credentials в Git |

Product OS не подтверждает, что любой известный EXIM-репозиторий является source текущего `exim-super-app.vercel.app`. Нельзя автоматически выбирать `morgiyt/exim-hub`, другой проект или создавать новое приложение по названию.

## Product OS в этой задаче

Во время реализации Product OS строго read-only. Не менять Markdown, package/lockfile, историю, навигацию и build artifacts. Исключение возникает только при сдаче: в отдельной report branch/PR разрешено добавить новые файлы отчёта и evidence по [Delivery Loop](../README).

## Обязательное чтение

До первого изменения приложения полностью прочитать:

1. `README.md`, `AGENTS.md` и applicable instruction-файлы обоих репозиториев.
2. Platform Foundation, decisions и open questions Product OS.
3. Реестр требований и каждый `REQ-001…REQ-006`.
4. Контракты страниц Foundation Gate.
5. Foundation Gate целиком.
6. `docs/10-implementation/current-state.md`.
7. `docs/10-implementation/audits/2026-09-04-super-app-live-audit.md`.
8. Этот task и правила Delivery Loop.

## Preflight до записи

Для обоих репозиториев зафиксировать:

- resolved Git root;
- `origin` URL;
- branch и exact HEAD;
- clean/dirty status;
- применимые `AGENTS.md`, `CLAUDE.md` и repository instructions.

Для application repository дополнительно зафиксировать:

- stack только по manifests, lockfiles, config и коду;
- штатные build, lint, typecheck, test и migration commands;
- deployment linkage, если он доказуем;
- точное равенство `PR_TARGET == APPLICATION_REPO#APPLICATION_BASE_BRANCH`;
- безопасную test/Preview среду;
- наличие либо способ provision тестовой tenant/account matrix;
- существующие незавершённые миграции и данные, которые нельзя потерять.

На dirty tree, remote/ref mismatch, отсутствующем target repo, конфликтующих инструкциях или единственной production DB — остановиться до записи. Не выполнять stash/reset/cleanup и не исправлять окружение догадкой.

Статус task `ready` означает, что scope и AC готовы. Поле `handoff_gate` — постоянное требование каждого запуска, а не изменяемый статус: запись разрешается только после получения exact runtime handoff и подтверждения всех его значений preflight. Claude повторяет обезличенные identifiers в blocker/submission, поэтому они остаются в version-controlled истории без credentials.

## Scope

Канонический scope — весь Foundation Gate, REQ-001…REQ-006 и page contracts. Реализация ведётся последовательными волнами:

1. **Wave 0 — baseline:** preflight, gap matrix, branch, план миграций и отката.
2. **Wave 1 — security foundation:** server RBAC, organizations/memberships, tenant и client-company isolation.
3. **Wave 2 — reliable shell:** единые scopes/counts, поиск, deep links, Reload/Back/Forward, mobile и error states, auth callback.
4. **Wave 3 — request-to-offer:** форма запроса, назначение логиста, минимум две независимые ставки, предложение менеджера и client response.
5. **Wave 4 — execution:** договорный gate, один Shipment, минимум один Trip, два tracking events и контролируемая клиентская публикация.
6. **Wave 5 — proof:** regression, role/tenant matrix, Preview, миграции/rollback, submission report и evidence manifest.

Волна может иметь отдельные commits, но сдаётся один точно зафиксированный application commit/PR. Если безопаснее несколько PR, каждый должен быть перечислен в submission, а финальный интеграционный commit обязателен.

## Вне scope

- REQ-007…REQ-010 и Exchange UI;
- связь Private OS → Exchange listing;
- контейнерно-инфраструктурный marketplace;
- смена stack, auth provider или deployment model;
- новый repository/scaffold;
- billing, KYC, GPS, ЭЦП и production deploy;
- неподтверждённые `TBD`/OQ ветки.

## Граница capability primitive

`OrganizationCapability` входит только как инертный platform-level multi-valued primitive. Для AC-TASK-006 одной тестовой организации назначаются task-local fixture codes `cargo_publisher` и `transport_publisher`: они могут сосуществовать и сохраняться, но сами не открывают route, API или действие и не заменяют `ModuleEntitlement`.

Эти коды не являются универсальным справочником. Cargo/Transport Listing, Exchange search, responses, selection, contacts, public profile/payload, moderation, plans/billing, Exchange UI и private→public conversion запрещены в этой task.

## Task-approved Gate defaults

В revision 1 правила, помеченные в REQ-001…REQ-006 как `Gate contract`, `Gate default`, `proposed Gate default`, `proposed Gate technical default` или `ready page contract`, разрешены только как ограничения Foundation Gate первого tenant `exim.kz`. Это task-level approval, а не универсальное D-решение или шаблон всех tenants.

Конкретная ветка, actor или часть поведения с отметкой `TBD`, `disabled in Gate`, `Post-Gate` либо ссылкой на нерешённый `OQ-*` остаётся запрещённой и не получает UI controls, server transitions или скрытую автоматизацию. Если одна строка одновременно задаёт task-approved временный Gate default и оставляет постоянное правило `TBD`, в Gate действует только явно указанный временный default; он не обобщается за пределы task. Изменение default требует новой task revision, history entry и owner approval.

## Обязательная сдача

1. Application branch, PR и exact commit.
2. Preview того же commit.
3. Migration apply/rollback plan и влияние на данные.
4. Точные команды и результаты build/lint/typecheck/tests.
5. Полная Foundation Gate AC-матрица.
6. Доказательства семью accounts и двумя tenants по REQ-004 либо честные `NOT_RUN/BLOCKED`.
7. Regression существующих CRM/tasks/chats/profile.
8. Known issues, failed/not-run checks и residual risks.
9. `submission-01.md` и `evidence-manifest-01.md` в Product OS report PR.

Шаблоны находятся в `docs/12-delivery/templates/`. Фраза «готово», build или merge application PR не являются приёмкой.

## Acceptance criteria

Все AC ниже обязательны. ID стабильны и не перенумеровываются между revisions; изменение смысла получает новый ID.

| AC ID | Критерий | Traceability | Evidence type |
|---|---|---|---|
| AC-TASK-001 | До записи подтверждены root/origin/base/exact HEAD/status обоих repos, immutable Product OS ref, app instructions/stack/штатные команды и безопасная non-production среда; mismatch не вызывает мутаций. | Task Preflight/Stop; Foundation Gate rules | Preflight + Git/config evidence |
| AC-TASK-002 | `/app` без session запрещён; семь Gate accounts входят своими правами; logout закрывает доступ; callback сообщает success только после verified result; recovery требует valid context. | REQ-005; AU-001/AU-003; FG §1/§12 | Auth/API tests + account E2E |
| AC-TASK-003 | Созданы A1 client, A2 client, manager A, logistician A, tenant admin A, B1 client и tenant admin B; memberships/roles/client scopes сохраняются после reload. | REQ-004/005; FG §2 | Fixture manifest + API/UI E2E |
| AC-TASK-004 | Workspace A не читает/меняет B, A2 не читает A1 через UI, direct URL, search и server request; ответ не раскрывает существование или поля чужого объекта. | REQ-004; REQ-001/002/006; common page contract | Negative API authorization + separate-account E2E |
| AC-TASK-005 | Client не получает cost/margin/contractor/carrier/driver/staff data; logistician не получает client price/margin и не меняет CommercialOffer; неверные actor/role отклоняются сервером. | REQ-001…006; client/manager/logistician contracts | Payload assertions + authorization tests |
| AC-TASK-006 | У одной test organization сосуществуют два task-local capability codes без Exchange-действий; отключённый Private OS entitlement блокирует защищённое действие сервером и не удаляет данные. | REQ-004; task capability boundary | Model/service/API + negative entitlement test |
| AC-TASK-007 | Counts и status совпадают для одинакового scope; другой scope подписан; изменения, роли и критические действия переживают reload и входят в audit. | REQ-005; FG §3/§8; MG-001/AD-003 | API consistency + UI/audit evidence |
| AC-TASK-008 | Доступные QuoteRequest/Shipment находятся по ID; неизвестный или недоступный ID даёт non-disclosure result; UI объясняет тип используемого номера. | REQ-002/005; FG §4 | Search API + role-scoped E2E |
| AC-TASK-009 | Stable URLs открывают нужный section/object; Reload сохраняет объект; Back/Forward отражают историю; return target после login остаётся в разрешённом scope. | REQ-005; FG §5; common page contract | Browser navigation E2E |
| AC-TASK-010 | На 360/375/390 px нет page-level overflow; controls/forms/dialogs доступны; loading/empty/error/forbidden/not-found различаются; Retry работает; бесконечного bootstrap нет. | REQ-005; FG §6; common page contract | Multi-viewport + failure-injection E2E |
| AC-TASK-011 | CL-002 содержит поля REQ-001/D-025; submit требует утверждённый минимум; demo values отсутствуют; draft сохраняется; ошибка не стирает ввод; повторный submit идемпотентен; scope клиента/менеджера соблюдён. | REQ-001; CL-002; FG §7 | Form E2E + validation/idempotency tests |
| AC-TASK-012 | QuoteRequest/Shipment/Trip получают immutable workflow version; разрешены только task-approved Gate transitions/actors/data; history и client labels сохраняются; все TBD/Post-Gate/editor/override controls отключены. | REQ-003; MG-003/AD-001/LG-004; FG §8 | Workflow positive/negative tests + UI evidence |
| AC-TASK-013 | В `rate_search` logistician сохраняет минимум два независимых valid RateQuote; ставки не меняют stage автоматически и не перезаписываются; completion доступен только после двух; internal layer не попадает клиенту. | REQ-001/003; LG-001/LG-002; FG §9 | Domain/API + logistician/client E2E |
| AC-TASK-014 | Manager выбирает ставку и создаёт versioned CommercialOffer; client отвечает на exact version; старая версия и причина сохраняются; low-margin trigger не включён. | REQ-001/003; MG-003/MG-004; FG §10 | Offer API + manager/client E2E |
| AC-TASK-015 | Shipment server-side запрещён до valid contract basis; Gate manager фиксирует требуемые поля; повтор не создаёт дубль; создаётся ровно один Shipment со ссылками и перенесёнными данными. | REQ-003/006; MG-005/MG-008; FG §11 | Transaction/idempotency + manager E2E |
| AC-TASK-016 | Logistician проводит Shipment только `preparation → factory_contact → pickup_waiting → loading → in_transit`; required data/actor/audit проверяются; дальнейшие и problem transitions отвергаются. | REQ-003/006; LG-004 | Workflow API positive/negative + E2E |
| AC-TASK-017 | Logistician идемпотентно создаёт Trip с parent/sequence/route/mode/assignee, для road fixture — внутренними carrier/vehicle/driver, и проводит только до `in_transit`; client получает safe layer. | REQ-002/003/006; CL-005/LG-004 | Trip API/workflow + role E2E |
| AC-TASK-018 | На Trip созданы минимум два tracking events; manager отдельно публикует safe versions; client видит порядок; correction versioned; staff fields отсутствуют в payload. | REQ-002/003/006; CL-004/CL-005/MG-006/LG-004 | API/payload/version + three-role E2E |
| AC-TASK-019 | Documents ограничены visibility/scope, versioned и audited; staff-only direct ID закрыт; factory docs internal by default; partner basis выбранной ставки фиксируется после client contract basis. | CL-006/LG-003/LG-005; D-047/D-052 | Document authorization/version + role E2E |
| AC-TASK-020 | Tenant admin управляет memberships/Gate roles/suspension только своего workspace, не выдаёт platform roles; видит свой audit; workflow templates доступны только read-only. | REQ-003/004; ORG-002/AD-001…003 | Admin negative tests + E2E |
| AC-TASK-021 | CRM/tasks/chats/profile не регрессировали; не созданы Exchange flow/UI, private→public conversion, container marketplace, billing/KYC/GPS/ЭЦП и TBD/Post-Gate controls. | REQ-005; FG/task exclusions | Regression + route/API inventory diff + negative tests |
| AC-TASK-022 | Сданы app branch/PR/exact commit, Preview того же commit, checks, migration apply/rollback/data impact, полная AC matrix и redacted evidence; FAIL/NOT_RUN/BLOCKED не скрыты; application PR не меняет Product OS. | Task Deliverables; Delivery Loop | CI/deploy/migration + submission/evidence manifest |

## Stop conditions

Claude останавливает мутации и создаёт blocker report, если:

- application target нельзя однозначно доказать;
- Product OS tag не совпадает;
- исходный worktree грязный и изменения не принадлежат задаче;
- нужны новые бизнес-решения вне Ready-части требований;
- для проверки доступна только production;
- безопасная миграция или rollback не определены;
- требуются секреты, которых нельзя получить разрешённым способом.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-07 | proposed | ready | Task curator по поручению владельца | Foundation Gate выбран первым заданием; scope и AC зафиксированы, запуск после authoritative preflight |
