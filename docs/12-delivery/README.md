# Delivery Loop — задания, отчёты и приёмка

## Назначение

Этот раздел превращает развитие EXIM Super App в повторяемый version-controlled цикл:

```text
утверждённая задача
→ preflight двух репозиториев
→ реализация в application repo
→ submission report в Product OS
→ независимая проверка
→ исправления или человеческая приёмка
→ следующая задача
```

Цикл повторяется столько раз, сколько требуется продукту. Каждый проход имеет отдельный `TASK-*`, точные commits, доказательства и решение о приёмке. Новый пакет не стирает историю предыдущего.

## Где находится истина

1. [Текущая задача](./current-task) указывает единственный активный пакет.
2. Файл в `tasks/` фиксирует scope, связанные REQ и критерии.
3. Product OS baseline фиксируется immutable Git tag вида `product-os-task-YYYY-NNN-rN`.
4. Реализация существует только в подтверждённом application repository.
5. `submission-*` содержит заявление исполнителя, но не является независимой проверкой.
6. `review-*` содержит результат проверки.
7. `acceptance.md` содержит только человеческое решение о приёмке.

## Роли и полномочия

| Роль | Может | Не может |
|---|---|---|
| Владелец продукта | Утвердить scope, waiver, приёмку и следующий приоритет | Подменять отсутствие доказательств словом «готово» |
| Task curator | Создать/версионировать task, синхронизировать status mirrors, подготовить следующий пакет | Самостоятельно менять подтверждённый бизнес-смысл или выдавать review за работу другого actor |
| Интегратор + Claude Code | Реализовать task, создать application PR, сдать submission и evidence | Самостоятельно принять свою работу или расширить scope |
| Independent reviewer | Проверить exact report/app commit/Preview и записать review | Совпадать с implementer/submitted_by или переписывать submission |
| Human acceptance authority | Принять либо отклонить проверенную сдачу | Принимать неизвестный commit или непроверенный Preview |

## Статусы

```text
proposed → ready → in_progress → submitted → in_review → ready_for_acceptance → accepted
in_review → changes_requested → in_progress
ready_for_acceptance → changes_requested → in_progress

ready | in_progress | submitted | in_review | changes_requested → blocked
blocked → последнее подтверждённое нетерминальное состояние
owner: proposed | ready | changes_requested | ready_for_acceptance | blocked → cancelled | superseded
```

- `proposed` — идея ещё не разрешена к реализации.
- `ready` — scope и AC утверждены; это не разрешение записи, пока authoritative handoff и preflight не прошли.
- `in_progress` — baseline подтверждён, работа началась.
- `submitted` — валидный submission report и evidence manifest приняты merge в Product OS.
- `in_review` — reviewer проверяет тот же app commit и Preview.
- `changes_requested` — нужны исправления или доказательства.
- `ready_for_acceptance` — независимая проверка завершена, ожидается человек.
- `accepted` — только человеческая приёмка.
- `blocked` — указан blocker, его владелец и следующее действие.
- `cancelled` — владелец остановил задачу без замены.
- `superseded` — владелец заменил задачу новой revision/task.

Исправимая отрицательная human decision возвращает задачу в `changes_requested`. `accepted`, `cancelled` и `superseded` — терминальные статусы.

Blocker report и task history обязаны хранить `blocked_from`. После устранения причины curator возвращает задачу только в это последнее подтверждённое нетерминальное состояние либо владелец переводит её в `cancelled`/`superseded`.

## Канонический статус и его writer

- Канонический статус находится во frontmatter task-файла; `current-task.md` и `task-registry.md` — обязательные зеркала.
- Только task curator меняет статус. Он обновляет task frontmatter, history, current task и registry одним control PR/commit.
- Submission/blocker исполнителя лишь запрашивает переход; исполнитель не редактирует status mirrors.
- `submitted` наступает после merge валидного report PR. `in_review` и итог review фиксируются отдельным reviewer/control PR.
- При временном расхождении до исправления действует task frontmatter, а curator обязан устранить рассинхронизацию до следующего перехода.

## Граница репозиториев

### Product OS

Во время implementation-run канонические файлы Product OS строго read-only. Исполнитель не меняет foundation, REQ, task, registry, lockfile или навигацию и не добавляет сюда код приложения.

Единственное разрешённое изменение исполнителя — отдельный additive-only report PR с новыми файлами:

- `docs/12-delivery/reports/<TASK-ID>/submission-NN.md`, `blocker-NN.md` или `addendum-NN.md`;
- `docs/12-delivery/evidence/<TASK-ID>/evidence-manifest-NN.md`;
- `docs/public/delivery-evidence/<TASK-ID>/...`, только если task разрешает небольшие обезличенные artifacts.

Исполнитель не создаёт и не меняет `review-*`, `acceptance*`, task, registry, current task, README или существующие отчёты. Reviewer не может совпадать с implementer/submitted_by. Acceptance authority не может совпадать с implementer этой сдачи.

Reviewer и acceptance authority добавляют только свои artifacts; task curator отдельно синхронизирует статусы и следующую задачу.

### Application repository

Все кодовые изменения, миграции и application tests выполняются только в checkout, чей `origin`, base branch и baseline совпали с authoritative handoff. Название папки, Vercel URL или другой EXIM-репозиторий не являются доказательством правильной цели.

Если application repository не назван точно, найдено несколько кандидатов, worktree грязный или remote/ref не совпали — Claude останавливается до записи и сдаёт preflight blocker. Запрещено создавать новый scaffold или новый repository по догадке.

## Правило сдачи

1. Application PR и report PR — разные поставки.
2. Report фиксирует точный app commit и Preview этого же commit.
3. Build/lint не заменяют role, tenant и end-to-end проверки.
4. Непройденные проверки не удаляются и не скрываются.
5. С первого открытия submission/blocker PR каждый numbered attempt и его evidence append-only: разрешены только Git-статусы `A` по whitelist, без `M/D/R`. Исправление создаёт следующий numbered attempt; фактическая опечатка — отдельный `addendum-NN.md` со ссылкой на исходник.
6. Изменение head commit application PR или Preview после submission всегда требует нового numbered attempt и manifest.
7. Merge application PR и production deploy сами по себе не означают `accepted`.
8. Production deploy требует отдельного явного разрешения.

## Запрет само-приёмки

- Интегратор и Claude запрашивают только `in_progress`, `blocked` или `submitted`; канонический переход записывает curator.
- Reviewer рекомендует `changes_requested`, `blocked` или `ready_for_acceptance`; канонический переход записывает curator.
- Только указанная human acceptance authority может поставить `accepted`.
- AI может подготовить draft acceptance, но оставляет `decision: pending` и не заполняет `decided_by`, `decided_by_role`, `decided_at`.
- Если независимая проверка недоступна, состояние остаётся `submitted`/`in_review` либо переходит в `blocked`; `ready_for_acceptance` без завершённого независимого review запрещён.

## Следующая итерация

Draft следующего `TASK-*` можно подготовить после review, но сделать его `ready` и переключить `current-task` можно только после человеческого `accepted`, `cancelled` или `superseded` текущей задачи. Если найдены дефекты текущего scope, сначала оформляется `changes_requested` или отдельная bug-fix task. Новые продуктовые функции не подмешиваются в незакрытую задачу молча.

Шаблоны:

- [задача](./templates/task-template);
- [submission report](./templates/submission-template);
- [preflight blocker](./templates/blocker-template);
- [evidence manifest](./templates/evidence-manifest-template);
- [review](./templates/review-template);
- [acceptance](./templates/acceptance-template).
