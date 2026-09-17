# REQ-012 — Задачи, чаты и in-app уведомления

Статус: Ready for implementation в рамках TASK-2026-008.

Область: Private Operating OS первого tenant exim.kz. Внешние email/SMS/WhatsApp/Telegram отправки и EXIM Exchange не входят.

## Цель

Заменить localStorage и прямые legacy table writes одним server-authorized контуром ежедневной работы: внутренними задачами, безопасными чатами, комментариями, вложениями, read state и транзакционными in-app уведомлениями.

## Подтверждённые правила

1. Задачи, чаты и уведомления соблюдают workspace, role и client-company isolation.
2. Клиент не видит внутренние задачи, внутренние обсуждения, staff-only вложения, других клиентов или внутренние поля.
3. Клиентский чат существует только в разрешённом контуре его client company и текущего менеджера; смена менеджера не раскрывает другие чаты или старые внутренние обсуждения.
4. Вложения хранятся на сервере и скачиваются только через direct-ID authorization.
5. Сообщения, комментарии, read state, назначения и изменения сроков аудируются.
6. Внешние каналы подключаются только отдельными adapters после отдельного решения владельца.
7. Сроки и escalation rules не создают юридический SLA: это внутренние operational defaults первого tenant.

## Task-level defaults первого tenant

### Задача

- Статусы: `new → in_progress → done`; из `new` или `in_progress` разрешён `cancelled`; `in_progress → blocked → in_progress/done`.
- Приоритеты: `low`, `normal`, `high`, `urgent` как task-level технический default без коммерческого SLA.
- Создавать внутреннюю задачу могут manager, logistician и tenant admin; assignee — активная staff membership того же workspace.
- Клиент не является assignee внутренней задачи и не получает task API/UI.
- Любая смена assignee, status, priority или due_at требует optimistic version, idempotency key и audit event.
- Просрочка вычисляется сервером по `due_at`; reminder/escalation создают только in-app notification. Автоматическая смена статуса запрещена.
- Комментарии append-only. Исправление — новая correction-запись со ссылкой на исходную.

### Чат

- Conversation бывает `internal` или `client`.
- Internal conversation доступна только явным staff members того же workspace.
- Client conversation привязана к одной client company. Client members этой компании видят только client-safe messages; staff membership формируется сервером из current manager assignment и явных разрешённых участников.
- Tenant admin видит metadata tenant-wide, но content читает только как явный участник; добавление администратора или другого staff member аудируется.
- Сообщения append-only. Скрытое редактирование или удаление истории запрещено; correction создаётся новой записью.
- Read state хранится отдельно для каждого conversation member.
- Вложение проходит allowlist MIME/size из server config, имеет immutable storage key и наследует authorization conversation.

### Уведомления

- In-app notifications создаются сервером из audit/domain events: task assignment/reassignment, due soon/overdue, task comment, new allowed chat message и access change.
- Notification содержит event key, recipient membership, safe title/body, target route, created/read timestamps и deduplication key.
- Пользователь может отключить обычные product categories. Security/access changes остаются обязательными.
- Повтор одного domain event не создаёт duplicate notification.
- Email/SMS/WhatsApp/web push и реальные тексты внешней рассылки не входят.

## Данные

- WorkTask: workspace, ref, title, description, status, priority, due_at, creator, assignee, linked entity type/id, version, timestamps.
- TaskComment: task, author, body, correction_of, created_at.
- Conversation: workspace, type, client_company_id optional, linked entity optional, title, status, version.
- ConversationMember: conversation, membership, role in conversation, joined/left/read timestamps.
- Message: conversation, sender membership, body, correction_of, created_at.
- MessageAttachment: message, storage key, file name, MIME, size, checksum.
- Notification: recipient membership, event type/key, safe payload, target route, read_at.
- NotificationPreference: membership, category, enabled; mandatory categories не отключаются.

## Безопасность

- workspace, actor, membership, client company и linked entity выводятся сервером из session и проверяемых parent-связей;
- browser-supplied role/tenant/sender/author игнорируются;
- exact foreign/unknown IDs дают одинаковый safe not-found;
- client payload не содержит staff email, internal task/chat content, audit metadata, cost/margin/carrier/driver;
- unread counts и dashboard counts вычисляются тем же role-scoped read model;
- generic browser-to-table proxy, localStorage как источник истины и Supabase Realtime writes запрещены.

## UI

- task list/kanban, filters, card, comments, assignment, deadline и linked object;
- chat list, conversation, members, messages, attachments и unread state;
- notification center, unread badge, mark one/all read и preferences;
- stable routes `#/tasks/{id}`, `#/chats/{id}`, `#/notifications`;
- loading/empty/error/forbidden/not-found/retry и 360/375/390 без page-level overflow.

## Вне scope

- внешние каналы, bot/autoreply и AI/Jarvis responses;
- звонки, видео, voice notes, message search across tenants и end-to-end encryption;
- юридический SLA, штрафы и автоматическое кадровое решение;
- Exchange messaging, billing, KYC/moderation и marketing automation;
- universal workflow editor и визуальный редизайн.

## Acceptance

- seven-account A1/A2/B1 matrix доказывает task/chat/notification isolation;
- client не получает internal task/chat/direct attachment ID;
- task transition, assignment, deadline и comment replay/stale/foreign paths проверены;
- current manager/client conversation работает, manager transfer не раскрывает internal content;
- message, correction, attachment и read state сохраняются после reload;
- notification dedupe/preferences/mandatory category и exact target route проверены;
- legacy localStorage/Supabase writes удалены из active task/chat/notification paths;
- migration/reapply/isolated restore, regressions, exact preview и private stacked PR проходят.
