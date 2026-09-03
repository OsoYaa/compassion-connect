# Fix the volunteer form on the Cloudflare site

## What's happening

The form posts to the server endpoint `/api/public/send-contact`, which sends the email through Resend using a secret key named `RESEND_SEND_API_KEY`.

In the Lovable preview, that key is provided automatically, so the form works. The Cloudflare deployment never receives it: the deploy workflow and the Worker config contain no reference to `RESEND_SEND_API_KEY`. Without it the endpoint returns an error, and the form shows "Could not send. Please try again."

## What I need from you

One of these:

1. Add the secret yourself in the Cloudflare dashboard: Workers & Pages > `compassion-connect` > Settings > Variables and Secrets > add secret `RESEND_SEND_API_KEY` with your Resend API key value. Then redeploy (or just push once). This is the fastest fix and I need nothing else.
2. Or, if you prefer it automated on every deploy, add your Resend API key as a GitHub repository secret named `RESEND_SEND_API_KEY`, and I'll wire the deploy workflow to upload it to the Worker automatically.

Either way, tell me which one you pick — I never see the key value itself.

## What I'll change in the code

- Add a secret-upload step to `.github/workflows` (only if you choose option 2) so `RESEND_SEND_API_KEY` is pushed to the Worker on each deploy via `wrangler secret put`.
- Improve the failure path in `src/routes/contact.tsx`: read the endpoint's error response and show a clearer message (e.g. "Email service not configured") instead of a generic retry message, so this class of problem is visible rather than silent.
- Log the underlying error server-side in `src/routes/api/public/send-contact.ts` so Cloudflare Worker logs show why a send failed.

## Note on the sender address

The endpoint sends from `onboarding@resend.dev`, which Resend only allows for testing and only to your own account address. If delivery still fails after the secret is set, the next step is verifying your own domain in Resend and switching the `from` address. Say the word and I'll include that change.
