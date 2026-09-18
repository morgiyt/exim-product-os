# Модули, планы и entitlements

**Статус:** Wave 12 contract ready для TASK-2026-014. Все названия, лимиты и display price в этой волне синтетические, помечены `Демо` и не являются коммерческим предложением.

## ORG-003 — Модули и план организации

**Цель:** показать organization/tenant admin фактически действующий доступ, период, лимиты, usage и историю без возможности самоназначения paid plan.

**Модуль:** Platform + EXIM Exchange.

**Роли/capabilities:** активный `tenant_admin` текущего workspace; чтение требует Exchange entitlement history своего workspace. Другие tenant-роли получают safe forbidden или скрытый navigation item.

**Область данных:** только активный session workspace и связанная organization. Никаких сведений о чужих subscriptions, platform actors, billing или Private OS данных.

### Блоки и данные

- заметная полоса `Демо / не является коммерческим предложением`;
- effective module и состояние доступа;
- plan display name, immutable version, starts/ends и source `manual_demo`;
- limits и current usage по cargo/transport published listings;
- объяснение поведения при limit, downgrade и expiry;
- безопасная история activation/replacement/expiry/cancellation без internal platform note/actor ID;
- сообщение `Автоматического списания нет`.

### Действия

- `Обновить` — перечитывает server projection;
- `Перейти к объявлениям` — открывает Exchange listings;
- отсутствуют `Купить`, `Оплатить`, `Ввести карту`, self-upgrade или изменение plan.

### Состояния и ошибки

- loading skeleton;
- active free demo, active plus demo, scheduled replacement, expired/disabled;
- empty — subscription ещё не назначена;
- error с рабочим `Повторить`;
- forbidden и not-found отличаются и не раскрывают чужие данные;
- Reload/Back/Forward сохраняют маршрут `/exchange/plan`;
- 360/375/390 px без page-level overflow, всё доступно с клавиатуры.

### Ограничения

- UI не является офертой и не обещает реальную цену/лимит;
- plan не даёт роль/capability и не обходит server RBAC;
- expiry/downgrade не удаляет историю и существующие объявления;
- контакты, платежные реквизиты, invoices/charges/refunds отсутствуют.

## PA-002 — Modules, plans и subscriptions

**Цель:** дать platform admin безопасный ручной preview-контур назначения synthetic plan без платежей и без доступа к tenant-private данным.

**Модуль:** Platform Admin.

**Роли/capabilities:** только `platform_admin`. `moderator`, `tenant_admin` и остальные роли не имеют route/API access.

**Область данных:** public organization/workspace identifiers, текущий module plan, effective period, limits/usage и subscription/audit metadata. Private OS, контакты, финансы, документы и memberships не входят в projection.

### Блоки и данные

- список организаций с фильтрами по module/plan/state;
- current demo plan, immutable version, effective period и usage;
- subscription history и append-only change events;
- карточка выбранной организации без private payload;
- явный disclaimer: `Ручная демо-активация; списаний и billing provider нет`.

### Действия

- `Активировать demo plan` — plan version, starts/ends, reason, expected version и idempotency key;
- `Заменить plan` — атомарно завершает прежний grant и активирует новый;
- `Завершить доступ` — запрещает новые Exchange mutations, но не удаляет данные;
- `Повторить` — перечитывает данные после network/server error;
- hard delete, payment capture, invoice, refund и role management отсутствуют.

### Состояния и ошибки

- loading, empty, active, expired, conflict, invalid period, forbidden, not-found, retryable error;
- version conflict предлагает перечитать актуальное состояние, а не перезаписывает его;
- duplicate idempotency key возвращает прежний результат;
- stable route `/platform/entitlements`, Reload/Back/Forward и keyboard flow;
- 360/375/390 px без page-level overflow.

### Ограничения

- platform admin не получает tenant membership;
- moderator не может менять plan;
- изменение plan не меняет organization capabilities и roles;
- реальные prices/provider/tax/trial/refund/legal copy остаются OQ-037/TBD;
- production activation и реальные данные запрещены.

## Критерии приёмки страниц

- обе страницы используют server projection и не вычисляют entitlement только в браузере;
- ORG-003 изолирован по active workspace; PA-002 требует отдельную platform role;
- значения limit/usage совпадают с domain enforcement;
- free/plus/expired/downgraded состояния доказаны synthetic E2E;
- прямые чужие IDs, direct API и route bypass дают safe forbidden/not-found;
- demo маркировка видна на desktop и mobile;
- browser evidence подтверждает Retry, keyboard, Reload/Back/Forward и отсутствие overflow.

## Открытые вопросы

- OQ-035 — multi-tenant organization authority;
- OQ-037 — реальные планы, цены, лимиты, provider и billing lifecycle;
- OQ-043 — возможная зависимость contact release от paid access.
