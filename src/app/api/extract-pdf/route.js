// src/app/api/extract-pdf/route.js
import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    // With the App Router, we can't use formidable directly as before
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Parse the PDF and extract text
    const pdfData = await pdf(buffer);
    const extractedText = pdfData.text;
    
    // Return the extracted text
    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: 'Error processing PDF' },
      { status: 500 }
    );
  }
}
