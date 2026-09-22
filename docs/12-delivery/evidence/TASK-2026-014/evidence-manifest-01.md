---
manifest_id: EVID-TASK-2026-014-01
task_id: TASK-2026-014
submission_id: SUB-TASK-2026-014-01
app_commit: 2bbacac6b5db313dcc25d11d9be358a4fb6df561
report_commit: 654e813ed837efe015feacfa8d302d8b6e85d4f9
created_at: 2026-09-22T11:50:37+05:00
---

# Evidence manifest TASK-2026-014

| Evidence ID | AC ID | Что доказывает | Среда | Ограничения |
|---|---|---|---|---|
| EVID-014-01 | AC-014-01…06, 08…14 | 101/101 tests, typecheck, lint, local production build и exact Docker build PASS | local + managed image build | independent rerun pending |
| EVID-014-02 | AC-014-01…04, 12, 14 | Migration `0014` applied once; reapply `Already applied`; ledger `0001…0014`; две immutable demo versions | managed preview PostgreSQL 16 | forward-only migration |
| EVID-014-03 | AC-014-03…12, 14 | Multi-role API smoke: platform-admin lifecycle, moderator/tenant denial, free/plus limits, schedule, end, cleanup и baseline restore | public managed preview, synthetic accounts | implementation evidence |
| EVID-014-04 | AC-014-09, 11, 13, 14 | Manager dashboard и tenant-admin plan page; demo disclaimer, usage/history; 390 px no overflow; console clean | managed preview Chromium | 360/375 covered by regression suite |
| EVID-014-05 | AC-014-01, 02, 08, 12, 14 | Backup checksum и isolated network-none restore: 14 migrations, 2 plan versions, subscriptions/events/entitlements | managed host PostgreSQL 16 | backup stored on same host |
| EVID-014-06 | AC-014-14 | Runtime/image/symlink match; web/db healthy; Hub и Daily remained healthy | managed host | point-in-time evidence |
| EVID-014-07 | AC-014-03, 04, 14 | Anonymous app redirect, same-origin validation 400, foreign-origin rejection 403 | public preview | does not replace role E2E |
| EVID-014-08 | AC-014-11 | Tests assert absence of payment/card/invoice/charge/refund/webhook and false paid state; visible demo-only copy | exact source + preview | no production commercial approval |
| EVID-014-09 | AC-014-14 | Private PR #11 targets TASK-2026-013; application CI push/PR and coordination guard PASS | private GitHub | independent review pending |

## Integrity

- Runtime commit: `2bbacac6b5db313dcc25d11d9be358a4fb6df561`.
- Application report head: `654e813ed837efe015feacfa8d302d8b6e85d4f9`.
- Image digest: `sha256:787179295814c45cadc0c3d71bed57cfa4808bcf253c234aad9e7b9645a839bf`.
- Preview: <https://superapp.185-129-49-242.sslip.io/exchange/plan>.
- Application PR: <https://github.com/morgiyt/exim-super-app/pull/11>.
- Credentials, cookies, tokens, account emails, environment values, raw payload IDs and backup contents are not included.
