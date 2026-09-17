# Changelog

## 0.6.0 draft — Wave 4 handoff

- TASK-2026-007 переведена в `submitted`: private PR #4, exact runtime `33cadb7`, 42/42 tests, tenant/role/transfer/browser/restore evidence сохранены; acceptance не заявляется;
- добавлен REQ-012 и открыт TASK-2026-008 на server-authorized задачи, чаты, вложения, read state и in-app notifications без внешних каналов;
- TASK-2026-006 переведена в `submitted`: private PR #3, exact runtime `88e1cdb`, 36/36 tests, seven-account E2E, browser/mobile и isolated restore evidence сохранены; acceptance не заявляется;
- добавлен REQ-011 и открыт TASK-2026-007 на канонические CRM, лиды, клиентские компании, контакты, manager assignment/transfer и idempotent conversion в draft QuoteRequest;
- TASK-2026-005 переведена в `submitted`: private PR #2, exact runtime `7af9476`, семиролевой E2E, migration/reapply/restore evidence и submission сохранены; acceptance не заявляется;
- открыт `TASK-2026-006` на договорный gate, ровно один Shipment, Trip execution, безопасную публикацию tracking и versioned documents в private stacked branch;
- текущий delivery pointer, реестр и VitePress navigation синхронизированы с immutable ref `product-os-task-2026-006-r1`.

## 0.6.0 — draft — 2026-09-17

- TASK-2026-004 переведена в `submitted`: private PR #1, exact runtime `164f66b`, report/coordination head `f2604b7`, 27/27 tests и три GitHub checks PASS; acceptance не заявляется;
- открыт `TASK-2026-005` на канонический versioned путь QuoteRequest → две RateQuote → CommercialOffer → exact client decision в private stacked branch;
- канонический код EXIM Super App перенесён в приватный репозиторий владельца `morgiyt/exim-super-app`; публичные PR #6/#7 закрыты, созданные нами remote branches удалены;
- TASK-2026-004 повышена до revision 2 и закреплена immutable ref `product-os-task-2026-004-r2`; r1 сохранён как исторический ref до переноса repository boundary;
- владелец утвердил roadmap до функционально полного release candidate и поручил начать реализацию;
- добавлен 18-этапный full-product roadmap от self-hosted foundation до design handoff и отдельного production launch;
- финальный дизайн вынесен после функциональной полноты страниц, ролей, данных и состояний;
- разрешены только явно маркированные синтетические цены, тарифы и demo content до получения реальных коммерческих значений;
- текущее фактическое состояние обновлено с исторического Vercel-аудита на отдельный self-hosted PostgreSQL preview;
- открыт `TASK-2026-003` на release foundation и явный session/workspace/role context;
- ожидание review `TASK-2026-002` не названо acceptance: следующая работа ведётся stacked и не может попасть в `main` до включения base dependency;
- добавлены решения D-086…D-089 и source record прямого owner approval.
- task ref повышен до `product-os-task-2026-003-r2`; опубликованный r1 сохранён как исторический pre-QA tag и не переписан.

## 0.5.0 — draft — 2026-09-07

- Foundation Gate выбран task curator первым ready implementation-заданием `TASK-2026-001` по подтверждённому поручению владельца;
- добавлен version-controlled Delivery Loop: current task, task registry, submission/evidence, independent review, human acceptance и шаблоны следующих итераций;
- добавлен source record прямой delivery-директивы владельца с отделением её от решений task curator;
- Claude Code handoff усилен обязательными repository/ref/environment identifiers, read-only границей Product OS и fail-safe preflight;
- отчёт интегратора возвращается отдельным Product OS report PR и не считается само-приёмкой;
- Product OS расширен от внутренней системы EXIM до независимой multi-tenant SaaS-платформы **EXIM Super App**;
- `exim.kz` зафиксирован как первый полноценный tenant и пилотный workspace, но не как жёстко заданная единственная компания;
- зафиксированы два обязательных продуктовых контура: Private Operating OS и собственная биржа грузов/свободного транспорта (`EXIM Exchange` — рабочее название);
- подтверждено, что Exchange входит в целевой Public Launch MVP, поддерживает основные виды транспорта и имеет ограниченный бесплатный и платный доступ;
- зафиксированы совмещаемые возможности организаций и нейтральность платформы в сделках участников Exchange;
- существующий процесс EXIM сохранён как стартовый workflow Private OS первого tenant;
- техническое выделение Exchange в отдельный deployable microservice оставлено открытым вопросом;
- добавлены решения D-075…D-083 и платформенные вопросы OQ-033…OQ-049;
- текущий пакет интегратору отделён как **Foundation Gate**, предшествующий публичному запуску;
- требования собраны в единый реестр: REQ-001…REQ-006 относятся к Foundation Gate, REQ-007…REQ-010 — к Exchange MVP;
- добавлена актуальная карта платформы, tenant-модель, границы данных, страницы и lifecycle Exchange;
- добавлен неизменяемый live-аудит production от 2026-09-04 и обновлено текущее состояние реализации;
- добавлен безопасный стартовый промпт для Claude Code.
- добавлены Gate transition-role matrix и контракты обязательных экранов; неподтверждённые actors/ветки оставлены `TBD` или отключены в Gate;
- отделены подтверждённые решения владельца, рабочие предложения Launch MVP и условный trust/moderation scope.

