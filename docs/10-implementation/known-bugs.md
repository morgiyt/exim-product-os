# Known Bugs и ограничения аудита

Technical evidence and public-bundle observations: [Production Technical Recon 2026-07-27](audits/2026-07-27-production-technical-recon). Deep-link limitations are tracked separately as [GAP-001](gap-registry#gap-001).

## Technical recon summary

- Bootstrap: BUG-001 is `/app` intermittently remaining at `Загружаем рабочее пространство` after auth/bootstrap.
- Navigation: sidebar hrefs are hash/internal-state links inside one `/app` shell. `/app/requests` is not an implemented route; this is GAP-001, not a standalone High routing bug.
- Role state: public code confirms `window.__EXIM.role` as the server role signal and `APP_STATE.currentRole` as interface/view mode. The finding remains UI/view-state ambiguity, not proven RBAC failure.
- Kanban: public workflow code confirms `WF.view(v)` changes local `CACHE.view` and re-renders; the kanban board is rendered only when workflow orders are loaded and non-empty.
- Mobile: the largest measured overflow came from the protected dashboard quick-action `.dash-link` row in client view mode, where document scroll width reached about `1054px` on 375/360px viewports.

Полный реестр BUG-записей: [Bug Registry](bug-registry).

## Критические ограничения

### Нет полного набора тестовых аккаунтов ролей

Для полноценной сертификации MVP нужны отдельные подтверждённые аккаунты клиента, менеджера, логиста и администратора. В продолжении аудита была доступна только одна сессия, фактически отображающая роль менеджера. Клиентский, логистический и административный слои не проверены.

Это ограничение аудита, а не доказательство отсутствия функций.

### Репозиторий приложения недоступен

Исходный код `exim-app` не был доступен в рабочей папке. Поэтому не проверялись frontend/backend архитектура, база данных, auth policies, API, модели данных, hardcoded статусы, mock-данные, Vercel-конфигурация и переменные окружения.

### Первичный аудит проверял только публичную auth-часть

До появления доступа к текущей сессии были проверены только `/login`, `/register`, `/forgot-password`, `/verify` и redirect защищённых маршрутов без сессии. Продолжение аудита расширило проверку до одной текущей менеджерской сессии, но не заменяет полный role audit.

## Подтверждённые проблемы приложения

### `/app` периодически остаётся в loading-only state

В авторизованной сессии `/app` периодически остаётся на `Загружаем рабочее пространство`: HTML и JavaScript загружаются, но защищённый интерфейс не появляется. Навигация по разделам фактически работает внутри одного `/app`.

Риск: пользователь после успешной авторизации может не попасть в рабочее пространство после reload или Back/Forward.

Прямые `/app/*` URL перенесены в [GAP-001](gap-registry#gap-001) как архитектурное ограничение hash/internal-state navigation.

### Нет безопасного перехода этапа заявки

Созданная тестовая заявка `CODEX-AUDIT` появилась в списке и канбане и сохранилась после reload, но в видимом UI не найден контрол смены этапа. Режим `Канбан` отображает карточку, но не даёт проверяемого transition action.

Риск: не подтверждается соответствие REQ-003, D-065...D-074 и сценарию передачи запроса логисту.

Продолжение аудита уточнило: карточка `CODEX-AUDIT` открывалась и показывала назначение логиста, deadline и кнопку отправки на расчёт. Кнопка не нажималась, потому что могла назначить реального пользователя или создать рабочую задачу.

### Нестабильное ролевое и view-состояние

После прямого возврата на `/app` один раз активной отображалась роль `Клиент`, но последующая проверка без ручного переключения снова показала активную роль `Менеджер` и manager dashboard. Также кнопка `Канбан` в разделе заявок в одном проходе показывала kanban-колонки, а при повторной проверке оставляла таблицу.

Риск: UI-state может зависеть от внутреннего состояния SPA и не быть надёжно связанным с серверной ролью или URL.

### Перевозку невозможно безопасно создать в текущей сессии

Раздел `Перевозки` пуст. Кнопка `+ Новая заявка` открывает форму, которая подтягивает существующие данные отправителя и поля реквизитов. Создание не выполнялось, чтобы не затронуть реальные рабочие данные.

Риск: сценарии shipment, trips, tracking events и публикации статуса остаются непроверенными.

### Мобильный `/app` имеет горизонтальный overflow

На viewport 390x844 dashboard отображается, но внизу виден горизонтальный скролл.

Риск: мобильная демонстрация защищённой зоны выглядит незавершённой.

## UX findings

1. Desktop `login` и `verify` используют узкий layout.
2. `register` визуально отличается от `login` и `verify`.
3. Поле email на `login` визуально обрезает placeholder.
4. В верхней панели текущей роли видны кнопки других ролей, но их безопасное поведение не проверялось.
5. В текущем приложении есть разделы `Контейнеры` и `Услуги`, которые шире Product OS scope и требуют отдельного решения о границах продукта.

## Developer Mode findings

- Ошибки приложения в console logs во время проверенных действий не обнаружены.
- Наблюдавшиеся сетевые предупреждения относились к служебной среде Browser/Codex и не классифицированы как ошибки EXIM.
- API-ответы не раскрывались и не документировались, чтобы не выводить токены или персональные данные.
