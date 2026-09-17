# EXIM Exchange — поиск, сохранённые поиски и отклики

**Статус:** Wave 10 contract implemented/submitted в TASK-2026-012. Trust/moderation продолжены в [Wave 11 contract](./exchange-trust-safety); финальные цены/торги, ranking и раскрытие контактов остаются открытыми вопросами.

## Общие правила Wave 10

- Все страницы требуют active membership и enabled `exchange` entitlement.
- Поиск читает только server-generated public projection `published` listing; Private OS и owner-only поля недоступны.
- Wave 10 не вводит анонимный публичный доступ.
- Response и selection — отдельные Exchange objects с ownership, version, idempotency и audit.
- Mutation actor preview — `tenant_admin`; capability ответа определяется типом объявления.
- Контакты и коммерческие поля запрещены в payload и UI до OQ-040/OQ-043.
- Стабильные URL, Reload, Back/Forward, loading/empty/error/forbidden/not-found/conflict/Retry обязательны.
- Keyboard flow и 360/375/390 px не имеют page-level overflow.

## EX-002 / EX-005 — Поиск грузов и транспорта

**Цель:** найти опубликованные объявления по безопасным структурированным параметрам.

**Данные:** listing type, route/geography, date range, modes, type-specific public parameters, organization display name/capabilities, published/expiry timestamps.

**Фильтры:** направление, даты, transport modes и allowlisted параметры соответствующего типа. Неизвестные keys server-rejected. Cursor pagination сохраняет фильтры и стабильный порядок.

**Порядок Wave 10:** точные структурированные совпадения, затем `published_at DESC`, затем stable ID. UI не называет это интеллектуальным или коммерческим ranking.

**Действия:** применить/сбросить фильтры, открыть карточку, сохранить поиск, загрузить следующую страницу. Собственное объявление можно открыть, но кнопки response нет.

**Состояния:** loading, empty, no-results, retryable network error, invalid filter, entitlement denied. Paused/closed/expired/matched и owner draft отсутствуют в выдаче.

## Saved searches

**Владелец:** конкретная active membership внутри organization/workspace.

**Данные:** пользовательское название, listing type, allowlisted filter JSON, created/updated time. Контакты, private IDs и произвольный JSON не сохраняются.

**Действия:** создать идемпотентно, применить, переименовать, удалить. Другой membership и другой tenant получают safe not-found.

**Ограничение:** email/push/background matching и автоматические рекомендации в Wave 10 отсутствуют.

## EX-009 — Отклики

**Ответчик:** `tenant_admin` другой организации с `transport_publisher` для груза или `cargo_publisher` для транспорта.

**Форма:** короткое публичное сообщение без цены/торга и без contact-like данных. UI предупреждает, что response не является договором или гарантией.

**Lifecycle:** `submitted → shortlisted → selected | rejected`; `submitted | shortlisted → withdrawn`.

**Автор response видит:** свой listing summary, своё сообщение, безопасный status/history и действие Withdraw, пока статус не финальный.

**Владелец listing видит:** responses к своему объявлению, safe organization profile ответчика и действия Shortlist, Reject, Select. Membership/private identifiers ответчика не показываются.

**Не разрешено:** self-response, response на непубличный/истёкший/matched listing, второй active response той же organization, чужое чтение или mutation, возврат из финального status.

## EX-010 — Выбор без раскрытия контактов

**Select:** транзакционно создаёт ровно один `ExecutorSelection`, переводит выбранный response в `selected`, остальные активные responses в `rejected` с системной причиной, listing в task-level `matched`, закрывает новые responses и пишет audit.

**Контакты:** остаются скрытыми даже выбранным сторонам. `ContactAccessEvent` отсутствует. UI показывает явный locked state и ссылку на будущую политику, а не фиктивные данные.

**Нейтральность:** copy явно говорит, что платформа не является стороной сделки, не принимает оплату и не гарантирует перевозку.

## Public data boundary

Во всех surfaces запрещены email, телефон, URL/мессенджеры, BIN/реквизиты, workspace/membership/user IDs, Private OS IDs, документы, себестоимость, маржа и staff comments. Response message проходит server-side contact/private-identifier validation.

## Приёмка

- точные и комбинированные filters, pagination и stable ordering подтверждены server/API tests;
- saved search изолирован по membership/organization/workspace;
- две synthetic organizations проходят response → shortlist → select;
- self/foreign/duplicate/disabled/wrong-capability/status/contact-like negative matrix PASS;
- one-selection concurrency и optimistic conflict PASS;
- matched listing исчезает из поиска, но owner history сохраняется;
- selected payload не раскрывает контакты и не создаёт ContactAccessEvent;
- direct URLs, reload/history, keyboard, Retry и mobile 360/375/390 PASS;
- Wave 9 listings и Private OS regression PASS.

## Вне Wave 10

Коммерческие ставки/торг, раскрытие контактов, KYC/moderation/complaints, ratings/reviews, уведомления вне in-app, recommendation/ranking ML, billing, Private OS conversion и production.
