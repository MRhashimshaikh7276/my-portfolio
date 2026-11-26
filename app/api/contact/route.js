import nodemailer from "nodemailer";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (data?.name || "").trim();
  const email = (data?.email || "").trim();
  const message = (data?.message || "").trim();

  // Basic validation
  if (!name || !email || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return Response.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const port = Number(SMTP_PORT) || 587;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // true for 465, false for 587 (STARTTLS)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Inquiry" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `New portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 12px">New portfolio inquiry</h2>
          <p style="margin:4px 0"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:4px 0"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin:12px 0 4px"><strong>Message:</strong></p>
          <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact email failed:", err?.message || err);
    return Response.json(
      { error: "Could not send your message. Please try again later." },
      { status: 502 }
    );
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
