# Evidence manifests

Для каждой сдачи создаётся manifest:

```text
docs/12-delivery/evidence/<TASK-ID>/evidence-manifest-NN.md
```

Manifest хранит индекс доказательств, exact application commit, среду, время, роль/tenant scope, redaction и ограничения. Малые обезличенные screenshots допускаются только в явно разрешённой task папке; большие файлы остаются в согласованном artifact storage и указываются стабильной ссылкой с checksum.

Секреты, credentials, cookies, реальные персональные данные и unrestricted deployment links запрещены. Evidence не заменяет независимую проверку.

Использовать [evidence manifest template](../templates/evidence-manifest-template).
