# REQ-007 — Объявления грузов и транспорта

## Статус и цель

**Статус:** task-ready baseline для Full Product / Wave 9; последующие response, moderation, commercial и mode-specific решения остаются draft.<br>
**Цель:** позволить организации независимо размещать груз или свободный транспорт без раскрытия Private OS.

## Объекты

- `CargoListing`;
- `TransportListing`;
- `ExchangeListingEvent` — append-only lifecycle/audit;
- server-generated public projection и минимальный `ExchangeOrganizationProfile`.

## Минимальный профиль участника — draft Launch baseline

Каждое объявление связано со стабильным профилем organization. Минимальный публичный слой содержит display name, разрешённые capabilities и counts собственных `published` listings. Только поля из явного public allowlist попадают в payload. Наличие базового профиля не означает KYC или verification; badge/status проверки, жалобы и moderation появляются только если отдельно утверждён conditional REQ-010.

## Граница данных

- listing является отдельной Exchange-сущностью и не имеет обязательной ссылки на QuoteRequest, Shipment, Trip, CRM или client company;
- automatic/private-to-public conversion запрещён до OQ-038;
- owner workspace/organization, actor и audit существуют во внутреннем слое, но не входят в public payload;
- public payload строится на сервере из явного allowlist и никогда не принимает произвольный сохранённый JSON клиента;
- contacts, BIN, memberships, staff comments, документы, себестоимость, маржа и private identifiers отсутствуют;
- базовый organization profile не означает KYC, verification, rating или endorsement платформой.

## Правила Wave 9

- владелец — organization;
- capabilities груз/транспорт могут совмещаться;
- создание требует enabled `exchange` entitlement, active membership, task-approved actor и нужной capability;
- поддерживаются авто, ЖД, море, авиа и мультимодальные объявления; контейнерные параметры применяются по сценарию;
- черновик, paused, closed и expired не видны другим организациям;
- предпросмотр серверного публичного payload обязателен перед публикацией;
- использование приватного QuoteRequest запрещено в TASK-2026-011;
- себестоимость, маржа, staff-комментарии и закрытые контакты не копируются;
- lifecycle Wave 9: `draft → published ↔ paused → closed`; `published | paused → expired`;
- mutation использует idempotency key, optimistic version и reason там, где статус меняет видимость;
- публикация, пауза, возобновление, закрытие и expiration фиксируются append-only;
- task-local demo limit конфигурируется через entitlement и явно не является коммерческим тарифом.

## Task-level preview defaults

- mutation actor — `tenant_admin` организации-владельца; финальная governance остаётся OQ-034…036;
- `cargo_publisher` и `transport_publisher` — совмещаемые capabilities;
- читать published feed/detail может только authenticated active Exchange participant с entitlement;
- точные mode fields определены только как validated preview baseline в [page contract](../04-pages/exchange-listings), не как закрытие OQ-042;
- поиск/filters/ranking/saved search, responses и contacts относятся к REQ-008/TASK-2026-012;
- moderation statuses, badges и complaints относятся к conditional REQ-010;
- планы, реальные лимиты/цены и billing относятся к REQ-009 и Stage 15.

## Критерии приёмки Launch MVP

- одна организация с двумя capabilities создаёт груз и транспорт;
- другая организация видит только `published` объявления;
- owner редактирует/приостанавливает своё объявление, но не чужое;
- данные каждого поддержанного вида транспорта сохраняются без потери;
- private object остаётся недоступен участникам Exchange;
- публикация и снятие фиксируются в аудите;
- forbidden, validation, conflict и task-local demo limit reached states различаются; moderation states добавляются только если утверждены OQ-039/OQ-040;
- карточка владельца открывает минимальный профиль без выдуманного verified-статуса.

## Открытые вопросы

- OQ-038, OQ-039, OQ-040, OQ-042.
