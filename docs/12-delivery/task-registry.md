# Реестр delivery-задач

| TASK ID | Название | Релиз | Revision | Статус | Исполнитель | Reviewer | Acceptance authority | Task | Последняя сдача | Следующее действие |
|---|---|---|---:|---|---|---|---|---|---|---|
| TASK-2026-001 | Foundation Gate — безопасный Private OS core | Release 0 | 1 | superseded | Интегратор + Claude Code | Codex / независимый reviewer | Владелец продукта или delegate | [Открыть](./tasks/TASK-2026-001-foundation-gate) | Реализованный foundation сохранён в application TASK-2026-002 | Остаток scope распределён по full-product roadmap |
| TASK-2026-003 | Release foundation и явный access context | Full Product / Wave 1 | 1 | submitted | Codex | Independent reviewer / human | Владелец продукта или delegate | [Открыть](./tasks/TASK-2026-003-release-foundation-identity) | Private repo, exact runtime `afc85f6`; старый public PR закрыт | Independent review; не является accepted |
| TASK-2026-004 | Стабильная рабочая оболочка и единый read model | Full Product / Wave 2 | 2 | submitted | Codex | Independent reviewer / human | Владелец продукта или delegate | [Открыть](./tasks/TASK-2026-004-stable-shell-read-model) | Private PR #1; runtime `164f66b`; report/guard head `f2604b7`; 3 checks PASS | Independent review; не является accepted |
| TASK-2026-005 | Канонический QuoteRequest → RateQuote → CommercialOffer | Full Product / Wave 3 | 1 | submitted | Codex | Independent reviewer / human | Владелец продукта или delegate | [Открыть](./tasks/TASK-2026-005-quote-to-offer-workflow) | Private PR #2; runtime `7af9476`; submission `SUB-TASK-2026-005-01` | Independent review; dependency of TASK-2026-006 |
| TASK-2026-006 | AgreementBasis → Shipment → Trip → tracking и документы | Full Product / Wave 4 | 1 | submitted | Codex | Independent reviewer / human | Владелец продукта или delegate | [Открыть](./tasks/TASK-2026-006-shipment-execution) | Private PR #3; runtime `88e1cdb`; 36/36 checks and evidence | Independent review; dependency of TASK-2026-007 |
| TASK-2026-007 | Канонические CRM, лиды и клиентские компании | Full Product / Wave 5 | 1 | in_progress | Codex | Independent reviewer / human | Владелец продукта или delegate | [Открыть](./tasks/TASK-2026-007-crm-clients) | Stacked base TASK-2026-006 @ `83164cf` | CRM domain API, assignment/transfer, contacts, interactions and conversion |

## Правила реестра

- Здесь нет подробного scope: он живёт только в task-файле.
- Исполнитель не ставит `accepted`. Новую current/ready задачу создаёт task curator только после явной owner authorization; утверждённый full-product roadmap является такой авторизацией для независимых stacked-волн.
- Изменение утверждённого scope требует новой revision и записи в task history.
- Терминальные состояния: `accepted`, `cancelled`, `superseded`.
