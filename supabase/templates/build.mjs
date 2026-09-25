// Builds the account emails (the HTML files next to this script) from one
// shared layout, so they always match. Run: node supabase/templates/build.mjs
//
// Supabase doesn't read these files: paste each one into the dashboard
// (Authentication > Emails > Templates) with the subject from README.md.
// Template fields such as {{ .ConfirmationURL }} are filled in by Supabase.
//
// Email apps are picky, so the layout uses tables and inline styles, web-safe
// font fallbacks, and JPEG art. It mirrors the site: cream paper, an inked
// card, a ticket illustration, and a blue button with a hard ink shadow.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://allaboardplanning.com';

const C = {
  paper: '#F7F0E2', card: '#FFFDF8', ink: '#27233A', text: '#3F3A4F', muted: '#5A5468',
  blue: '#2F6CB3', rust: '#C23F35', brandText: '#23508A', line: '#E3D8C3',
};
const FONT = {
  serif: "Fraunces, Georgia, 'Times New Roman', serif",
  sans: "Figtree, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  hand: "Caveat, 'Bradley Hand', 'Segoe Print', 'Comic Sans MS', cursive",
};

// "Hi Jane," when the name is known, "Hi there," otherwise.
const HELLO = '{{ if .Data.name }}Hi {{ .Data.name }},{{ else }}Hi there,{{ end }}';

const para = (html) => `<p style="margin:0 0 16px;font-family:${FONT.sans};font-size:16px;line-height:1.6;color:${C.text};">${html}</p>`;
const small = (html) => `<p style="margin:0 0 10px;font-family:${FONT.sans};font-size:13.5px;line-height:1.55;color:${C.muted};">${html}</p>`;

