---
layout: home

hero:
  name: EXIM Super App Product OS
  text: Карта и спецификация логистической SaaS-платформы
  tagline: Private Operating OS для логистических компаний и общая биржа грузов/транспорта — с едиными правилами, границами данных и проверяемыми требованиями.
  image:
    src: /brand/exim-mark.svg
    alt: EXIM
  actions:
    - theme: brand
      text: Открыть платформенную основу
      link: /01-foundation/super-app-platform-foundation
    - theme: alt
      text: Текущий пакет интегратору
      link: /07-mvp/foundation-gate

features:
  - title: Два продуктовых контура
    details: Приватная операционная система tenant и отдельный Exchange грузов и свободного транспорта.
  - title: Multi-tenant по умолчанию
    details: exim.kz — первый tenant, но данные, роли и модули проектируются без привязки к одной компании.
  - title: Контролируемые данные
    details: Клиентские и внутренние слои разделены на сервере; механизм связи Private OS с Exchange остаётся OQ-038.
  - title: Проверяемый релиз
    details: Foundation Gate сначала стабилизирует права и сквозной процесс, затем Exchange входит в Public Launch MVP.
---

## Текущий фокус

```text
Foundation Gate
→ роли + tenant isolation + стабильный shell
→ запрос → ставки → цена → договорный gate → перевозка → tracking
→ Exchange MVP
→ первый публичный запуск
```

| Блок | Статус |
|---|---|
| Версия Product OS | 0.5.0 — draft |
| Платформенная концепция | Подтверждена |
| exim.kz как первый tenant | Подтверждено |
| Private Operating OS | Спроектирован базовый процесс, реализация частичная |
| EXIM Exchange | Обязателен для Launch MVP, детальные правила частично TBD |
| Технический microservice | Не утверждён |
| Foundation Gate | ТЗ подготовлено |
| Live app | Ранняя alpha, аудит 2026-09-04 |
| Public Launch MVP | Подтверждён верхний состав; механика Exchange — draft/TBD |
| Bitrix | Открытый вопрос |

## Что читать по порядку

1. [Платформенная основа](/01-foundation/super-app-platform-foundation)
2. [Решения](/01-foundation/decisions)
3. [Карта приложения](/03-product-map/app-map)
4. [Реестр требований](/06-requirements/index)
5. [Foundation Gate](/07-mvp/foundation-gate)
6. [Контракты обязательных экранов Gate](/04-pages/foundation-gate-contracts)
7. [Public Launch MVP](/07-mvp/mvp-v1)
8. [Текущее состояние](/10-implementation/current-state)
9. [Открытые вопросы](/09-decisions/open-questions)
