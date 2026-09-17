# Текущая задача

> Канонический scope находится в task-файле. Production и реальные данные запрещены.

| Поле | Значение |
|---|---|
| Current task | `TASK-2026-007` |
| Название | Канонические CRM, лиды и клиентские компании |
| Revision | `1` |
| Статус | `in_progress` |
| Owner authorization | Full-product roadmap утверждён 2026-09-17, D-086…D-089 |
| Task | [TASK-2026-007](./tasks/TASK-2026-007-crm-clients) |
| Product OS ref | `product-os-task-2026-007-r1` |
| Application repository | `https://github.com/morgiyt/exim-super-app.git` — private |
| Application stacked base | `task/TASK-2026-006-shipment-execution` @ `83164cf690ff004a028dd911921ff0fb4a65707b` |
| Implementation branch | `task/TASK-2026-007-crm-clients` |
| Target | managed preview; synthetic data only |
| Production switch | `FORBIDDEN` |
| Исполнитель | Codex |
| Reviewer | independent reviewer / assigned human |
| Acceptance authority | владелец продукта или явно назначенный им человек |
| Следующее действие | server-authorized CRM, manager assignment/transfer, contacts, interactions и idempotent conversion в draft QuoteRequest |

## Почему разрешено непрерывное продолжение

Предыдущие задачи остаются отдельными сдачами и не объявляются accepted автоматически. Владелец утвердил full-product roadmap и поручил непрерывно продолжать работу. Каждая волна изолируется отдельной веткой приватного репозитория, получает собственные evidence и не считается принятой без отдельного решения.

## История

| Дата | Было | Стало | Actor | Причина |
|---|---|---|---|---|
| 2026-09-17 | TASK-2026-001 ready | TASK-2026-001 superseded; TASK-2026-003 in_progress | Product owner authorization + task curator | Реальный application repo и self-hosted baseline уже установлены; утверждён roadmap до полного продукта |
| 2026-09-17 | TASK-2026-003 in_progress | TASK-2026-003 submitted; TASK-2026-004 in_progress | Task curator | PR #7 и evidence отделены; продолжается следующая утверждённая roadmap-волна без заявления acceptance |
| 2026-09-17 | TASK-2026-004 revision 1 | TASK-2026-004 revision 2 | Product owner + task curator | Канонический application repository перенесён в приватный `morgiyt/exim-super-app`; публичная интеграторская ветка больше не используется |
| 2026-09-17 | TASK-2026-004 in_progress | TASK-2026-004 submitted; TASK-2026-005 in_progress | Codex implementation agent + task curator | Private PR #1 ready to merge with 3 checks PASS; следующий зависимый пакет открыт stacked без заявления acceptance |
| 2026-09-17 | TASK-2026-005 in_progress | TASK-2026-005 submitted; TASK-2026-006 in_progress | Codex implementation agent + task curator | Private PR #2 и evidence сохранены; следующая утверждённая roadmap-волна открыта stacked без заявления acceptance |
| 2026-09-17 | TASK-2026-006 in_progress | TASK-2026-006 submitted; TASK-2026-007 in_progress | Codex implementation agent + task curator | Private PR #3 и exact preview evidence сохранены; каноническая CRM-волна открыта stacked по утверждённому full-product roadmap без заявления acceptance |
