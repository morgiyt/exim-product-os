# Текущая задача

> Канонический scope находится в task-файле. Production и реальные данные запрещены.

| Поле | Значение |
|---|---|
| Current task | `TASK-2026-004` |
| Название | Стабильная рабочая оболочка и единый read model |
| Revision | `2` |
| Статус | `in_progress` |
| Owner authorization | Full-product roadmap утверждён 2026-09-17, D-086…D-089 |
| Task | [TASK-2026-004](./tasks/TASK-2026-004-stable-shell-read-model) |
| Product OS ref | `product-os-task-2026-004-r2` |
| Application repository | `https://github.com/morgiyt/exim-super-app.git` — private |
| Application stacked base | `main` @ `ef411cf` |
| Implementation branch | `task/TASK-2026-004-stable-shell-read-model` |
| Target | managed preview; synthetic data only |
| Production switch | `FORBIDDEN` |
| Исполнитель | Codex |
| Reviewer | independent reviewer / assigned human |
| Acceptance authority | владелец продукта или явно назначенный им человек |
| Следующее действие | server dashboard/read model + stable navigation + browser acceptance |

## Почему разрешено непрерывное продолжение

Предыдущие задачи остаются отдельными сдачами и не объявляются accepted автоматически. Владелец утвердил full-product roadmap и поручил непрерывно продолжать работу. Каждая волна изолируется отдельной веткой приватного репозитория, получает собственные evidence и не считается принятой без отдельного решения.

## История

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-17 | TASK-2026-001 ready | TASK-2026-001 superseded; TASK-2026-003 in_progress | Product owner authorization + task curator | Реальный application repo и self-hosted baseline уже установлены; утверждён roadmap до полного продукта |
| 2026-09-17 | TASK-2026-003 in_progress | TASK-2026-003 submitted; TASK-2026-004 in_progress | Task curator | PR #7 и evidence отделены; продолжается следующая утверждённая roadmap-волна без заявления acceptance |
| 2026-09-17 | TASK-2026-004 revision 1 | TASK-2026-004 revision 2 | Product owner + task curator | Канонический application repository перенесён в приватный `morgiyt/exim-super-app`; публичная интеграторская ветка больше не используется |
