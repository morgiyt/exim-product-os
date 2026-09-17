# Exchange Trust & Safety и Platform Admin

**Статус:** Wave 11 contract ready для TASK-2026-013. Это безопасный preview-контур жалоб и модерации; KYC, verified badge, юридическая политика, апелляции, ratings и fraud scoring не утверждены.

## Общая граница

- Product module: Platform + EXIM Exchange.
- `moderator` и `platform_admin` — platform roles, не tenant roles.
- Tenant admin не получает platform access и не может назначить эти роли.
- Moderator читает только public Exchange projection, текст жалобы и moderation metadata.
- Private OS, contacts, finance, documents и tenant memberships не входят в moderation payload.
- Ограничение Exchange не удаляет данные и не отключает Private OS.

## EX-012 — Пожаловаться

**Цель:** позволить участнику сообщить о проблеме в чужом опубликованном объявлении или public organization profile.

**Доступ:** active Exchange participant; только чужой public target.

**Поля:** target type/ID, allowlisted reason code, необязательное краткое пояснение. UI явно говорит, что reason codes являются preview-категориями, а не юридической квалификацией.

**Действия:** отправить; посмотреть статус своих жалоб. Повтор с тем же idempotency key не создаёт дубль.

**Состояния:** form, validation, submitted, duplicate-safe, target unavailable, forbidden, error + Retry.

**Запреты:** self-report, private/paused/closed target, contacts, attachments, PII, произвольный target type, просмотр чужой жалобы или личности moderator.

## PA-003 — Очередь модерации и case

**Цель:** обработать reports без доступа к tenant-private данным.

**Доступ:** moderator и platform admin. Platform admin не получает tenant membership автоматически.

**Очередь:** status, reason, target type, public target summary, report count, created/updated time. Pagination и allowlisted filters обязательны.

**Case:** public target snapshot, связанные reports, version, action history, internal moderation note и безопасный owner outcome. Internal note не возвращается reporter/owner.

**Lifecycle:** `open → in_review → actioned|dismissed → closed`. Повтор terminal command идемпотентен; correction — новое append-only action.

**Moderator actions:** take/release case, restrict/unrestrict listing, resolve/dismiss report/case. Для каждого действия обязательны reason code, version и idempotency key.

**Запреты:** organization suspension, role assignment, hard delete, изменение business fields/listing owner, Private OS lookup, verification badge.

## PA-001 — Exchange-контроль организаций

**Цель:** дать platform admin минимальный контроль публичного участия организации, не превращая его в tenant admin.

**Доступ:** только platform admin.

**Данные:** public organization summary, capabilities, Exchange suspension state/reason, counts public/restricted listings, open cases, audit history. Membership/users/Private OS не показываются.

**Действия:** suspend Exchange access; restore Exchange access; посмотреть историю. Причина обязательна.

**Эффект suspension:** public listings скрыты; listing create/edit/publish/resume, saved search mutation, response/selection и другие Exchange mutations server-rejected. Собственная история сохраняется; Private OS login и tenant data не затрагиваются.

## PA-004 — Platform audit

**Цель:** проследить каждое platform-level действие.

**Доступ:** platform admin; moderator видит только audit своих доступных cases.

**Поля:** time, actor platform role, action, target type/ID, before/after safe state, reason code, correlation/idempotency key. Секреты, credentials, cookies и raw PII запрещены.

**Действия:** allowlisted filters, pagination, detail. Изменение или удаление audit отсутствует.

## Listing restriction

- хранится отдельно от business lifecycle `draft/published/paused/closed/expired/matched`;
- restricted listing отсутствует в search/public detail и не принимает response/selection;
- owner видит business status, moderation label и разрешённый outcome, но не internal note/actor identity;
- unrestrict создаёт новое действие и возвращает видимость только если business status сам допускает публикацию;
- owner command не может снять moderation restriction.

## Общие состояния и маршруты

- `/exchange/reports` — мои жалобы;
- report action на public listing/profile;
- `/platform/moderation` и `/platform/moderation/:caseId`;
- `/platform/organizations` и `/platform/organizations/:organizationId`;
- `/platform/audit`.

Для каждой страницы: loading, empty, error + Retry, forbidden и not-found различаются; Reload/Back/Forward, клавиатура и 360/375/390 px не ломают действие.

## Критерии приёмки

- ordinary/tenant-admin account не открывает platform routes и API;
- report создаётся только на чужой public target и изолирован от третьей организации;
- moderator restriction немедленно действует на search/detail/direct mutations;
- platform admin suspension действует только на Exchange и не ломает Private OS;
- owner/reporter projections не раскрывают internal note, moderator identity и private data;
- fake KYC/verified/rating signal отсутствует;
- все решения versioned, idempotent и append-only audited;
- browser/mobile/failure states и server authorization доказаны на Preview.

## Открытые вопросы

- OQ-039 — окончательный KYC/moderation/fraud scope;
- OQ-040 — финальные Exchange lifecycle и повторная публикация;
- OQ-041 — юридические тексты, ответственность, претензии и споры.