function layout({ title, preheader, art, artAlt, kicker, heading, body, button, url, after }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Figtree:wght@400;600;700&family=Fraunces:opsz,wght@9..144,700&display=swap" rel="stylesheet">
<style>
  body { margin:0; padding:0; background:${C.paper}; }
  a { color:${C.brandText}; }
  @media (max-width: 480px) {
    .card-pad { padding:26px 20px 24px !important; }
    .heading { font-size:28px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.paper};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.paper};">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper};">
  <tr>
    <td align="center" style="padding:28px 14px 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
        <tr>
          <td align="center" style="padding:0 0 18px;">
            <a href="${SITE}" style="text-decoration:none;">
              <img src="${SITE}/art/logo.png" width="40" height="40" alt="" style="vertical-align:middle;border:0;border-radius:8px;">
              <span style="vertical-align:middle;font-family:${FONT.serif};font-size:22px;font-weight:700;color:${C.ink};padding-left:8px;">All Aboard <span style="font-family:${FONT.hand};font-size:25px;font-weight:700;color:${C.rust};">Planning</span></span>
            </a>
          </td>
        </tr>
        <tr>
          <td style="background:${C.card};border:2px solid ${C.ink};border-radius:18px;box-shadow:5px 5px 0 ${C.ink};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding:24px 24px 0;">
                  <img src="${SITE}/art/${art}.jpg" width="322" alt="${artAlt}" style="display:block;width:100%;max-width:322px;height:auto;border:0;">
                </td>
              </tr>
              <tr>
                <td class="card-pad" style="padding:18px 36px 32px;">
                  <p style="margin:0 0 4px;font-family:${FONT.hand};font-size:26px;font-weight:700;line-height:1.2;color:${C.brandText};">${kicker}</p>
                  <h1 class="heading" style="margin:0 0 18px;font-family:${FONT.serif};font-size:32px;font-weight:700;line-height:1.12;letter-spacing:-0.5px;color:${C.ink};">${heading}</h1>
                  ${body}
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px;">
                    <tr>
                      <td align="center" bgcolor="${C.blue}" style="background:${C.blue};border:2px solid ${C.ink};border-radius:12px;box-shadow:4px 4px 0 ${C.ink};">
                        <a href="${url}" style="display:inline-block;padding:14px 28px;font-family:${FONT.sans};font-size:17px;font-weight:700;line-height:1.2;color:#FFFFFF;text-decoration:none;border-radius:12px;">${button}</a>
                      </td>
                    </tr>
                  </table>
                  ${after}
                  <div style="border-top:2px dashed ${C.line};margin:22px 0 16px;line-height:0;font-size:0;">&nbsp;</div>
                  ${small(`Button not working? Copy this link into your browser:<br><a href="${url}" style="color:${C.brandText};word-break:break-all;">${url}</a>`)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:22px 12px 0;">
            <p style="margin:0 0 6px;font-family:${FONT.hand};font-size:21px;font-weight:700;color:${C.muted};">See you on the platform.</p>
            <p style="margin:0;font-family:${FONT.sans};font-size:12.5px;line-height:1.6;color:${C.muted};">
              All Aboard Planning &middot; free AICP exam prep &middot; <a href="${SITE}" style="color:${C.muted};">allaboardplanning.com</a><br>
              An independent study resource, not affiliated with or endorsed by APA or AICP.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
`;
}

const TEMPLATES = {
  // Authentication > Emails > Templates > "Confirm signup"
  'confirm-signup.html': layout({
    title: 'Confirm your email',
    preheader: 'One click and your seat is saved: every lesson, all three practice exams, and a dashboard that remembers where you left off.',
    art: 'email-ticket',
    artAlt: 'A yellow train ticket reading ADMIT ONE, confirm to board',
    kicker: 'Your ticket is almost ready!',
    heading: 'Confirm your email',
    body: para(HELLO) + para('Thanks for joining All Aboard Planning. Confirm your email address and your account is ready: every lesson, all three full-length practice exams, and a dashboard that remembers where you left off.'),
    button: 'Confirm my email',
    url: '{{ .ConfirmationURL }}',
    after: small('This link works once and expires soon. If it has expired, just sign up again with the same email.') + small('Didn&rsquo;t sign up? You can ignore this email and no account will be created.'),
  }),

  // Authentication > Emails > Templates > "Reset password"
  'reset-password.html': layout({
    title: 'Reset your password',
    preheader: 'Choose a new password for your All Aboard Planning account.',
    art: 'email-reissued',
    artAlt: 'A blue train ticket reading NEW TICKET, stamped REISSUED',
    kicker: 'Lost your ticket?',
    heading: 'Let&rsquo;s get you a new one',
    body: para(HELLO) + para('Someone (hopefully you) asked to reset the password for <strong>{{ .Email }}</strong>. Click below to choose a new one. Your progress stays right where you left it.'),
    button: 'Choose a new password',
    url: '{{ .ConfirmationURL }}',
    after: small('This link works once and expires soon. If it has expired, ask for a new one from the sign-in page.') + small('Didn&rsquo;t ask for this? You can ignore this email. Your password won&rsquo;t change.'),
  }),

  // Authentication > Emails > Templates > "Change email address"
  'change-email.html': layout({
    title: 'Confirm your new email',
    preheader: 'Confirm the new email address for your All Aboard Planning account.',
    art: 'email-changed',
    artAlt: 'A pink train ticket reading NEW ADDRESS, confirm the change',
    kicker: 'Changing trains?',
    heading: 'Confirm your new email',
    body: para(HELLO) + para('You asked to change your account&rsquo;s email from <strong>{{ .Email }}</strong> to <strong>{{ .NewEmail }}</strong>. Confirm below and we&rsquo;ll use the new address from now on.'),
    button: 'Confirm new email',
    url: '{{ .ConfirmationURL }}',
    after: small('Didn&rsquo;t ask for this? Ignore this email and your address stays the same.'),
  }),

  // Authentication > Emails > Templates > "Password changed" (security
  // notification; turn it on in the dashboard to send it).
  'password-changed.html': layout({
    title: 'Your password was changed',
    preheader: 'The password for your All Aboard Planning account was just changed.',
    art: 'email-reissued',
    artAlt: 'A blue train ticket reading NEW TICKET, stamped REISSUED',
    kicker: 'Quick heads-up',
    heading: 'Your password was changed',
    body: para(HELLO) + para('The password for <strong>{{ .Email }}</strong> was just changed. If that was you, you&rsquo;re all set and there&rsquo;s nothing else to do.'),
    button: 'Wasn&rsquo;t me: reset it now',
    url: `${SITE}/aicp/signin?mode=forgot`,
    after: small('If you didn&rsquo;t change it, reset your password right away using the button above.'),
  }),
};

for (const [file, html] of Object.entries(TEMPLATES)) {
  writeFileSync(join(here, file), html);
  console.log('wrote', file);
}
