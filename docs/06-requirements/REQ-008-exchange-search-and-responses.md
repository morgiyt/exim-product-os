# REQ-008 — Поиск, сохранённые поиски, отклики и выбор

## Статус и цель

**Статус:** task-ready baseline для Full Product / Wave 10; финальные коммерческие поля, ranking и раскрытие контактов остаются открытыми вопросами.<br>
**Цель:** провести две независимые организации от поиска опубликованного объявления до зафиксированного выбора другой стороны, не превращая платформу в участника сделки и не раскрывая контакты до отдельного решения.

## Основной сценарий Wave 10

1. Участник с активной membership и Exchange entitlement выбирает поиск грузов или транспорта.
2. Применяет типизированные фильтры, открывает карточку и при желании сохраняет собственный поиск.
3. `tenant_admin` организации-ответчика отправляет один независимый отклик по разрешённой capability.
4. Владелец объявления видит только отклики к своему объявлению, добавляет отклик в shortlist, отклоняет либо выбирает ровно один.
5. Автор отклика видит только свой отклик и его безопасное состояние; при отсутствии выбора может отозвать его.
6. Выбор создаёт `ExecutorSelection`, фиксируется в аудите и прекращает приём новых откликов по объявлению.
7. Контакты остаются закрыты: `ContactAccessEvent` не создаётся до решения OQ-043.
8. Дальнейшая договорённость происходит между участниками вне платформы; принятие отклика не создаёт договор, платёж, гарантию или ответственность платформы.

## Поиск и сохранённые поиски

- поиск возвращает только `published`, неистёкшие и невыбранные объявления разрешённого типа;
- server-side фильтры: направление, диапазон дат, один или несколько transport modes и типизированные параметры из публичного allowlist;
- pagination cursor-based; неизвестные filter/sort keys отклоняются;
- task-level порядок Wave 10: релевантность точных структурированных совпадений, затем `published_at DESC`, затем стабильный ID. Это безопасный deterministic default, а не закрытие OQ-045;
- сохранённый поиск принадлежит membership пользователя внутри organization/workspace, хранит только allowlisted filter JSON, название и тип объявления;
- saved search не запускает внешнюю рассылку, email/push или background matching; это отдельные будущие задачи;
- чужие и cross-tenant saved searches недоступны по списку и direct ID.

## Отклики и выбор

- на CargoListing отвечает организация с `transport_publisher`; на TransportListing — с `cargo_publisher`;
- одна организация не отвечает на собственное объявление;
- Wave 10 mutation actor — `tenant_admin`; окончательная organization governance остаётся OQ-034…036;
- один active response на одну пару listing + responding organization; повтор команды идемпотентен;
- response содержит только краткое публичное сообщение без цены, телефона, email, URL, мессенджера, реквизитов, документов и private object IDs;
- lifecycle Wave 10: `submitted → shortlisted → selected | rejected`; `submitted | shortlisted → withdrawn`; прямые пропуски, повторный выбор и возврат из финала запрещены;
- shortlist не гарантирует выбор; `selected` означает только зафиксированный выбор для дальнейшего общения;
- selection уникален для listing и создаётся транзакционно вместе с финальным response status и audit; остальные `submitted`/`shortlisted` responses того же listing переходят в `rejected` с системной причиной «Выбран другой отклик»;
- после selection listing получает task-level `matched`, исчезает из публичного поиска и не принимает новые responses; owner surfaces и history сохраняются;
- автор может отозвать только собственный неокончательный response; owner может shortlist/reject/select только response своего listing;
- чужие responses, responder organization IDs, membership IDs и закрытые payload не раскрываются третьим сторонам.

## Контакты и нейтральность платформы

- email, телефон, URL, BIN/реквизиты и мессенджеры отсутствуют во всех search/response/selection payload;
- тексты с contact-like значениями server-rejected до сохранения;
- `selected` не открывает контакты автоматически и не создаёт `ContactAccessEvent`;
- UI явно говорит: «Платформа не является стороной сделки. Контакты пока не раскрываются»;
- коммерческие торги, ставки, договор, оплата, претензии и споры не входят в Wave 10.

## Критерии приёмки

- два tenant и минимум две независимые Exchange organizations проходят поиск, response, shortlist и selection на synthetic data;
- search/filter/pagination детерминированы, не возвращают owner-only или недоступные listings и не расширяют tenant/private scope;
- saved searches изолированы по membership/organization/workspace;
- capability, entitlement, actor, ownership, self-response, listing status и duplicate проверяются сервером;
- чужие responses и selections недоступны через UI, direct URL и прямой API;
- закрытые/paused/expired/matched listings не принимают новый response;
- lifecycle, optimistic version, idempotency и append-only audit подтверждены;
- selection не раскрывает контакты и не создаёт договор/платёж/гарантию платформы;
- стабильные URL, Reload, Back/Forward, keyboard, Retry и mobile 360/375/390 проходят на search/response surfaces;
- existing Private OS и Wave 9 listing tests не регрессируют.

## Открытые вопросы, которые Wave 10 не закрывает

- OQ-034…036 — финальные organization roles и governance;
- OQ-039…041 — moderation, юридическая формулировка, претензии и fraud;
- OQ-040 — финальные коммерческие поля, сроки и повторные публикации;
- OQ-042 — отраслевые поля modes сверх текущего validated baseline;
- OQ-043 — когда и кому открывать контакты;
- OQ-045 — продуктовый ranking и его сигналы.

**Выход:** две независимые организации безопасно проходят Exchange interaction до выбора без контактов и без участия платформы в сделке.
