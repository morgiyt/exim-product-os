# REQ-010 — Жалобы, модерация и безопасный platform control

## Статус и цель

**Статус:** task-ready preview baseline для Full Product / Wave 11; KYC, verified badge, final policy/legal/dispute/fraud rules остаются conditional draft после OQ-039…OQ-041.<br>
**Цель:** добавить минимальный контролируемый контур реакции на злоупотребления поверх REQ-007/008 без ложной проверки организации, без доступа модератора к Private OS и без превращения платформы в сторону сделки.

## Wave 11 scope

- отдельные platform roles `moderator` и `platform_admin`, не наследуемые из tenant membership;
- жалоба active Exchange participant на чужое published объявление или public organization profile;
- allowlisted preview reason codes, безопасное пояснение, idempotency и reporter ownership;
- moderation case, versioned lifecycle и append-only решения;
- временное restrict/unrestrict объявления;
- suspend/restore Exchange-доступа организации только platform admin;
- safe outcome владельцу/reporter и platform audit;
- platform queue/organization/audit UI без tenant-private payload.

## Правила

- базовый профиль REQ-007 не равен KYC/verification и не получает verified badge;
- точный KYC-процесс, документы и provider не утверждены и не реализуются;
- tenant admin не становится moderator/platform admin и не выдаёт platform roles;
- moderator получает только public Exchange projection, report/case metadata и разрешённый audit;
- Private OS, contacts, finance, documents и memberships запрещены в moderation read model;
- listing restriction хранится отдельно от business lifecycle и имеет приоритет в search/detail/mutations;
- organization suspension ограничена Exchange: Private OS и tenant membership не отключаются;
- решение не удаляет историю, target или report; отмена — новое append-only action;
- reporter/owner не видят internal note и личность moderation actor;
- рейтинг, отзывы, trust score, automatic fraud scoring и legal/dispute copy не входят;
- reason codes — task-local configurable preview vocabulary, а не юридическая квалификация.

## Критерии приёмки Wave 11

- жалоба создаётся только на чужой public target, изолирована по reporter и не содержит private/contact/commercial payload;
- moderator/platform admin отделены от tenant roles; ordinary и tenant-admin direct request safe-denied;
- moderation queue и case не раскрывают Private OS и foreign reports;
- restricted listing исчезает из search/public detail и не обходится owner direct command;
- unrestrict/restore создаёт новое versioned action и не стирает предыдущее решение;
- organization Exchange suspension скрывает listings и блокирует Exchange mutations, но Private OS продолжает работать;
- moderator не может suspend organization или назначать platform roles;
- platform action имеет автора, before/after, дату, reason и correlation/idempotency key;
- fake KYC/verified/rating signal отсутствует в API/UI/source;
- stable routes, browser/mobile/failure states, regression, migration/reapply и restore подтверждены.

## Не утверждено этой revision

- KYC/AML, проверка документов и внешний verification provider;
- final reason taxonomy, policy, SLA, appeals, disputes и юридическая ответственность;
- ratings/reviews, trust score, fraud automation и final risk model;
- contact release, commercial deal, contracts/payments и platform guarantee.

Подробный page contract: [Exchange Trust & Safety и Platform Admin](../04-pages/exchange-trust-safety). Точный implementation scope: [TASK-2026-013](../12-delivery/tasks/TASK-2026-013-exchange-trust-safety).

## Открытые вопросы

- OQ-039 — окончательный KYC, moderation и fraud scope;
- OQ-040 — финальный Exchange lifecycle;
- OQ-041 — ответственность, претензии и споры.
