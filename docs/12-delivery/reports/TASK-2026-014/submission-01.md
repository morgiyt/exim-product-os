---
report_id: SUB-TASK-2026-014-01
task_id: TASK-2026-014
task_revision: 1
submission_attempt: 1
submitted_by: Codex implementation agent
submitted_at: 2026-09-22T11:50:37+05:00
product_os_ref: product-os-task-2026-014-r1 / cf61a8725d6f5b558feec1a333f2a930ee00e5a5
app_repository: https://github.com/morgiyt/exim-super-app.git
app_branch: task/TASK-2026-014-modules-plans-entitlements
runtime_commit: 2bbacac6b5db313dcc25d11d9be358a4fb6df561
report_commit: 654e813ed837efe015feacfa8d302d8b6e85d4f9
pull_request: https://github.com/morgiyt/exim-super-app/pull/11
preview_url: https://superapp.185-129-49-242.sslip.io/exchange/plan
status: submitted
---

# Отчёт о сдаче TASK-2026-014 — попытка 01

Это заявление исполнителя, а не независимая проверка и не приёмка владельца. Managed preview работает на exact runtime commit `2bbacac6b5db313dcc25d11d9be358a4fb6df561`; report-only commits приложение и базу не меняют.

## Фактический результат

- Добавлены immutable demo plan versions, workspace subscriptions и append-only lifecycle events без billing provider, карт, invoice, charge, refund или webhook.
- Effective Exchange entitlements, limits и usage вычисляются и проверяются сервером в active workspace context. Тариф не выдаёт membership, role или organization capability.
- Только `platform_admin` управляет demo subscription; moderator и tenant actors получают отказ.
- `Exchange Free — Демо` ограничен одним опубликованным cargo и одним transport; `Exchange Plus — Демо` — десятью cargo и десятью transport.
- Downgrade/end сохраняют объявления и историю, запрещают рост usage и разрешают cleanup-действия pause/close/read.
- Реализованы `/exchange/plan` и `/platform/entitlements` с demo-disclaimer, usage, периодом, безопасной историей, Retry и mobile layout.
- Managed preview обновлён только для EXIM Super App. EXIM Hub и EximDaily остались отдельными сервисами.

## Изменения

- `db/migrations/0014_modules_plans_entitlements.sql` — plan versions, subscriptions, events, entitlement linkage и demo seeds.
- `lib/exchange/**`, `app/api/exchange/plan/**`, `app/api/platform/entitlements/**` — authorization, lifecycle, usage, limits и безопасные projections.
- `components/exchange/ExchangePlanApp.tsx`, `components/platform/PlatformEntitlementsApp.tsx` — ORG-003 и PA-002.
- `scripts/server/module-entitlements-smoke.ps1` и test suite — limits, authority, retention, billing absence и responsive states.

## Миграции и данные

- Migration `0014_modules_plans_entitlements.sql` применена на managed preview; ledger содержит `0001…0014`.
- Повторный запуск сообщил `Already applied`; plan versions не дублировались.
- Миграция additive/forward-only. Destructive schema rollback без owner decision и restore запрещён.
- Пять существующих synthetic workspaces получили детерминированный demo baseline; реальные данные отсутствуют.
- Backup `exim-superapp-20260922T064426Z.dump` прошёл checksum и isolated restore в PostgreSQL с `--network none` и без host ports.

## Проверки

| Проверка | Результат |
|---|---|
| `npm test` | PASS, 101/101 |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS, 0 warnings/errors |
| `npm run build` | PASS, 24 pages |
| Migration apply/reapply | PASS |
| Multi-role module/plan smoke | PASS |
| Manager и tenant-admin browser QA | PASS |
| 390 px no-overflow и console clean | PASS |
| Backup checksum + isolated restore | PASS |
| Exact preview/image/health | PASS |
| GitHub checks для application PR #11 | PASS, 3/3 |

## Acceptance matrix исполнителя

| AC ID | Результат | Evidence |
|---|---|---|
| AC-014-01 | PASS_BY_IMPLEMENTER | EVID-014-01, 02, 05 |
| AC-014-02 | PASS_BY_IMPLEMENTER | EVID-014-01, 02 |
| AC-014-03 | PASS_BY_IMPLEMENTER | EVID-014-01, 03 |
| AC-014-04 | PASS_BY_IMPLEMENTER | EVID-014-01, 03, 07 |
| AC-014-05 | PASS_BY_IMPLEMENTER | EVID-014-01, 03 |
| AC-014-06 | PASS_BY_IMPLEMENTER | EVID-014-01, 03 |
| AC-014-07 | PASS_BY_IMPLEMENTER | EVID-014-03 |
| AC-014-08 | PASS_BY_IMPLEMENTER | EVID-014-01, 03 |
| AC-014-09 | PASS_BY_IMPLEMENTER | EVID-014-01, 03, 04 |
| AC-014-10 | PASS_BY_IMPLEMENTER | EVID-014-01, 03 |
| AC-014-11 | PASS_BY_IMPLEMENTER | EVID-014-01, 04, 08 |
| AC-014-12 | PASS_BY_IMPLEMENTER | EVID-014-01, 03, 05 |
| AC-014-13 | PASS_BY_IMPLEMENTER | EVID-014-01, 04 |
| AC-014-14 | PASS_BY_IMPLEMENTER | EVID-014-01…09, addendum-01 |

## Остаточные риски

- Independent review и human acceptance не выполнены; PR #11 не слит.
- PR #11 stacked поверх PR #10 и должен проверяться вместе с dependency chain.
- Live browser-проход повторно проверил 390 px; 360/375 px покрыты regression suite, но не повторялись live в этой попытке.
- Demo plans/prices/limits не являются production business decision и не закрывают OQ-035/OQ-037/OQ-043.
- Backup остаётся на том же managed host; off-machine copy в этой волне не выполнялся.

## Rollback

1. Вернуть managed preview на previous known-good runtime `470a2a131cd5f6e824653f55d7b100bee2776edb`.
2. Пересоздать только Super App web и проверить live/ready endpoints.
3. Не удалять additive migration `0014`: предыдущий runtime её не использует.
4. Data rollback выполнять только после owner decision и успешного isolated restore exact backup.

## Декларация

Submission не означает independent review, human acceptance, merge или разрешение production deploy. Production, реальные данные, реальные цены, Product OS requirements, public repository, Hub и Daily не изменялись.
