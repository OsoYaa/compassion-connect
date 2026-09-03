# Fix the volunteer form on the Cloudflare site

## What the Resend API key is

Resend (resend.com) is the email service your forms use to deliver submissions to
brandonforever22legacy@gmail.com. The "Resend API key" is the access token from a Resend
account — created at resend.com > API Keys > Create API Key, and it looks like `re_...`.
It is stored as a secret named `RESEND_SEND_API_KEY`; nobody (including me) can read the
value back after it is saved, only replace it.

## What's happening

The form posts to `/api/public/send-contact`, which sends the email through Resend using
`RESEND_SEND_API_KEY`. That secret is not present in this project's secret store, and nothing in
the deploy workflow or Worker config supplies it to Cloudflare either. Without it the endpoint
returns an error and the form shows "Could not send. Please try again."

## What I need from you

Either:

1. The Resend API key value — I'll open a secure form for you to paste it (I never see it), and
   also wire the deploy workflow so it reaches the Cloudflare Worker on every deploy.
2. Or confirmation that you'd rather use the built-in Lovable email service or the Resend
   connector, so no manual key is needed.

If you already added the key directly in the Cloudflare dashboard, tell me and I'll instead focus
on verifying delivery and the sender address.

## What I'll change in the code

- Add a step to the deploy workflow that pushes `RESEND_SEND_API_KEY` to the Worker
  (via `wrangler secret put`, reading it from a GitHub repository secret) so the live site has it.
- Improve the failure path in `src/routes/contact.tsx`: read the endpoint's error response and show
  a specific message instead of a generic retry message.
- Log the underlying error server-side in `src/routes/api/public/send-contact.ts` so Cloudflare
  Worker logs reveal why a send failed.

## Note on the sender address

The endpoint currently sends from `onboarding@resend.dev`, which Resend allows only for tests to
your own account address. For reliable delivery, a domain should be verified in Resend and the
`from` address switched to it. Say the word and I'll include that change.
