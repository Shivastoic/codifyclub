import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('resume');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let pdfText;
  try {
    const parsed = await pdf(buffer);
    pdfText = parsed.text;
  } catch (err) {
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  }

  const prompt = `You are a professional career coach. Please evaluate the following resume and provide constructive feedback:\n\n${pdfText}`;

  try {
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.NEXT_PUBLIC_GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const geminiData = await geminiRes.json();
    const feedback = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || 'No feedback received.';

    return NextResponse.json({ feedback });
  } catch (error) {
    return NextResponse.json({ error: 'Error from Gemini API' }, { status: 500 });
  }
}
