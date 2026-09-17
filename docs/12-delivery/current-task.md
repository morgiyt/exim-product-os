# Текущая задача

> Канонический scope находится в task-файле. Production и реальные данные запрещены.

| Поле | Значение |
|---|---|
| Current task | `TASK-2026-004` |
| Название | Стабильная рабочая оболочка и единый read model |
| Revision | `1` |
| Статус | `in_progress` |
| Owner authorization | Full-product roadmap утверждён 2026-09-17, D-086…D-089 |
| Task | [TASK-2026-004](./tasks/TASK-2026-004-stable-shell-read-model) |
| Product OS ref | `product-os-task-2026-004-r1` |
| Application repository | `https://github.com/alanbykov11work-ux/exim.git` |
| Application stacked base | `task/TASK-2026-003-release-foundation-identity` @ `ef411cf` |
| Implementation branch | `task/TASK-2026-004-stable-shell-read-model` |
| Target | managed preview; synthetic data only |
| Production switch | `FORBIDDEN` |
| Исполнитель | Codex |
| Reviewer | independent reviewer / assigned human |
| Acceptance authority | владелец продукта или явно назначенный им человек |
| Следующее действие | server dashboard/read model + stable navigation + browser acceptance |

## Почему разрешена stacked-разработка

TASK-2026-002 остаётся submitted и не объявляется accepted. Владелец отдельно утвердил следующий full-product roadmap и поручил начать. Поэтому новая работа изолируется новой веткой от exact head предыдущей сдачи. Она не загрязняет PR #6 и не может быть слита в `main` до разрешения зависимости.

## История

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-17 | TASK-2026-001 ready | TASK-2026-001 superseded; TASK-2026-003 in_progress | Product owner authorization + task curator | Реальный application repo и self-hosted baseline уже установлены; утверждён roadmap до полного продукта |
| 2026-09-17 | TASK-2026-003 in_progress | TASK-2026-003 submitted; TASK-2026-004 in_progress | Task curator | PR #7 и evidence отделены; продолжается следующая утверждённая roadmap-волна без заявления acceptance |
