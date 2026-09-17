# Текущая задача

> Канонический scope находится в task-файле. Production и реальные данные запрещены.

| Поле | Значение |
|---|---|
| Current task | `TASK-2026-013` |
| Название | EXIM Exchange — trust, complaints, moderation and platform administration |
| Revision | `1` |
| Статус | `in_progress` |
| Owner authorization | Full-product roadmap утверждён 2026-09-17, D-086…D-089 |
| Task | [TASK-2026-013](./tasks/TASK-2026-013-exchange-trust-safety) |
| Product OS ref | `product-os-task-2026-013-r1` |
| Application repository | `https://github.com/morgiyt/exim-super-app.git` — private |
| Application stacked base | `task/TASK-2026-012-exchange-search-responses` @ `4689ac079f8762ab0e6936012424a2bebcf3dbe1` |
| Implementation branch | `task/TASK-2026-013-exchange-trust-safety` |
| Target | managed preview; synthetic data only |
| Production switch | `FORBIDDEN` |
| Исполнитель | Codex |
| Reviewer | independent reviewer / assigned human |
| Acceptance authority | владелец продукта или явно назначенный им человек |
| Следующее действие | REQ-010 complaints/moderation/platform control без KYC, verified badge, legal policy, ratings или fraud scoring |

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
| 2026-09-17 | TASK-2026-007 in_progress | TASK-2026-007 submitted; TASK-2026-008 in_progress | Codex implementation agent + task curator | Private PR #4 и exact CRM evidence сохранены; tasks/chats/notifications wave открыта stacked по утверждённому roadmap без заявления acceptance |
| 2026-09-17 | TASK-2026-008 in_progress | TASK-2026-008 submitted; TASK-2026-009 in_progress | Codex implementation agent + task curator | Private PR #5 и exact communication evidence сохранены; finance/closing/analytics wave открыта stacked по утверждённому roadmap без заявления acceptance |
| 2026-09-18 | TASK-2026-009 in_progress | TASK-2026-009 submitted; TASK-2026-010 in_progress | Codex implementation agent + task curator | Private PR #6 и exact finance evidence сохранены; editor wave открыта с task-level preview defaults без закрытия OQ и без заявления acceptance |
| 2026-09-18 | TASK-2026-010 in_progress | TASK-2026-010 submitted; TASK-2026-011 in_progress | Codex implementation agent + task curator | Private PR #7 и exact workflow-studio evidence сохранены; Exchange listings wave открыта с отдельными public objects и без закрытия OQ |
| 2026-09-18 | TASK-2026-011 in_progress | TASK-2026-011 submitted; TASK-2026-012 in_progress | Codex implementation agent + task curator | Private PR #8 и exact Exchange listing evidence сохранены; search/response wave открыта без contacts, commercial bidding и moderation |
| 2026-09-18 | TASK-2026-012 in_progress | TASK-2026-012 submitted; TASK-2026-013 in_progress | Codex implementation agent + task curator | Private PR #9, exact runtime `10fa061` и report `4689ac0` сохранены; trust/safety wave открыта без KYC/verified/legal/fraud предположений |
