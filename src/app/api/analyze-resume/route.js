// src/app/api/analyze-resume/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const { resumeText } = await request.json();
    
    if (!resumeText) {
      return NextResponse.json(
        { error: 'No resume text provided' },
        { status: 400 }
      );
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    
    // Use the Gemini Flash 2.0 model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create the prompt for resume analysis
    const prompt = `
      Analyze the following resume text and provide detailed feedback:
      
      ${resumeText}
      
      Please structure your feedback in the following format:
      1. Strengths: List at least 3-5 strong points of the resume
      2. Weaknesses: Identify 3-5 areas that need improvement
      3. Suggestions: Provide 3-5 specific actionable suggestions to improve the resume
      4. Overall Score: Give a score out of 100
      
      Your analysis should consider factors like:
      - Format and organization
      - Clarity and conciseness
      - Use of action verbs and quantifiable achievements
      - Relevance of experience and skills
      - Education and certification presentation
      - Overall professional impression
    `;

    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawTextResponse = response.text();
    
    // Parse the response to structure it properly
    const parsedFeedback = {
      strengths: [],
      weaknesses: [],
      suggestions: [],
      overallScore: 0
    };
    
    // Simple parsing logic - you might need to improve this based on the actual response format
    try {
      const sections = rawTextResponse.split(/(?:Strengths:|Weaknesses:|Areas for Improvement:|Suggestions:|Overall Score:)/gi);
      
      if (sections.length >= 5) {
        // Extract strengths
        const strengthsText = sections[1].trim();
        parsedFeedback.strengths = strengthsText.split(/\d+\.\s|\-\s/).filter(item => item.trim().length > 0);
        
        // Extract weaknesses
        const weaknessesText = sections[2].trim();
        parsedFeedback.weaknesses = weaknessesText.split(/\d+\.\s|\-\s/).filter(item => item.trim().length > 0);
        
        // Extract suggestions
        const suggestionsText = sections[3].trim();
        parsedFeedback.suggestions = suggestionsText.split(/\d+\.\s|\-\s/).filter(item => item.trim().length > 0);
        
        // Extract overall score
        const scoreMatch = sections[4].match(/\d+/);
        if (scoreMatch) {
          parsedFeedback.overallScore = parseInt(scoreMatch[0], 10);
        }
      }
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      // Fallback to raw text if parsing fails
      return NextResponse.json({ 
        feedback: { 
          rawFeedback: rawTextResponse,
          overallScore: 70 // Default score
        } 
      });
    }
    
    return NextResponse.json({ feedback: parsedFeedback });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: 'Error analyzing resume' },
      { status: 500 }
    );
  }
}
