# Roadmap функционально полного EXIM Super App

**Статус:** утверждён владельцем 2026-09-17.  
**Цель:** функционально полный, безопасный и проверяемый release candidate; финальный визуальный дизайн выполняется после функционального контура.  
**Среда до отдельного решения:** staging/preview, только синтетические данные.

## Постоянные правила всех этапов

- EXIM Super App — multi-tenant SaaS, а `exim.kz` — первый полноценный tenant.
- Private Operating OS и EXIM Exchange — разные bounded contexts и разные области данных.
- На старте используется модульный монолит; отдельные deployable microservices появляются только по доказанной необходимости.
- Super App, EXIM Hub и EXIM Daily не делят базы, cookies и секреты.
- Любое чтение и действие ограничивается server-side по session, workspace, membership, role, client company и entitlement.
- Запрет имеет приоритет над разрешением; клиентский payload не содержит внутренние цены, маржу, подрядчиков, водителей и staff-only комментарии.
- Переходы, повторные команды и интеграционные события идемпотентны и аудируются.
- Private-данные никогда не становятся Exchange listing автоматически: публикация — отдельное явное действие с allowlist полей.
- Синтетические цены, тарифы и контент допустимы только с видимой маркировкой `Демо / не является коммерческим предложением`.
- Каждая волна проходит tests, migration/rollback, staging evidence и version-controlled отчёт; production включается отдельно.

## Этап 0 — Канон, baseline и непрерывная память

- закрепить эту директиву, решения, roadmap и точный application baseline;
- синхронизировать фактическое состояние self-hosted preview с Product OS;
- сохранить открытые вопросы как ограничения, а не повод останавливать независимые части;
- открыть первую implementation wave с точными AC.

**Выход:** Product OS 0.6.0 draft и адресуемая задача на известный application commit.

## Этап 1 — Release foundation

- CI для build, lint, typecheck, tests и migration validation;
- последовательные PostgreSQL migrations с checksum;
- backup, restore drill, export и retention;
- health/readiness, structured logs и безопасная диагностика;
- staging linkage к exact Git commit, rollback без потери данных.

**Выход:** воспроизводимый и наблюдаемый контур поставки.

## Этап 2 — Identity, организации и RBAC

- login/logout/recovery/verification и управление сессиями;
- организации, workspaces, client companies и несколько пользователей компании;
- несколько memberships/ролей без случайного повышения прав;
- явный выбор активного workspace/role context;
- tenant admin, platform admin, suspension, invitation и audit;
- семь Gate-аккаунтов, два tenants и A1/A2/B1 negative matrix.

**Выход:** доказанная серверная изоляция и управляемый доступ.

## Этап 3 — Стабильная рабочая оболочка

- устойчивые URL для разделов и объектов;
- Reload, Back/Forward, безопасный return target;
- desktop/mobile без page-level overflow;
- loading, empty, error, forbidden и not-found;
- единый поиск, inbox, dashboard counts и scope labels;
- role-based navigation без ложного UI-переключателя прав.

**Выход:** надёжный каркас всех кабинетов.

## Этап 4 — Domain и versioned workflow core

- канонические сущности QuoteRequest, RateQuote, CommercialOffer, AgreementBasis, Shipment, Trip и TrackingEvent;
- versioned templates/instances/transitions;
- required data, actor permissions, client labels и audit history;
- idempotency keys, optimistic conflict handling и safe client projections;
- read-only template inspection для tenant admin.

**Выход:** один универсальный серверный механизм процессов без hardcoded UI-логики.

## Этап 5 — CRM и клиенты

- лиды, компании, контакты, закрепление и временная передача менеджера;
- история взаимодействий, заметки передачи и задачи;
- конверсия лида в клиентскую компанию/запрос без дублей;
- dashboards продаж и причины потерь.

**Выход:** полный путь от лида до рабочего клиента.

## Этап 6 — Запрос и расчёт

- клиентская и менеджерская форма запроса;
- черновик, validation, files, photos и idempotent submit;
- назначение логиста и возврат за недостающими данными;
- минимум две независимые ставки, срок действия и история перерасчётов;
- внутренние себестоимость/условия не попадают клиенту.

**Выход:** проверяемый расчёт от запроса до набора ставок.

## Этап 7 — Предложение, договорный gate и создание перевозки

- выбор ставки менеджером;
- versioned client price, услуги, условия и причина изменения;
- approve/reject/clarification точной версии клиентом;
- годовой договор + заявка к договору;
- ровно один Shipment после valid contract basis.

**Выход:** согласованный запрос безопасно становится перевозкой.

