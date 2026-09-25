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

Only these two are customized. The site has no way to change an account's email,
and the "password changed" security notice is left off, so those templates
aren't used.

## Fields Supabase fills in

- `{{ .ConfirmationURL }}`: the confirm or reset link.
- `{{ .Email }}`: the account's email.
- `{{ .Data.first_name }}`: the first word of the name entered at sign-up
  ("Jane" for "Jane Smith"), saved by the site because Supabase templates can't
  split names. The greeting falls back to "Hi there," when there isn't one.

## Link expiry

The confirm and reset emails say their link "expires in an hour". That matches
Supabase's email link expiry setting; if it's ever changed in the dashboard
(Authentication → Sign In / Providers → Email), update the wording in `build.mjs`.
