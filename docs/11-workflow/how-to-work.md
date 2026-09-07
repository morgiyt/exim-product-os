# Как работать с Product OS

```text
Факт / запрос владельца
→ определить модуль и источник
→ решение, гипотеза или OQ
→ обновить foundation/process/map/page/status
→ создать или обновить REQ
→ связать с Foundation Gate / Launch MVP / later roadmap
→ реализация в отдельном repository
→ submission report в Product OS
→ независимый review, Preview и human acceptance
→ следующая delivery-задача
→ обновить current state без переписывания истории
```

Текущий execution scope и отчёты ведутся в [Delivery Loop](../12-delivery/README). Наличие нового Product OS документа само по себе не разрешает application work: нужна task в статусе `ready` и authoritative handoff.

## Перед ТЗ

Нужно знать:

- цель и product module;
- организация/tenant и owner данных;
- роли/capabilities и entitlement;
- основной и отрицательные сценарии;
- данные и visibility;
- статусы и история;
- ошибки;
- критерии приёмки;
- что явно не входит;
- какие OQ остаются.

## Нельзя

- смешивать Private OS и Exchange;
- считать приватный запрос публичным объявлением;
- переносить правила `exim.kz` на всех tenants;
- выдавать гипотезу за решение;
- менять исторический audit так, будто старого состояния не было;
- считать UI доказательством server RBAC;
- считать build доказательством рабочего процесса.
