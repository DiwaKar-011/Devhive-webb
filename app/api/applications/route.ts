import { NextResponse } from "next/server";

type ApplicationPayload = {
  name?: string;
  email?: string;
  roleInterest?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ApplicationPayload;
  const name = body.name?.trim();
  const email = body.email?.trim();
  const roleInterest = body.roleInterest?.trim();
  const message = body.message?.trim();

  if (!name || !email || !roleInterest || !message) {
    return NextResponse.json({ message: "Please fill all fields before submitting." }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        message: "Server is missing GOOGLE_SHEETS_WEBHOOK_URL configuration.",
      },
      { status: 500 },
    );
  }

  if (!webhookUrl.includes("/exec")) {
    return NextResponse.json(
      {
        message: "GOOGLE_SHEETS_WEBHOOK_URL must be a deployed Apps Script Web App URL ending with /exec.",
      },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        roleInterest,
        message,
        submittedAt: new Date().toISOString(),
      }),
      cache: "no-store",
      redirect: "follow",
    });

    const responseText = await response.text();
    const contentType = response.headers.get("content-type") || "";
    const isHtmlResponse = contentType.includes("text/html") || /<html/i.test(responseText);

    if (isHtmlResponse) {
      return NextResponse.json(
        {
          message:
            "Google Sheets webhook returned an HTML page (usually invalid URL or non-public deployment). Redeploy Apps Script as Web App and set access to Anyone, then use the /exec URL.",
        },
        { status: 502 },
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          message: `Google Sheets webhook error: ${responseText || "Unknown error"}`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: "Application submitted successfully." }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        message: "Could not reach Google Sheets webhook.",
      },
      { status: 502 },
    );
  }
}
