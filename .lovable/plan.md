# Fix the volunteer/contact form on the Cloudflare site

The form works in the Lovable preview but fails on your Cloudflare-hosted site, because the email key lives in Lovable's secret store and the Cloudflare Worker has no copy of it. The endpoint then errors and no email is sent.

There is also a name mismatch: you saved the key as `RESEND_API_KEY`, while the form code looks for a differently named variable.

## What I will change

1. The email endpoint reads the key from `RESEND_API_KEY`, keeping the old name as a fallback so nothing breaks.
2. The deploy workflow gains a step that pushes the key to the Cloudflare Worker on every deploy, so it stays in place automatically from then on.
3. If the key is ever missing, the form shows a clear message instead of failing silently.

## The one manual step

Since the key value is stored encrypted and can't be read back by me, it has to be given to Cloudflare once. Easiest option, chosen by default:

- In GitHub, go to the repository's Settings → Secrets and variables → Actions → New repository secret, name it `RESEND_API_KEY`, and paste your Resend key.

After that, every deploy carries the key over on its own. If you'd rather skip GitHub, you can instead add a secret called `RESEND_API_KEY` directly on the Worker in Cloudflare (Workers & Pages → compassion-connect → Settings → Variables and Secrets) — the code change works either way.

## Note on the sender address

The form sends from Resend's shared test address, which Resend only reliably delivers to the Resend account owner's own email. If messages to brandonforever22legacy@gmail.com still don't arrive once the key is in place, the next step is verifying your domain in Resend and sending from it. I'll flag this after we test.

## Technical details

- `src/routes/api/public/send-contact.ts`: key read becomes `process.env.RESEND_API_KEY ?? process.env.RESEND_SEND_API_KEY`.
- `.github/workflows/deploy.yml`: new step after build —
  `echo "$RESEND_API_KEY" | npx wrangler@latest secret put RESEND_API_KEY --name compassion-connect`, with `RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}` in `env`, skipped when the secret is empty.
- `wrangler.json` unchanged; secrets are not declared there.
