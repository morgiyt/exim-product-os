# Реестр delivery-задач

| TASK ID | Название | Релиз | Revision | Статус | Исполнитель | Reviewer | Acceptance authority | Task | Последняя сдача | Следующее действие |
|---|---|---|---:|---|---|---|---|---|---|---|
| TASK-2026-001 | Foundation Gate — безопасный Private OS core | Release 0 | 1 | superseded | Интегратор + Claude Code | Codex / независимый reviewer | Владелец продукта или delegate | [Открыть](./tasks/TASK-2026-001-foundation-gate) | Реализованный foundation сохранён в application TASK-2026-002 | Остаток scope распределён по full-product roadmap |
| TASK-2026-003 | Release foundation и явный access context | Full Product / Wave 1 | 1 | in_progress | Codex | Independent reviewer / human | Владелец продукта или delegate | [Открыть](./tasks/TASK-2026-003-release-foundation-identity) | — | Migration, context API, role/tenant matrix, staging evidence |

## Правила реестра

- Здесь нет подробного scope: он живёт только в task-файле.
- Исполнитель не ставит `accepted` и не создаёт следующую задачу.
- Изменение утверждённого scope требует новой revision и записи в task history.
- Терминальные состояния: `accepted`, `cancelled`, `superseded`.
