import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const RESEND_URL = "https://api.resend.com/emails";
const RECIPIENT = "brandonforever22legacy@gmail.com";

const fieldSchema = z.object({
  subject: z.string().min(1).max(300),
  rows: z
    .array(
      z.object({
        label: z.string().min(1).max(100),
        value: z.string().max(5000),
      }),
    )
    .min(1)
    .max(20),
  replyTo: z.string().email().max(254).optional(),
});

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const Route = createFileRoute("/api/public/send-contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const RESEND_SEND_API_KEY = process.env.RESEND_SEND_API_KEY;
        if (!RESEND_SEND_API_KEY) {
          return new Response("RESEND_SEND_API_KEY is not configured", { status: 500 });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const parsed = fieldSchema.safeParse(body);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        const { subject, rows, replyTo } = parsed.data;

        const html = `
          <div style="font-family: Arial, sans-serif; color: #111;">
            <h2 style="margin:0 0 16px;">${esc(subject)}</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
              ${rows
                .map(
                  (r) => `
                <tr>
                  <td style="padding:8px 12px; border:1px solid #e5e5e5; background:#fafafa; font-weight:bold; vertical-align:top;">${esc(r.label)}</td>
                  <td style="padding:8px 12px; border:1px solid #e5e5e5; white-space:pre-wrap;">${esc(r.value || "—")}</td>
                </tr>`,
                )
                .join("")}
            </table>
          </div>`;

        const res = await fetch(RESEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_SEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Forever Brandon Legacy <onboarding@resend.dev>",
            to: [RECIPIENT],
            subject,
            html,
            ...(replyTo ? { reply_to: replyTo } : {}),
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          return new Response(
            JSON.stringify({ error: `Email send failed (${res.status}): ${text}` }),
            { status: 502, headers: { "Content-Type": "application/json" } },
          );
        }

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});