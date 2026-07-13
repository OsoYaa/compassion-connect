## Add a small Donate button under Human Stories in Multimedia

Add a compact Donate button directly beneath the Human Stories video in the Multimedia section. It should link to the same destination as the "Dhuro Tani" / "Donate Now" CTA in the Dhuro section.

### What to change
1. **File:** `src/routes/index.tsx`
   - In the `#cases` / Multimedia section, after the `<VideoCategory title={t("cases.cat1.title")} videos={HUMAN_STORY_VIDEOS} />` line, add a small external `<a>` button.
   - Use the existing GoFundMe URL already present in the Dhuro section: `https://gofund.me/ddc222b6a`.
   - Use the existing translation key `t("donate.cta")` for the label so English and Albanian stay in sync.
   - Style: small, red, uppercase button with a Heart icon, aligned under the video (e.g., centered or left-aligned inside the same `max-w-3xl` column).
2. **File:** `src/lib/i18n.tsx`
   - No new keys are needed if reusing `donate.cta`. If a different label is desired, add a new key and update both `en` and `sq` dictionaries.

### Verification
- Run the build to confirm no syntax/TypeScript errors.
- Visually confirm the button appears under the Human Stories video and links to the GoFundMe URL.

### Notes
- No backend changes or new assets are required.
- The Podcast section remains hidden as a comment.