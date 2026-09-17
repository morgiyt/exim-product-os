# Текущая задача

> Канонический scope находится в task-файле. Production и реальные данные запрещены.

| Поле | Значение |
|---|---|
| Current task | `TASK-2026-003` |
| Название | Release foundation и явный access context |
| Revision | `1` |
| Статус | `in_progress` |
| Owner authorization | Full-product roadmap утверждён 2026-09-17, D-086…D-089 |
| Task | [TASK-2026-003](./tasks/TASK-2026-003-release-foundation-identity) |
| Product OS ref | `product-os-task-2026-003-r1` |
| Application repository | `https://github.com/alanbykov11work-ux/exim.git` |
| Application stacked base | `task/TASK-2026-002-self-hosted-postgres` @ `b3dd29751fbb9a6334f255e58576764dd44a29cd` |
| Implementation branch | `task/TASK-2026-003-release-foundation-identity` |
| Target | managed preview; synthetic data only |
| Production switch | `FORBIDDEN` |
| Исполнитель | Codex |
| Reviewer | independent reviewer / assigned human |
| Acceptance authority | владелец продукта или явно назначенный им человек |
| Следующее действие | migration + explicit session membership context + authorization matrix |

## Почему разрешена stacked-разработка

TASK-2026-002 остаётся submitted и не объявляется accepted. Владелец отдельно утвердил следующий full-product roadmap и поручил начать. Поэтому новая работа изолируется новой веткой от exact head предыдущей сдачи. Она не загрязняет PR #6 и не может быть слита в `main` до разрешения зависимости.

## История

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-17 | TASK-2026-001 ready | TASK-2026-001 superseded; TASK-2026-003 in_progress | Product owner authorization + task curator | Реальный application repo и self-hosted baseline уже установлены; утверждён roadmap до полного продукта |
