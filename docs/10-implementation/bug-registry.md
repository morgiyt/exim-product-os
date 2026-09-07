# Bug Registry

## Перепроверка 2026-09-04

Подробный источник: [Super App live audit](audits/2026-09-04-super-app-live-audit).

| ID | Результат перепроверки |
|---|---|
| BUG-001 | Не воспроизведён: 10/10 reload завершились. Статус не менять на Fixed без версии/commit evidence. |
| BUG-002 | Июльская самопроизвольная смена view state не воспроизведена. Разделение server role и view mode всё ещё не сертифицировано; намеренно выбранные несовместимые режимы учтены в BUG-011. |
| BUG-003 | Workflow-список и Kanban загрузились; июльская нестабильность не воспроизведена. Сохранение выбранного view после reload отдельно не сертифицировано; статус Fixed не установлен. |
| BUG-004 | Повторно подтверждён на 360/375/390 px. |

## BUG-005 — Navigation state is not restored

- Статус: Confirmed
- Серьёзность: High
- Факт: `/app#workflow` открывал другой раздел; CRM не обновлял hash; Back менял history без смены текущего экрана.
- Ожидание: утверждённый path/hash contract работает для direct open, reload, Back и Forward.
- Приёмка: REQ-005.

## BUG-006 — Request counts disagree

- Статус: Confirmed
- Серьёзность: High
- Факт: inbox показывал 0, workflow/analytics — 6, другой dashboard view — 2/4.
- Ограничение: аудит не установил причину. Разные scopes или фильтры возможны, но интерфейс их не объяснял.
- Ожидание: одна и та же метрика при одинаковом scope совпадает во всех разделах; разные scopes явно подписаны и показывают активный фильтр/владельца.
- Приёмка: REQ-005/REQ-006.

## BUG-007 — Global search misses an existing request

- Статус: Confirmed
- Серьёзность: High
- Факт: существующий в workflow ID возвращал «не найдена».
- Ожидание: доступный объект находится; права поиска равны правам карточки.
- Приёмка: REQ-005.

## BUG-008 — Tracking returns misleading empty state

- Статус: Confirmed
- Серьёзность: Medium
- Факт: существующий request ID и заведомо неверный ID формата `EX-XXXX` приводили к одинаковому сообщению «все грузы доставлены».
- Ожидание: доступный request без Shipment отличается от неизвестного ID и от отсутствия активных Shipment. Недоступный чужой объект обрабатывается по безопасному non-disclosure contract и не раскрывает факт своего существования.
- Приёмка: REQ-002/REQ-005.

## BUG-009 — Auth callback reports verification success for tested failure inputs

- Статус: Confirmed
- Серьёзность: High
- Факт: callback без параметров, с `error=access_denied` и неверным code отвечал redirect на `/login?verified=1` без `Set-Cookie`.
- Влияние: ложное сообщение об успехе; auth bypass не доказан.
- Ожидание: success только после успешного exchange; ошибки сохраняют ошибочный статус.
- Приёмка: REQ-005.

## BUG-010 — Request form contains demo/hardcoded route data

- Статус: Confirmed UI
- Серьёзность: Medium
- Факт: Шэньчжэнь → Алматы и «Адрес доставки в Алматы» были предзаполнены; состав полей расходится с REQ-001.
- Ограничение: финальная отправка не проверялась.
- Приёмка: REQ-001.

## BUG-011 — Role view modes expose incompatible interface blocks

- Статус: Confirmed UI, server impact unverified
- Серьёзность: High
- Факт: client view mode показывал manager KPI/employee tasks/role management; logist view mode — margin-related screen.
- Не утверждать: настоящий клиент или логист уже получает эти данные сервером.
- Ожидание: отдельные account tests и отсутствие закрытых полей в payload.
- Приёмка: REQ-004/REQ-005.

Дата расследования: 2026-07-27
Окружение: published Vercel app, built-in Browser, authenticated manager-visible session.

## Scope And Safety

- Код опубликованного приложения не изменялся.
- Рабочие данные не изменялись.
- Новые заявки и перевозки в technical recon не создавались.
- Существующая тестовая заявка `CODEX-AUDIT` использовалась только как ранее созданное доказательство.
- Cookies, tokens, credentials and browser storage values were not read, stored or printed.
- Technical evidence and public-bundle observations are recorded in [Production Technical Recon 2026-07-27](audits/2026-07-27-production-technical-recon).
- Architecture gaps are tracked separately in [Gap Registry](gap-registry).

## BUG-001

