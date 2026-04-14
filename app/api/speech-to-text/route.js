import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio");

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file uploaded" }, { status: 400 });
    }

    const response = await fetch("https://api.sarvam.ai/speech-to-text", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SARVAM_API_KEY}`,
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Sarvam API Error:", error);
    return NextResponse.json({ error: "Failed to process audio" }, { status: 500 });
  }
}