## 0.4.0 — 2026-07-27

- added production technical recon, reclassified `/app` loading-only as BUG-001, and moved protected section deep-link limitations to GAP-001;
- заложена Configurable Workflow Foundation;
- добавлено конкретное MVP-требование REQ-003 для configurable workflow запроса на расчёт и перевозки;
- добавлен внешний аудит публичной части опубликованного приложения с матрицей функций, gap analysis и UX findings;
- зафиксированы фиксированные сущности и настраиваемые workflow-шаблоны (D-065…D-074);
- описаны версии шаблонов, аудит изменений, настраиваемые поля, права на этап;
- добавлены универсальные задачи, дедлайны, уведомления, напоминания, эскалации;
- базовый финансовый workflow как стартовый шаблон;
- референсные этапы логистики переведены в шаблон v1, не код;
- обновлены domain model, permissions, statuses, admin cabinet, MVP, roadmap;
- добавлены открытые вопросы OQ-029…OQ-032.

## 0.3.0 — 2026-07-24

- зафиксированы решения по итогам интервью с логистикой;
- уточнён процесс: проверка данных логистом, поиск ставок у партнёров и на площадках FAFA, ATI.SU, Della;
- добавлен выбор варианта менеджером и клиентом, порядок заявок EXIM ↔ клиент, затем логист ↔ партнёр;
- зафиксированы исполнение логистом, данные водителя, решение проблем в пути;
- уточнены правила изменения цены до и после начала перевозки;
- добавлены документы от завода и сущности вариантов ставок / заявки с партнёром;
- добавлена роль и dashboard руководителя логистики;
- **финальное уточнение (2026-07-27):** отсутствие единого SLA; гипотеза индивидуального срока (H-003); поля ставки; операционные этапы перевозки; tracking через звонки/WhatsApp; сценарий без ставки; закрыты OQ-021, OQ-026, OQ-027, OQ-028.

## 0.2.0 — 2026-07-23

- зафиксированы решения по итогам интервью с руководителем отдела продаж;
- разделены сущности: лид, запрос на расчёт, КП, сделка, годовой договор, заявка к договору, перевозка, рейс;
- подтверждены создание клиента менеджером, один основной менеджер и несколько пользователей компании;
- добавлены обязательная заметка передачи клиента и обязательные поля расчёта;
- уточнены цена/маржа, версии расчётов, история изменений цены и плановых дат;
- добавлены роли бухгалтера и руководителя продаж + dashboard;
- зафиксированы годовой договор + заявка к договору и поэтапное закрытие перевозки;
- усилены ограничения клиентского слоя (без перевозчика, водителя, контактов, себестоимости, маржи);
- обновлены открытые вопросы: SLA, отсутствие цены логиста, момент приглашения, модель перевозки/рейсов, полное закрытие;
- добавлена страница прав и видимости.

## 0.1.0 — 2026-07-20

- зафиксирована концепция продукта;
- отделено приложение терминалов и СВХ;
- описаны роли и сквозной процесс;
- разделены запрос, расчёт, предложение, договор, перевозка и рейс;
- создана карта приложения и реестр страниц;
- добавлены статусы, wireframe и MVP;
- созданы первые ТЗ REQ-001 и REQ-002;
- добавлены открытые вопросы и правила для Cursor;
- добавлена публикация через GitHub Pages.