## Этап 8 — Перевозки, рейсы, tracking и документы

- несколько Trips в одной Shipment;
- назначение логиста, внутренние carrier/vehicle/driver данные;
- manual/event tracking, corrections и клиентская публикация менеджером;
- документы с versioning, visibility и direct-ID authorization;
- операционные и клиентские timeline/status layers.

**Выход:** перевозка ведётся до завершения без утечки внутренних данных.

## Этап 9 — Задачи, чаты и уведомления

- внутренние задачи, дедлайны, комментарии и эскалации;
- клиентский чат только с разрешённым контуром менеджера;
- вложения, read state и аудит;
- in-app notifications и notification preferences;
- внешние каналы только после отдельного решения.

**Выход:** ежедневная коммуникация и контроль работы внутри Super App.

## Этап 10 — Финансы, закрытие и аналитика

- internal cost, client price, margin и expenses с отдельными permissions;
- ручные payment/closing states и документы закрытия;
- dashboards продаж, логистики, руководителей и администратора;
- единые метрики, экспорт и audit trail;
- real currency/prices заменяют placeholders только после решения владельца.

**Выход:** управляемое финансовое закрытие и достоверная аналитика.

## Этап 11 — Полный workflow editor

- создание, редактирование, preview и activation templates;
- field definitions, transitions, actor matrix, client labels и notifications;
- immutable versions и безопасная стратегия миграции instances;
- tenant overrides в разрешённых границах.

**Выход:** процессы настраиваются без изменения кода.

## Этап 12 — EXIM Exchange: объявления

- OrganizationCapabilities с совмещаемыми ролями;
- CargoListing и TransportListing как отдельные публичные сущности;
- auto, rail, sea, air и multimodal field groups;
- draft/published/paused/closed/expired lifecycle;
- явная публикация allowlisted данных из Private OS либо независимое создание.

**Выход:** организации безопасно размещают грузы и транспорт.

## Этап 13 — EXIM Exchange: поиск и отклики

- поиск, фильтры, saved searches и pagination;
- карточка объявления и безопасный профиль организации;
- responses, shortlist, accept/reject/withdraw и audit;
- контакты закрыты до принятого правила раскрытия;
- платформа не становится стороной сделки.

**Выход:** две независимые организации проходят полный Exchange interaction.

## Этап 14 — Trust & Safety и Platform Admin

- moderation queue, abuse reports, suspension и reason codes;
- verification/KYC только в утверждённом объёме;
- platform audit, incident trail и data-access controls;
- legal-neutrality, privacy и dispute copy после юридического решения.

**Выход:** контролируемый публичный контур без выдуманного verified-статуса.

## Этап 15 — Тарифы и подписки

- free/paid entitlements и server-enforced limits;
- plans, subscriptions, usage counters и manual activation;
- billing provider подключается после отдельного решения;
- до этого используются только явно маркированные demo plans/prices.

**Выход:** технически готовая модульная монетизация без фиктивных списаний.

## Этап 16 — EXIM Hub, Jarvis и внешние системы

- Hub остаётся отдельным продуктом и backend не объединяется;
- сначала link-first, затем versioned API/SSO/event contracts;
- single writer на процесс, idempotency и reconciliation;
- Jarvis получает минимальный разрешённый контекст и не обходит RBAC;
- Bitrix, tracking providers и уведомления подключаются отдельными adapters.

**Выход:** интеграционная готовность без общей БД и скрытых связей.

## Этап 17 — Hardening и release readiness

- threat model, dependency/secret scanning и permission regression;
- load/performance/accessibility/browser/mobile checks;
- backup/restore/DR rehearsal и observability alerts;
- retention/export/delete rules и incident runbooks;
- release checklist без BLOCKED/необъяснённых NOT_RUN.

**Выход:** технически и операционно готовый release candidate.

## Этап 18 — Дизайн-handoff и публичный релиз

- реестр всех страниц, ролей, состояний, полей и действий;
- functional screenshots и fixtures для дизайнера;
- дизайн меняет представление, а не скрыто бизнес-логику;
- regression после внедрения дизайна;
- production cutover и публичный запуск только отдельным решением владельца.

**Выход:** функционально полный продукт, готовый к визуальной системе и последующему production launch.

## Что не блокирует текущую разработку

До получения реальных значений допускаются синтетические placeholder-данные для тарифов, цен, demo listings, demo companies, текстов уведомлений и экранного наполнения. Они всегда маркируются и не используются как реальные коммерческие или юридические условия.

Открытые вопросы блокируют только зависимый от ответа участок. Независимые модули, безопасность, данные, роли, workflow, тесты и staging продолжаются.

