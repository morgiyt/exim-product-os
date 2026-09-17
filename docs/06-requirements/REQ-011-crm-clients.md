# REQ-011 — CRM, лиды и клиентские компании

Статус: Ready for implementation в рамках TASK-2026-007.

Область: Private Operating OS первого tenant exim.kz. Это не публичный Exchange и не универсальная CRM-схема всех будущих tenants.

## Цель

Дать менеджеру один проверяемый путь от входящего лида до закреплённой клиентской компании и канонического черновика QuoteRequest без дублей, потери истории и доступа к чужому workspace.

## Подтверждённые правила

1. Лид, клиентская компания и запрос на расчёт — разные сущности.
2. Клиента создаёт менеджер.
3. У клиентской компании один основной менеджер и несколько контактных лиц/пользователей.
4. Временная передача другому менеджеру требует четырёх заполненных блоков: текущая ситуация, согласованное, проблемы, следующие действия.
5. История назначений, взаимодействий, изменений и конверсии сохраняется.
6. Конверсия не создаёт аккаунт клиента автоматически: точный момент приглашения остаётся OQ-023.
7. Менеджер видит свой scope; tenant admin может видеть tenant-wide read layer и управлять назначениями в пределах workspace. Клиент и логист CRM не видят.
8. Bitrix не заменяется и не интегрируется без отдельного решения OQ-001/OQ-002.

## Task-level defaults первого tenant

Для TASK-2026-007 разрешён технический lifecycle лида:

new → qualified → proposal → negotiation → won или lost.

Это task-level default exim.kz, а не универсальный workflow template. Переход в lost требует непустую причину. Переход в won выполняется только атомарной конверсией либо привязкой к уже существующим client company и QuoteRequest.

## Данные

- Lead: ref, company/name, phone/email, source, request summary, route/cargo minimum, potential amount placeholder, stage, owner, version, loss reason, timestamps.
- ClientCompany: name, BIN, status и основной manager assignment.
- ClientContact: name, position, phone, email, primary flag.
- ManagerAssignment: current/temporary manager, effective interval, actor и обязательная transfer note.
- Interaction: type, occurred_at, summary, next action, actor и immutable history.
- Conversion: exact lead, client company, QuoteRequest, actor, time и idempotency key.

## Безопасность

- workspace_id и client_company_id всегда выводятся сервером из подтверждённого actor context либо проверяемой parent-связи;
- browser не передаёт роль, tenant или owner как доверенный источник;
- direct-ID запрос чужого workspace или чужого manager scope возвращает одинаковый безопасный not-found;
- phone/email доступны только manager/tenant-admin CRM layer и связанным client users своей компании; они не становятся Exchange-полями;
- generic browser-to-table proxy и скрытая запись в legacy orders/leads запрещены.

## Конверсия

Конверсия идемпотентна. Она либо использует существующую client company того же workspace по точному ID/BIN, либо создаёт одну новую компанию, затем создаёт один draft QuoteRequest с каноническими route/cargo/client/manager связями. Недостающие обязательные данные не заменяются строками «Уточнить» и приводят к понятной validation error без частичной записи.

## UI

- CRM list/kanban с реальными counts и фильтрами;
- карточка лида с историей, контактами, взаимодействиями, назначением и conversion readiness;
- карточка клиентской компании с контактами, assignment history, requests, offers, shipments, documents и interactions;
- stable URLs, reload, Back/Forward, loading/empty/error/forbidden/not-found;
- mobile 360/375/390 без page-level overflow.

## Вне scope

- автоматическое приглашение/создание client account;
- Bitrix import/export/sync;
- email, SMS, WhatsApp и другие внешние отправки;
- общий task/chat/notification engine;
- real commercial amount, lead scoring, marketing automation и universal pipeline editor;
- Exchange publication, contacts disclosure и public profile.

## Acceptance

- seven-account A1/A2/B1 matrix доказывает tenant, client-company и manager scope;
- transfer без каждого обязательного блока отклоняется;
- lost без причины отклоняется;
- повтор conversion с тем же key возвращает те же IDs и не создаёт дублей;
- client/logistician не получают CRM list/card/direct ID;
- dashboard, list и cards показывают согласованные counts;
- migration/reapply/isolated restore, tests, exact preview и private stacked PR проходят.
