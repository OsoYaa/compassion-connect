# Finish the Resend form fix

The endpoint and GitHub workflow are already wired to `RESEND_API_KEY`. The remaining work is to make the deployment fail clearly if that secret is unavailable, rather than silently deploying a form that cannot send email.

## Changes

1. Standardize the contact endpoint on `RESEND_API_KEY` while retaining the previous variable name only as a compatibility fallback.
2. Update the Cloudflare deployment workflow so a missing `RESEND_API_KEY` stops the deployment with a clear error instead of skipping secret synchronization.
3. Keep the key server-only and never place its value in source code, logs, or browser code.
4. Verify the project build and the form endpoint behavior after the workflow change.

## Deployment

Because `RESEND_API_KEY` is now present in GitHub repository secrets, the next run of the deployment workflow will securely copy it to the `compassion-connect` Worker. No additional key entry is required in the codebase.

## Delivery note

The endpoint currently sends from Resend's `onboarding@resend.dev` test address. This works only within Resend's testing restrictions. If Resend rejects the recipient after the key is deployed, the follow-up fix will be to verify a sending domain in Resend and use an address on that domain.