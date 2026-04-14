import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log("🔹 Received message:", message);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("❌ Missing GEMINI_API_KEY in .env.local");
    }

    // ✅ Initialize Gemini with the correct API version
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash", // ✅ Use the fully qualified model name
    });

    // ✅ Create the prompt
    const prompt = `
    You are an AI medical assistant for CareMate.
    The patient said: "${message}"
    
    From the following list of medical specializations:
    General Medicine, Cardiology, Dermatology, Endocrinology,
    Gastroenterology, Neurology, Obstetrics & Gynecology, Oncology,
    Ophthalmology, Orthopedics, Pediatrics, Psychiatry, Pulmonology,
    Radiology, Urology, Other.

    Suggest which doctor the patient should consult.
    Respond naturally and include a short explanation.
    `;

    // ✅ Correct way to generate content in v1
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const reply = result.response.text();
    console.log("✅ Gemini Reply:", reply);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate response" },
      { status: 500 }
    );
  }
}
