# Платформенные и Exchange-страницы

Статус: рабочий draft для Launch MVP. Контракт объявлений Wave 9 уточнён в [спецификации listings](./exchange-listings), search/response Wave 10 — в [спецификации поиска и откликов](./exchange-search-responses), а безопасный moderation preview Wave 11 — в [Trust & Safety contract](./exchange-trust-safety). Contacts, KYC/verification, legal/dispute и финальные trust rules зависят от OQ-034…OQ-045.

## Общие требования ко всем страницам

- серверная проверка membership, scope, role/capability и entitlement;
- стабильная прямая ссылка и корректные Back/Forward/Reload;
- loading, empty, error и forbidden states;
- мобильная ширина 360, 375 и 390 px без горизонтального overflow всей страницы;
- аудит критических действий;
- отсутствие staff-only и чужих tenant-данных в payload.

## ORG-001 — Организация и capabilities

**Цель:** показать организацию, реквизиты и совмещаемые возможности Exchange; verification отображается только при утверждённом REQ-010.

Блоки: основная информация, memberships, capabilities, подключённые модули, план и лимиты. Статус проверки добавляется только если утверждён REQ-010. Изменение критических данных и capabilities фиксируется в аудите.

Открытые вопросы: OQ-034, OQ-035, OQ-039.

## AU-002 — Регистрация и организация

Создаёт account и связывает его с разрешённой организацией. Self-service, invite-only или ручное создание остаются OQ-034. До решения нельзя автоматически выдавать tenant, paid plan или platform-level role.

## PL-001 — Главная и выбор модуля

Показывает только модули, разрешённые membership и entitlement: Private OS, биржу грузов/транспорта и административные функции. Недоступный модуль не появляется в payload как способ обойти серверный запрет.

## ORG-002 — Участники, роли и приглашения

**Цель:** управлять членством без выдачи прав другой организации.

Действия: пригласить, назначить несколько ролей, приостановить, удалить membership, посмотреть историю. Platform admin не должен автоматически подменяться tenant admin.

## ORG-003 — Модули и план

Показывает активные modules, effective entitlements, лимиты/usage и период действия. Тарифы, цены и способ активации paid access — OQ-037. Окончание доступа не удаляет историю организации.

## EX-001 — Главная Exchange

Блоки: поиск грузов, поиск транспорта, мои объявления, входящие отклики, доступный план/лимит, профиль организации и предупреждение о роли платформы.

## EX-002 / EX-005 — Поиск

Wave 10 использует allowlisted направление, даты, modes, параметры груза/транспорта, cursor pagination, personal saved searches и deterministic task-level order. Финальный ranking остаётся OQ-045. Результаты соблюдают visibility; moderation rules не применяются до отдельного решения.

## EX-003 / EX-006 — Карточки объявления

Показывают только публичные поля владельца. Контакты до разрешённого события скрыты. В Wave 9 чужому участнику доступен только `published`; `draft`, `paused`, `expired` и `closed` остаются owner-only. Отклик, `matched`, moderation/rejection/blocking относятся к следующим требованиям и отключены.

## EX-004 / EX-007 — Создание объявления

Форма поддерживает основные виды транспорта, сохраняет черновик, проверяет обязательные поля и показывает предпросмотр публичных данных. Приватные поля Private OS не подставляются молча.

## EX-008 — Мои объявления

Список собственных `draft`, `published`, `paused`, `closed` и `expired` объявлений. Владелец может менять только разрешённые поля и закрывать с причиной. `matched` появляется только после реализации REQ-008.

## EX-009 — Отклики и предложения

Владелец видит отклики к своему объявлению; автор отклика — только свой ответ и разрешённое состояние. Wave 10 разрешает только короткий non-commercial note без контактов, shortlist/reject/select и withdraw. Точные финансовые поля и торги — OQ-040.

## EX-010 — Выбор исполнителя и контакты

Wave 10 выбор создаёт только `ExecutorSelection`, переводит listing в `matched` и закрывает новые отклики. `ContactAccessEvent` не создаётся, контакты остаются закрытыми до OQ-043. Выбор не создаёт договор с платформой и не гарантирует исполнение.

## EX-011 — Профиль организации

Обязательный draft Launch baseline из REQ-007: display name, разрешённые capabilities и собственные active listings; остальные поля только из public allowlist. Verification/KYC status, рейтинги и отзывы не входят в базовый профиль и зависят от OQ-039/REQ-010.

## PA-001 — Организации платформы

Рабочий draft: список организаций, memberships, modules и access status без просмотра tenant-private данных по умолчанию. Кто создаёт организации и точный platform-admin scope — OQ-034.

## PA-002 — Modules и entitlements

Рабочий draft: выдать/отозвать module entitlement, лимит и период действия с обязательным audit. Для Launch должен существовать утверждённый способ активации paid access: manual external-payment flow либо billing provider — OQ-037.

## PA-003 — Модерация и жалобы

Wave 11 task-level preview принимает жалобу, связывает её с public объектом/организацией, позволяет уполномоченному moderator ограничить объявление и сохраняет versioned decision/audit. Подробный контракт — [Exchange Trust & Safety](./exchange-trust-safety). KYC/verified badge, final reasons, SLA, appeals, legal/dispute и fraud rules остаются OQ-039…OQ-041.

## PA-004 — Платформенный аудит

Рабочий draft: platform-level auth, membership, role, entitlement и moderation events. Просмотр tenant-private payload не выдаётся автоматически. Retention, экспорт и круг platform-auditor roles — OQ-034/OQ-041.
