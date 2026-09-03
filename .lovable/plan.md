# Fix the volunteer/contact form on the Cloudflare site

The form works in the Lovable preview but fails on the Cloudflare-hosted site because the email key lives in Lovable's secret store, and Cloudflare's Worker has no copy of it. The endpoint then returns a 500 and no email is sent.

You have now saved the key as `RESEND_API_KEY`, while the endpoint currently looks for a differently named variable. Both issues get fixed together.

## What will change

1. The email endpoint will read the key from `RESEND_API_KEY` (with the old name still accepted as a fallback, so nothing breaks).
2. If the key is missing, the form will show a clear message instead of a silent failure.

## What you need to do (one-time, on Cloudflare)

The Worker needs the same key. Two options:

- Cloudflare dashboard: Workers & Pages → `compassion-connect` → Settings → Variables and Secrets → add a **Secret** named `RESEND_API_KEY` with your Resend key as the value. Then re-deploy (or just save — secrets apply immediately).
- Or via GitHub: add repository secret `RESEND_API_KEY`, and I extend the deploy workflow to push it to the Worker automatically on every deploy (`wrangler secret put`). This keeps future deploys self-sufficient.

Tell me which route you prefer; option 2 requires you to add the GitHub secret, and I do the wiring.

## Note on the sender address

The form currently sends from `onboarding@resend.dev`. Resend only reliably delivers that sender to the Resend account owner's own verified email. If submissions to `brandonforever22legacy@gmail.com` still don't arrive after the key is in place, the fix is to verify a domain in Resend and send from it. I can flag this once we test.

## Technical details

- `src/routes/api/public/send-contact.ts`: `process.env.RESEND_API_KEY ?? process.env.RESEND_SEND_API_KEY`.
- Optional workflow step in `.github/workflows/deploy.yml` after build:
  `echo "$RESEND_API_KEY" | npx wrangler secret put RESEND_API_KEY --name compassion-connect`.
- No changes to `wrangler.json` (secrets are not declared there).
