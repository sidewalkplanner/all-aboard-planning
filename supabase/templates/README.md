# Account emails

Branded versions of the emails Supabase sends. They share one layout, built by
`build.mjs` (run `node supabase/templates/build.mjs` after editing it; don't edit
the `.html` files by hand). The ticket illustrations come from
`web/art/scenes/email.mjs` (`npm run art -- email-` in `web/`) and are served
from `https://allaboardplanning.com/art/email-*.jpg`, so they must be deployed
before the templates are used.

## Installing them

Supabase doesn't read these files. In the Supabase dashboard, open the
**all-aboard-planning** project, go to **Authentication → Emails → Templates**,
and for each row below paste the subject, then replace the whole message body
with the contents of the file (switch the editor to source/HTML if it offers a
choice). Save each one.

| Dashboard template | Subject | File |
|---|---|---|
| Confirm signup | `Confirm your email to board All Aboard Planning` | `confirm-signup.html` |
| Reset password | `Reset your All Aboard Planning password` | `reset-password.html` |
| Change email address | `Confirm your new email for All Aboard Planning` | `change-email.html` |
| Password changed (security notification; turn it on to send it) | `Your All Aboard Planning password was changed` | `password-changed.html` |

The site doesn't offer email changes yet, so the change-email template is only
there for when it does.

## Fields Supabase fills in

- `{{ .ConfirmationURL }}`: the confirm or reset link.
- `{{ .Email }}`, `{{ .NewEmail }}`: the account's email (and the new one, for changes).
- `{{ .Data.name }}`: the name entered at sign-up. The greeting falls back to
  "Hi there," when there isn't one.
