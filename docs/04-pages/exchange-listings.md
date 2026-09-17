# EXIM Exchange — объявления грузов и транспорта

**Статус:** Wave 9 contract implemented/submitted в TASK-2026-011. Search/response/selection продолжены в [Wave 10 contract](./exchange-search-responses); контакты, финальные коммерческие, moderation и mode-specific правила остаются открытыми вопросами.

## Общие правила Wave 9

- Exchange — отдельный bounded context и публичный слой данных; Private OS не читается и не публикуется автоматически.
- Любая публикация создаётся как самостоятельный `CargoListing` или `TransportListing` и проходит server-side allowlist.
- Только активная membership, enabled module entitlement и нужная organization capability дают право создать/изменить объявление.
- В preview Wave 9 менять объявления может только `tenant_admin` организации-владельца. Это безопасный task-level default, а не финальная role governance.
- Любой активный участник Exchange с entitlement может читать только `published` объявления и минимальный публичный профиль владельца.
- В Wave 9 контакты, verification badge, rating, responses, moderation, billing и связь с Private OS отсутствуют. Wave 10 добавляет отдельные responses/selection без контактов; остальные ограничения сохраняются.
- Стабильные URL, Reload, Back/Forward, loading/empty/error/forbidden/not-found/conflict и Retry обязательны.
- Интерфейс должен работать с клавиатуры и без page-level overflow на 360/375/390 px.

## EX-001 — Главная Exchange

**Цель:** дать безопасную точку входа в отдельный модуль.

**Доступ:** активная membership + enabled `exchange` entitlement.

**Блоки:** переключатель «Грузы / Транспорт», последние опубликованные объявления, собственные счётчики, capability/entitlement state, предупреждение «Платформа не является стороной сделки» и видимая маркировка demo-limit preview.

**Действия:** открыть карточку, перейти в «Мои объявления», создать разрешённый тип. Search, filters, saved search и responses определены отдельным Wave 10 contract; финальный ranking остаётся OQ-045.

## EX-003 / EX-006 — Публичная карточка объявления

**Цель:** показать ровно публичный allowlist опубликованного объявления.

**Публичные данные:** тип, route/geography, даты, mode, cargo/equipment parameters, conditions/public comment, публикация/истечение и минимальный organization profile.

**Никогда не выдаются:** workspace/member/creator IDs, email, телефон, реквизиты, staff comments, private request/shipment IDs, себестоимость, маржа, договоры и документы.

**Состояния:** `published` открывается участнику Exchange; `draft`, `paused`, `closed` и `expired` доступны только владельцу в «Мои объявления»; чужой direct ID возвращает safe not-found без утечки данных.

## EX-004 — Создание груза

**Доступ:** `tenant_admin` preview actor + `cargo_publisher` capability + enabled entitlement.

**Форма:** независимый черновик, common route/date/cargo fields, один или несколько transport modes, mode-specific structured details, public comment, publication expiry и preview публичного payload.

**Действия:** создать draft, сохранить, проверить, опубликовать. Idempotency key и optimistic version обязательны. Невалидный draft сохраняется, но не публикуется.

## EX-007 — Создание транспорта

**Доступ:** `tenant_admin` preview actor + `transport_publisher` capability + enabled entitlement.

**Форма:** независимый черновик, capacity/equipment, availability, route/geography, modes, mode-specific structured details, restrictions, public comment, expiry и preview.

**Действия и ошибки:** как EX-004. Organization с обеими capabilities может создавать оба типа без смены «типа компании».

## EX-008 — Мои объявления

**Цель:** управлять всеми объявлениями своей organization.

**Блоки:** тип, title/route, status, updated/version, expiry, public preview и audit summary.

**Lifecycle Wave 9:** `draft → published ↔ paused → closed`; `published | paused → expired` по `expires_at`. Повтор одинаковой команды идемпотентен. Wave 10 разрешает только task-level `published → matched` через unique selection; `pending_moderation`, listing-level `rejected` и `blocked` остаются отключены.

**Действия:** редактировать с optimistic version, публиковать, приостанавливать, возобновлять и закрывать с причиной. Чужая organization не может читать owner draft или выполнять mutation ни через UI, ни прямым API.

## EX-011 — Минимальный профиль организации

**Цель:** дать контекст владельца без ложного trust-сигнала.

**Публичный allowlist Wave 9:** display name, разрешённые Exchange capabilities и количество собственных `published` объявлений по типам.

**Не показывать:** verified/KYC badge, rating/reviews, контакты, BIN, private memberships/workspaces, план/лимиты и tenant-private activity.

## Mode field groups — task-level preview baseline

Это технический baseline для проверки сохранения данных всех утверждённых верхнеуровневых modes; он не закрывает OQ-042 и не объявляет поля универсальной отраслевой моделью.

| Mode | CargoListing | TransportListing |
|---|---|---|
| `road` | body/loading preferences, temperature/hazard flags | vehicle/body type, plate-free public equipment summary, capacity |
| `rail` | origin/destination station text, wagon/container preference | wagon/container type, units and capacity |
| `sea` | origin/destination port text, container/general cargo parameters | vessel/service/equipment public summary and capacity |
| `air` | origin/destination airport text, dangerous/special handling flags | aircraft/service public summary and capacity |
| `multimodal` | ordered public segments with mode and locations | supported ordered modes/regions and aggregate capacity |

Server принимает только schema-validated keys каждого mode. Произвольный JSON, контакты и private identifiers отклоняются.

## Критерии страниц

- одна synthetic organization с обеими capabilities создаёт cargo и transport drafts и публикует оба;
- вторая organization видит только published payload и профиль allowlist;
- owner управляет своим lifecycle, foreign actor получает safe denial;
- данные каждого mode проходят create/read/update без потери и без произвольных keys;
- disabled entitlement, отсутствующая capability, forbidden, validation, conflict и demo limit reached различаются;
- Wave 9 submission не содержит private objects, contacts, verification/moderation, responses или billing; Wave 10 response surfaces обязаны сохранять тот же public boundary.
