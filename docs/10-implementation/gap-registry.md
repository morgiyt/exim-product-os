# Gap Registry

Дата: 2026-07-27  
Источник: published Vercel app technical recon and Product OS comparison.

## GAP-001

- ID: GAP-001
- Название: Protected sections do not have independent deep-link URLs
- Статус: Confirmed architecture gap
- Приоритет: Medium
- Затронутая область: protected `/app` navigation, Product OS page registry, QA automation.

### Фактическое состояние

Приложение использует один защищённый shell `/app`. Разделы переключаются внутри `/app` через hash/internal state navigation:

- `#dashboard`
- `#workflow`
- `#shipments`
- `#tracking`
- `#crm`
- `#chats`
- `#tasks`
- `#profile`

`/app/requests` не является реализованным маршрутом. Его 404 не классифицируется как самостоятельный High-баг без требования на path-based routing.

### Последствия

- Нельзя использовать ожидаемые URL вида `/app/requests`.
- Ограничены bookmarks и прямые ссылки на раздел.
- Документация и тесты не должны предполагать path routes.
- После reload должен корректно восстанавливаться hash-раздел.

### Ожидаемое решение

Product OS and implementation should align on one of two contracts:

1. SPA-only contract: `/app` is the only protected route, and section state is hash/internal navigation with stable reload restoration.
2. Path-based contract: protected sections receive independent routes such as `/app/requests`, `/app/shipments`, `/app/tracking`.

### MVP Impact

Medium. GAP-001 does not block the current MVP if hash navigation is stable, reload restores the selected hash section, and documentation/tests stop assuming path routes.

### Доказательства

- Technical recon: [Real Navigation Model](audits/2026-07-27-production-technical-recon#real-navigation-model)
- Screenshot: ![Technical direct requests 404](../public/app-audit/2026-07-27/technical-evidence/technical-direct-requests-404.png)

### Связанные требования

- [Карта приложения](../03-product-map/app-map)
- [Реестр страниц](../04-pages/page-registry)
- [MVP v1](../07-mvp/mvp-v1)

### Рекомендуемая проверка после решения

- If SPA-only: open `/app#workflow`, `/app#shipments`, `/app#tracking`, reload each hash state, and verify the same section is restored.
- If path-based: open, reload and Back/Forward every protected route documented in the page registry.
