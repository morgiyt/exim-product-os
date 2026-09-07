# Отчёты исполнителя

## Куда сдавать

Для каждой задачи создаётся отдельная папка:

```text
docs/12-delivery/reports/<TASK-ID>/submission-01.md
docs/12-delivery/evidence/<TASK-ID>/evidence-manifest-01.md
```

Исполнитель создаёт в Product OS отдельную branch `report/<TASK-ID>/submission-NN` либо `report/<TASK-ID>/blocker-NN` и PR в `main`. В этом PR разрешены только новые (`A`) `submission-NN.md`, `blocker-NN.md`, `addendum-NN.md`, matching evidence manifest и явно разрешённые обезличенные artifacts. Любые `M/D/R`, application code, изменения REQ/task/registry/current task/README, `review-*`, `acceptance*` и generated build output запрещены.

Если preflight остановился до реализации, вместо submission создаётся `reports/<TASK-ID>/blocker-NN.md` по [blocker template](../templates/blocker-template). После устранения причины blocker не удаляется: фактический старт и последующая сдача получают отдельные файлы.

## Что означает submission

Submission — подробное заявление интегратора о выполненной работе. Допустимые результаты в его AC-матрице:

- `PASS_BY_IMPLEMENTER`;
- `FAIL`;
- `NOT_RUN`;
- `MANUAL_REQUIRED`;
- `BLOCKED`.

Исполнитель не пишет просто `PASS`, `VERIFIED` или `ACCEPTED`, потому что это статусы независимой проверки и человека.

## Обязательный состав

- task ID/revision и Product OS ref;
- application repo/branch/commit/PR;
- Preview URL и доказательство соответствия commit;
- baseline и список реально изменённых областей;
- миграции, данные и rollback;
- точные команды проверок и полные результаты;
- AC-матрица;
- role/tenant/client-company matrix;
- regression;
- известные дефекты и ограничения;
- все failed, skipped и not-run проверки;
- evidence manifest;
- blockers с владельцем и следующим действием;
- явная декларация «это отчёт исполнителя, не приёмка».

## Неизменяемость

С первого открытия report PR конкретный submission/blocker и matching evidence append-only. Существенные исправления создают `submission-02` и новый manifest. Фактическая опечатка исправляется отдельным `addendum-NN.md` со ссылкой на исходный файл и причиной. Если application PR head или Preview commit изменился после submission, требуется новый attempt.

## Безопасность

Запрещено коммитить:

- токены, cookies, пароли, `.env`, OAuth codes и private keys;
- реальные персональные данные;
- credentials тестовых аккаунтов;
- необработанные логи с секретами;
- shareable deployment links, если они дают неограниченный доступ.

В отчёте используются labels ролей/tenant, редактированные screenshots и стабильные CI/PR URLs. Большие видео и логи остаются в разрешённом artifact storage; manifest хранит ссылку, timestamp, commit и checksum.

Использовать [submission template](../templates/submission-template) и [evidence template](../templates/evidence-manifest-template).

## Review и acceptance

- Независимый reviewer, который не совпадает с implementer/submitted_by, добавляет `review-NN.md` отдельным reviewer PR.
- Human acceptance authority, не совпадающая с implementer, принимает решение в `acceptance.md`; AI оставляет решение `pending`.
- Task curator атомарно синхронизирует canonical task frontmatter, `current-task.md`, registry и history отдельным control PR либо в том же reviewer/acceptance PR, если сам выполняет эту роль.