- ID: BUG-001
- Название: `/app` периодически зависает на «Загружаем рабочее пространство»
- Статус: Confirmed
- Серьёзность: High
- Затронутая роль: authenticated manager-visible app shell
- Окружение: `https://exim-super-app.vercel.app/app`, Vercel production, built-in Browser.
- Предусловия: пользователь авторизован; защищённый shell `/app` доступен.

### Шаги воспроизведения

1. Открыть `/app` в авторизованной Browser-сессии.
2. Выполнить reload `/app`.
3. Повторить reload несколько раз.
4. Использовать Back/Forward после переходов внутри Browser history.
5. Проверить, появляется ли защищённое рабочее пространство или остаётся boot screen.

### Фактический результат

HTML и JavaScript загружаются, но bootstrap приложения периодически не завершается. Защищённый интерфейс не появляется: остаётся экран `Загружаем рабочее пространство`, без sidebar и без role controls.

В technical recon зафиксировано:

- direct `/app` и первые reload могли открыть manager dashboard;
- один reload показал client dashboard/view mode с boot text;
- после Back/Forward `/app` дошёл до loading-only state;
- Browser console не показал EXIM application errors в доступных логах.

### Ожидаемый результат

После успешной авторизации `/app` стабильно открывает рабочее пространство. Reload, direct open и Back/Forward не должны оставлять пользователя на boot screen.

### Частота воспроизведения

Confirmed during repeated Browser checks, but not every reload failed.

### Доказательства

