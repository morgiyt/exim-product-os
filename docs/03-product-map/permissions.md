# Права и видимость

## Порядок проверки права

`session → membership → tenant scope → entitlement → role/capability → object permission`.

## Private OS: матрица данных

| Данные | Клиент | Менеджер | Логист | Руководитель | Бухгалтер | Юрист | Tenant admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Итоговая цена и клиентские услуги | Да | Да | Нет* | Да | Да | Да | Да |
| Себестоимость / внутренние ставки | Нет | Да | Да | Да | Нет | Нет | Да |
| Маржа | Нет | Да | Нет | Да | Нет | Нет | Да |
| Перевозчик и водитель | Нет | Да | Да | Да | Нет | Нет | Да |
| Внутренние этапы workflow | Нет | По этапу | По этапу | Да | По этапу | По этапу | Да |
| Опубликованные клиентские этапы | Да | Да | Просмотр | Да | Нет | Нет | Да |
| Финансы | Разрешённое | По объекту | Нет | Да | Да | По объекту | Да |
| Tenant-аудит | Нет | Свои | Свои | По полномочиям | Свои | Свои | Да |

\* Логист не получает итоговую цену вместе с себестоимостью, если из этого можно вычислить закрытую маржу. Возможные исключения — OQ-049.

## Exchange: capabilities и объекты

Wave 9/10 фиксируют listings/responses/selection, Wave 11 — task-level moderator/platform-admin boundary, Wave 12 — manual demo-plan/entitlement boundary. Contact disclosure, real billing, KYC/verified, final governance/legal/fraud rules остаются draft после OQ-036/OQ-037/OQ-039/OQ-040/OQ-043.

| Действие | Владелец объявления | Другой участник | Moderator | Platform admin |
|---|:---:|:---:|:---:|:---:|
| Читать активные публичные поля | Да | Да | Да | Да |
| Изменять объявление | Да | Нет | Только moderation action | По отдельному праву |
| Видеть отклики | Да | Только свой | По расследованию | По отдельному праву |
| Отправить отклик | Нет к своему | При capability + entitlement | Нет | Нет |
| Выбрать исполнителя | Да | Нет | Нет | Нет |
| Открыть контакты | Отключено | Отключено | Нет | Нет |
| Подать жалобу | Нет к своему | Да к public target | Нет | Нет |
| Restrict/unrestrict объявление | Нет | Нет | Да | Да |
| Suspend/restore organization в Exchange | Нет | Нет | Нет | Да |
| Читать platform audit | Нет | Нет | Только свои доступные cases | Да |
| Читать свой effective demo plan/usage | Через свой tenant-admin context | Через свой tenant-admin context | Нет | Да |
| Активировать/заменить demo plan | Нет | Нет | Нет | Да |

## Создание объектов

| Объект | Кто создаёт |
|---|---|
| Organization | По onboarding-правилу OQ-034 |
| Tenant company/client | Менеджер или разрешённый tenant user |
| QuoteRequest | Менеджер или клиент tenant |
| RateQuote | Логист |
| Shipment | Менеджер после договорного gate |
| CargoListing | Участник с capability и entitlement |
| TransportListing | Участник с capability и entitlement |
| ExchangeResponse | Разрешённый участник другой стороны |
| Exchange abuse report | Active Exchange participant на чужой public target |
| Moderation case/action | Moderator или platform admin по Wave 11 contract |
| Demo plan version | Seed/migration task-level catalog; после activation immutable |
| Workspace subscription/entitlement change | Platform admin по Wave 12 contract |
| Workflow template | По tenant/platform модели OQ-030, OQ-044 |

## Правила

1. Права проверяются сервером.
2. Поиск и аналитика не расширяют доступ.
3. Роль действует только внутри соответствующего membership.
4. Entitlement обязателен независимо от роли.
5. Клиентские и публичные DTO не содержат staff-only поля.
6. Связь Private OS с Exchange не реализуется до OQ-038; отдельное действие с allowlist и аудитом — предлагаемый safe default.
7. Изменение роли, membership и entitlement фиксируется.
8. Platform admin и tenant admin логически разделены.
9. Plan/entitlement не выдаёт membership, role или organization capability; billing/charge отсутствуют до отдельного решения.

Подробнее: [Безопасность и изоляция данных](./security-and-data-isolation).
