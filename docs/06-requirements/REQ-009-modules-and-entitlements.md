# REQ-009 — Модули, планы, подписки и entitlements

## Статус и цель

**Статус:** task-ready demo baseline для Full Product / Wave 12; реальные цены, лимиты, валюта, trial и billing provider остаются открытыми в OQ-037.<br>
**Цель:** отделить права роли от коммерческого доступа организации и технически подготовить модульную монетизацию без фиктивных списаний.

Точный implementation scope: [TASK-2026-014](../12-delivery/tasks/TASK-2026-014-modules-plans-entitlements). Page contract: [Модули, планы и entitlements](../04-pages/modules-plans-entitlements).

## Минимальная модель Wave 12

- module catalog;
- immutable versioned plan;
- workspace-scoped subscription/grant;
- effective entitlement;
- server-enforced limits;
- usage snapshot/counter;
- effective period;
- append-only plan/subscription/audit event.

## Подтверждено

- функции подключаются модульно;
- Exchange имеет ограниченный бесплатный и платный уровень;
- exim.kz получает полный Private OS первым;
- synthetic plan names, prices, limits и demo content разрешены только с явной маркировкой `Демо / не является коммерческим предложением`;
- production billing и реальные коммерческие условия включаются отдельным решением.

## Правила Wave 12

- наличие роли или capability не обходит entitlement;
- effective entitlement и лимит проверяются сервером при каждой защищённой mutation;
- plan version после activation неизменяема; новая конфигурация получает новую версию;
- одновременно действует не более одной active subscription на workspace/module;
- activation, replacement, expiry и manual cancellation идемпотентны, versioned и audited;
- смена или окончание доступа не удаляет объявления, responses, audit и другую историю;
- downgrade ниже текущего usage запрещает новые ограниченные действия, но сохраняет чтение и действия, уменьшающие usage;
- недоступный модуль нельзя вызвать прямым API-запросом;
- organization/tenant admin видит только effective plan, период, лимиты, usage и историю своего workspace;
- только `platform_admin` управляет demo subscriptions; moderator и tenant admin не могут назначать себе план;
- platform admin не получает implicit tenant membership или private business payload;
- current authority остаётся workspace-scoped, как существующий `module_entitlements`; это не закрывает OQ-035 о нескольких tenants;
- billing provider, карты, инвойсы, платежные webhooks, реальные charge/refund и production activation отсутствуют.

## Task-level demo defaults

Wave 12 использует два synthetic preview plan version для модуля Exchange:

| Код | Отображение | Demo limits | Коммерческий статус |
|---|---|---|---|
| `exchange_free_demo_v1` | `Exchange Free — Демо` | одновременно до 1 published cargo и 1 published transport listing | Не является офертой; цена не задана |
| `exchange_plus_demo_v1` | `Exchange Plus — Демо` | одновременно до 10 published cargo и 10 published transport listings | Display price `49 900 ₸ / 30 дней — Демо`; не списывается и не является офертой |

Эти коды, числа, валюта и display price являются fixtures конкретной task. Они не закрывают OQ-037 и не могут использоваться как production pricing.

## Критерии приёмки Wave 12

- immutable demo plan versions существуют отдельно от workspace subscriptions и не редактируются задним числом;
- free workspace получает только free demo limits, paid-demo workspace — расширенные demo limits;
- direct API, роль или capability без effective entitlement не обходят серверную блокировку;
- platform admin идемпотентно активирует/заменяет/завершает demo subscription с причиной, периодом и optimistic version;
- tenant admin/moderator/client не могут назначить, продлить или сменить plan;
- usage и limits совпадают с фактическими published listings в workspace и не раскрывают чужую организацию;
- превышение лимита блокирует publish/resume, но не чтение, pause/close и историю;
- downgrade/expiry не удаляет существующие данные и audit;
- UI явно показывает demo label, effective period, limit/usage и отсутствие автоматического списания;
- в source/API/schema отсутствуют payment credentials, card data, invoice, charge, refund и billing-provider webhook;
- все изменения entitlement и subscription входят в append-only platform audit без secret/PII;
- существующие Private OS, Exchange search/responses/moderation и cross-tenant tests не регрессируют.

## Открытые вопросы, которые Wave 12 не закрывает

- OQ-037 — реальные plan names, limits, prices, currency, trial, tax, billing provider и коммерческий activation path;
- OQ-035 — участие организации в нескольких tenants и authority между organization/workspace;
- OQ-043 — раскрытие контактов и возможная связь с paid plan;
- юридическая оферта, возвраты, invoices/receipts и production subscription lifecycle.