- Screenshot: ![Direct app loading](../public/app-audit/2026-07-27/bug-evidence/bug-001-direct-app-loading.png)
- Screenshot: ![Technical direct app](../public/app-audit/2026-07-27/technical-evidence/technical-direct-app.png)
- Technical recon section: [Loading-Only Investigation](audits/2026-07-27-production-technical-recon#loading-only-investigation)

### Связанные требования

- [MVP v1](../07-mvp/mvp-v1)
- [Роли](../02-process/roles)
- [Права и видимость](../03-product-map/permissions)
- [Карта приложения](../03-product-map/app-map)

### Ограничения расследования

Точная первопричина невозможна без `exim-app`, server logs и исходного bootstrap-кода. Network request bodies, auth headers, cookies, tokens and storage values were not inspected or documented.

### Рекомендуемая проверка после исправления

- 10 последовательных reload `/app`;
- прямое открытие `/app`;
- Back/Forward;
- desktop и mobile;
- рабочее пространство должно загрузиться 10 из 10 раз.

## BUG-002

- ID: BUG-002
- Название: UI role/view state instability
- Статус: Partially confirmed
- Серьёзность: Medium
- Затронутая роль: manager-visible session; client/logist view modes in UI.
- Окружение: published Vercel app, built-in Browser.
- Предусловия: authenticated `/app` shell renders role switcher.

### Шаги воспроизведения

1. Открыть `/app`.
2. Зафиксировать confirmed server role where safely exposed, UI mode and active visual button separately.
3. Reload `/app`.
4. Перейти между доступными разделами.
5. Использовать Back/Forward.
6. Сравнить server role signal, UI mode, active visual button and proven accessible functions.

### Фактический результат

Visible state varied without intentional role switching:

- Most runs: active `Менеджер`, body role `manager`, manager dashboard.
- One reload: active `Клиент` plus `RU`, body role unset, client dashboard/view mode.
- Later state: active `Менеджер` again.
- Loading-only state: no role button visible.

Technical recon confirmed that public code separates:

- server role signal: `window.__EXIM.role`;
- UI mode: `APP_STATE.currentRole`;
- active visual button: `.role-switcher button.active`.

### Ожидаемый результат

The app should expose a consistent, auditable separation between server role, selected UI mode and active visual button. Reload and Back/Forward should not make the visible role/mode ambiguous.

### Частота воспроизведения

Partially reproduced. Manager-visible state was repeated; transient client visual mode was observed but not proven as server role change.

### Доказательства

- Screenshot: ![Manager incoming dashboard](../public/app-audit/2026-07-27/authenticated/manager-incoming-dashboard.png)
- Technical recon section: [Role And View-State Investigation](audits/2026-07-27-production-technical-recon#role-and-view-state-investigation)

### Связанные требования

- [Роли](../02-process/roles)
- [Права и видимость](../03-product-map/permissions)
- [Карта приложения](../03-product-map/app-map)

### Ограничения расследования

This is not classified as an RBAC problem. Server role was not independently confirmed through a safe API response, and role rights were not changed or tested.

### Рекомендуемая проверка после исправления

Provide a safe test-only role/mode diagnostic, then verify after login, reload, direct `/app`, sidebar navigation and Back/Forward that server role, UI mode and active visual button remain explainable and consistent.

## BUG-003

- ID: BUG-003
- Название: List/Kanban view instability
- Статус: Partially confirmed
- Серьёзность: Medium
- Затронутая роль: manager.
- Окружение: `/app`, workflow/request section, published Vercel app.
- Предусловия: authenticated app shell renders request workflow.

### Шаги воспроизведения

1. Open `/app`.
2. Navigate to request workflow through sidebar/internal navigation.
3. Click `Список`.
4. Click `Канбан`.
5. Click `Канбан` again.
6. Click `Список`.
7. Reload after selecting a view.
8. Check DOM, visible table/columns and URL/query/hash.

### Фактический результат

- Earlier authenticated audit saw `CODEX-AUDIT` in kanban columns.
- A later repeat showed that clicking `Канбан` left the table visible: `hasTable=true`, `hasKanban=false`, URL stayed `/app`.
- Technical recon confirmed the view switch depends on local state and loaded data: `WF.view(v)` changes `CACHE.view`, and the kanban board renders only when `CACHE.view === 'kanban' && os.length`.

### Ожидаемый результат

`Канбан` consistently switches to visible kanban columns, `Список` consistently switches to the table, and the selected view has deterministic reload behavior.

### Частота воспроизведения

Partially reproduced across audit passes. The exact cause is not proven.

### Доказательства

- Screenshot: ![Manager requests with CODEX-AUDIT](../public/app-audit/2026-07-27/authenticated/manager-requests-codex-audit.png)
- Technical recon section: [Kanban Investigation](audits/2026-07-27-production-technical-recon#kanban-investigation)

### Связанные требования

- [REQ-003](../06-requirements/REQ-003-configurable-workflow-mvp)
- [Configurable Workflow Foundation](../01-foundation/configurable-workflow-foundation)
- [Кабинет менеджера](../04-pages/manager-cabinet)

### Ограничения расследования

Cause is not proven. The final Browser pass was affected by loading-only and view-state instability, and `exim-app` source was unavailable.

### Рекомендуемая проверка после исправления

Seed one `CODEX-AUDIT` request, toggle `Список`/`Канбан`, assert visible DOM for table and kanban columns, then repeat after reload on desktop and mobile.

## BUG-004

- ID: BUG-004
- Название: Mobile horizontal overflow caused by `.dash-link`
- Статус: Confirmed
- Серьёзность: Medium
- Затронутая роль: client view mode inside protected `/app`; protected dashboard shell.
- Окружение: built-in Browser viewport checks at 375x812 and 360x800.
- Предусловия: protected `/app` renders dashboard quick actions.

### Шаги воспроизведения

1. Open authenticated `/app`.
2. Set viewport to 375x812.
3. Observe page-level horizontal scroll.
4. Inspect overflowing elements safely through read-only DOM measurements.
5. Repeat at 360x800.

### Фактический результат

At 375/360px widths, the protected dashboard client view mode produced document-level horizontal overflow. The quick-action `.dash-link` row extended the document width to approximately `1054px`. Buttons such as `Рассчитать перевозку`, `Купить контейнер`, `Связаться с менеджером` were positioned horizontally beyond the viewport.

### Ожидаемый результат

Protected `/app` should fit within viewport width at 375x812 and 360x800 without document-level horizontal scroll. Dashboard quick actions should wrap, stack or scroll inside a constrained internal container.

### Частота воспроизведения

Confirmed at 375x812 and 360x800 in technical recon.

### Доказательства

- Screenshot: ![Technical mobile 375](../public/app-audit/2026-07-27/technical-evidence/technical-mobile-375.png)
- Screenshot: ![Technical mobile 360](../public/app-audit/2026-07-27/technical-evidence/technical-mobile-360.png)
- Technical recon section: [Mobile Overflow Investigation](audits/2026-07-27-production-technical-recon#mobile-overflow-investigation)

### Связанные требования

- [Product Foundation](../01-foundation/product-foundation)
- [Карта приложения](../03-product-map/app-map)
- [MVP v1](../07-mvp/mvp-v1)

### Ограничения расследования

The exact CSS rule cannot be established without source access. The finding is based on Browser DOM measurements and screenshots.

### Рекомендуемая проверка после исправления

Run responsive tests at 390x844, 375x812 and 360x800 and assert `document.documentElement.scrollWidth <= document.documentElement.clientWidth` for protected dashboards.
