const TYPE_LABELS = {
  private: "Private Lounge Reservation",
  b2b: "B2B Hospitality Consulting",
  other: "General Enquiry",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request, env) {
  let data;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body" }, 400);
  }

  const { name, entity, email, type, message, hp } = data || {};

  // Honeypot: bots fill every field, humans never see this one.
  if (hp) {
    return jsonResponse({ ok: true });
  }

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ ok: false, error: "Please provide a valid name and email." }, 400);
  }

  const enquiryType = TYPE_LABELS[type] || "General Enquiry";
  const html = `
    <h2>New enquiry from cnxcigars.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Company / Property:</strong> ${escapeHtml(entity || "-")}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Enquiry Type:</strong> ${escapeHtml(enquiryType)}</p>
    <p><strong>Message:</strong><br>${escapeHtml(message || "-").replace(/\n/g, "<br>")}</p>
  `;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "CNX Cigars Website <enquiries@cnxcigars.com>",
      to: ["info@cnxcigars.com"],
      reply_to: email,
      subject: `New Enquiry: ${enquiryType} - ${name}`,
      html,
    }),
  });

  if (!resendRes.ok) {
    return jsonResponse({ ok: false, error: "Could not send enquiry, please try again." }, 502);
  }

  return jsonResponse({ ok: true });
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}
