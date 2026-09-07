# Текущая задача

> Этот файл меняет task curator. Исполнитель читает его, но не переключает активную задачу самостоятельно.

| Поле | Значение |
|---|---|
| Current task | `TASK-2026-001` |
| Название | Foundation Gate — безопасный Private OS core |
| Revision | `1` |
| Статус | `ready` |
| Implementation write gate | `exact_application_identifiers_required_at_runtime` |
| Owner authorization | Поручение на первое задание подтверждено 2026-09-07; scope выбран task curator, D-084 |
| Task | [TASK-2026-001](./tasks/TASK-2026-001-foundation-gate) |
| Product OS ref | `product-os-task-2026-001-r1` |
| Application repository | Обязательное точное значение в implementation handoff |
| Target | Application PR + Preview; production запрещён |
| Исполнитель | Интегратор + Claude Code |
| Reviewer | Codex / назначенный независимый reviewer |
| Acceptance authority | Владелец продукта или явно назначенный им человек |
| Активная сдача | Нет |
| Следующее действие | Заполнить handoff, выполнить read-only preflight; при совпадении сразу начать реализацию |
| Папка отчётов | [reports/TASK-2026-001](./reports/TASK-2026-001/README) |

## Условие немедленного старта

Claude не ждёт второго разрешения, если одновременно выполнено всё ниже:

- в сообщении передачи указаны точные `APPLICATION_REPO`, `APPLICATION_BASE_BRANCH`, immutable `APPLICATION_EXPECTED_HEAD`, совпадающий `PR_TARGET`, точный non-production `TARGET_ENVIRONMENT`, `DEPLOYMENT_LINKAGE`, `TEST_DATA` и безопасный способ получить `TEST_ACCOUNTS`;
- Product OS tag разрешается и рабочее дерево Product OS чистое;
- application checkout имеет ровно ожидаемый `origin`, baseline и чистое дерево;
- найдены инструкции и штатные команды самого приложения;
- доступна указанная Preview/staging/test среда и способ развернуть в ней exact application commit;
- отсутствуют противоречия, требующие нового бизнес-решения.

Если хотя бы одно условие не выполнено, разрешён только preflight и blocker report — не запись в код.
