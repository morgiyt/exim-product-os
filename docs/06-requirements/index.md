# Реестр требований

## Статусы

- **Ready for implementation** — достаточно определено для текущего пакета; открытые вопросы не блокируют заявленный минимум.
- **Draft** — направление подтверждено, но детали требуют решений.
- **Historical baseline** — сохраняется как источник старого процесса и уточняется более новыми требованиями.

## Foundation Gate

| ID | Требование | Статус | Релиз |
|---|---|---|---|
| [REQ-001](./REQ-001-request-to-calculation) | Запрос и передача на расчёт | Ready for implementation | Foundation Gate |
| [REQ-002](./REQ-002-shipment-tracking) | Ручной tracking перевозки | Ready for implementation | Foundation Gate |
| [REQ-003](./REQ-003-configurable-workflow-mvp) | Минимальный versioned workflow | Gate core: Ready; editor вынесен в REQ-014 | Foundation Gate |
| [REQ-004](./REQ-004-organizations-and-tenant-isolation) | Организации, memberships и tenant isolation | Ready for implementation | Foundation Gate |
| [REQ-005](./REQ-005-secure-app-shell) | Безопасный и стабильный app shell | Ready for implementation | Foundation Gate |
| [REQ-006](./REQ-006-agreement-to-shipment) | От согласования до перевозки | Ready for implementation | Foundation Gate |
| [REQ-011](./REQ-011-crm-clients) | CRM, лиды и клиентские компании | Ready for implementation | Full Product / Wave 5 |
| [REQ-012](./REQ-012-tasks-chats-notifications) | Задачи, чаты и in-app уведомления | Ready for implementation | Full Product / Wave 6 |
| [REQ-013](./REQ-013-finance-closing-analytics) | Финансы, закрытие и управленческая аналитика | Ready for implementation | Full Product / Wave 7 |
| [REQ-014](./REQ-014-workflow-template-studio) | Workflow Template Studio и безопасная activation | Ready for implementation | Full Product / Wave 8 |

## EXIM Exchange Launch MVP

| ID | Требование | Статус | Релиз |
|---|---|---|---|
| [REQ-007](./REQ-007-exchange-listings) | Объявления грузов и транспорта | Wave 9 task-ready; later mechanics remain Draft | Full Product / Wave 9 |
| [REQ-008](./REQ-008-exchange-search-and-responses) | Поиск, отклики и выбор исполнителя | Draft | Launch MVP |
| [REQ-009](./REQ-009-modules-and-entitlements) | Модули, бесплатный/платный доступ | Draft | Launch MVP |
| [REQ-010](./REQ-010-verification-and-moderation) | Проверка, жалобы и модерация | Conditional Draft после OQ-039…041 | Launch MVP, если утверждено |

## Зависимости

```text
REQ-004 tenant/security foundation
├── REQ-001 + REQ-003 + REQ-006 Private OS flow
├── REQ-011 CRM, лиды и клиентские компании
├── REQ-012 задачи, чаты и in-app уведомления
├── REQ-013 финансы, закрытие и управленческая аналитика
├── REQ-014 workflow template studio
├── REQ-002 tracking
├── REQ-005 reliable shell and RBAC verification
└── REQ-007…009 Exchange Launch MVP
    └── REQ-010 conditional trust & safety, только если утверждено
```

REQ-007…REQ-009 и любую утверждённую часть conditional REQ-010 нельзя считать реализованными по наличию каталога контейнеров или упоминанию ATI.SU как внешнего источника ставок.
