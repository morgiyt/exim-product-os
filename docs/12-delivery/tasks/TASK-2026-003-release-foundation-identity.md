---
task_id: TASK-2026-003
title: Release foundation и явный access context
revision: 1
release: Full Product / Wave 1
product_module: Platform + Private Operating OS
status: in_progress
handoff_gate: exact_application_identifiers_confirmed
requested_by: product owner
implementer: Codex
reviewer: independent reviewer or assigned human
acceptance_authority: product owner or explicitly delegated human
product_os_ref: product-os-task-2026-003-r1
application_repository: https://github.com/alanbykov11work-ux/exim.git
application_base_branch: task/TASK-2026-002-self-hosted-postgres
application_expected_head: b3dd29751fbb9a6334f255e58576764dd44a29cd
target_environment: managed preview, synthetic data only
---

# TASK-2026-003 — Release foundation и явный access context

## Авторизация и цель

Владелец 2026-09-17 утвердил [полный roadmap](../../07-mvp/full-product-roadmap) и поручил начать немедленно. Эта волна превращает self-hosted preview в безопасную основу дальнейшего продукта: устраняет неявный выбор наиболее привилегированной membership, вводит явный session context, доказывает role/tenant matrix и закрепляет release pipeline.

TASK-2026-002 остаётся отдельной технической сдачей и не объявляется независимо принятой. Чтобы не блокировать разработку ожиданием review, TASK-2026-003 является stacked continuation от её exact head. Merge TASK-2026-003 в `main` запрещён до включения его base dependency либо безопасного rebase.

## Scope

1. PostgreSQL migration для активной membership/session context без изменения применённой `0001`.
2. Server API для списка разрешённых contexts и безопасного переключения активной membership.
3. Устранение автоматического выбора самой привилегированной роли при нескольких memberships.
4. Явный экран выбора workspace/role, если контекст неоднозначен.
5. Переиспользуемые server authorization guards для workspace, role и entitlement.
6. Синтетическая acceptance matrix: A1 client, A2 client, manager A, logistician A, tenant admin A, B1 client, tenant admin B.
7. Negative tests workspace/client-company/role boundaries и audit переключения.
8. CI/checks и обновлённая эксплуатационная документация для exact commit.

## Вне scope

- production cutover и реальные данные;
- реальный прайс, billing provider или юридические тексты;
- Exchange listings/search/responses;
- полный workflow editor;
- SSO или общая БД с EXIM Hub;
- визуальный редизайн.

## Acceptance criteria

| AC ID | Критерий | Evidence type | Обязательный |
|---|---|---|---|
| AC-003-01 | Session хранит выбранную active membership; значение ссылается только на активную membership того же user. | Migration + DB tests | Да |
| AC-003-02 | При одной membership контекст выбирается однозначно; при нескольких без выбора приложение не повышает роль и показывает context chooser. | Unit/integration + browser evidence | Да |
| AC-003-03 | GET contexts возвращает только memberships session user; POST принимает только принадлежащую ему active membership и проверяет same-origin. | API negative tests | Да |
| AC-003-04 | После переключения workspace/role все state, profile, files и workflow API используют новый server-derived context; client context не получает internal fields. | Role/API E2E | Да |
| AC-003-05 | Переключение context фиксируется в tenant audit обоих применимых scopes без credentials/PII в metadata. | DB/API evidence | Да |
| AC-003-06 | Семь синтетических accounts покрывают два workspaces и A1/A2/B1; чужие direct IDs/search/writes не раскрывают существование или поля объектов. | Fixture manifest + negative matrix | Да |
| AC-003-07 | Entitlement и role guards закрывают действие сервером, а не только скрывают кнопку. | Authorization tests | Да |
| AC-003-08 | Build, lint, typecheck, tests, migration apply/reapply и documented rollback проходят; secrets и реальные данные отсутствуют. | CI/local + migration evidence | Да |
| AC-003-09 | Managed preview связан с exact app commit; Hub и Daily не используют Super App DB/cookies/secrets и не регрессировали. | Deployment/regression evidence | Да |
| AC-003-10 | TASK-2026-002 PR не загрязнён новой волной; новая ветка/PR явно указывает stacked dependency и не self-merges. | Git/PR evidence | Да |

## Stop conditions

- доступна только production среда или реальные клиентские данные;
- migration не имеет безопасного forward/rollback плана;
- нужна общая DB/secret/cookie с Hub или Daily;
- требуется выдумать реальную цену, legal/KYC правило или Exchange contact policy;
- base head изменился так, что dependency нельзя доказать.

## История статуса

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-17 | proposed | in_progress | Product owner authorization + task curator | Roadmap утверждён; известный self-hosted baseline разрешает безопасную stacked-разработку без production writes |

