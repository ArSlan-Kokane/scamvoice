import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SCAMVOICE_ANALYZE_PROMPT } from '@/lib/prompts';
import { validateResult, FALLBACK_RESULT } from '@/lib/analyzer';

export async function POST(req: NextRequest) {
  // ─── STEP 1: Verify environment variable ────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('[DEBUG][Step 1] GEMINI_API_KEY present:', !!apiKey);
  console.log('[DEBUG][Step 1] GEMINI_API_KEY value (first 8 chars):', apiKey ? apiKey.slice(0, 8) + '...' : 'UNDEFINED');

  if (!apiKey || apiKey === 'placeholder_replace_this') {
    console.error('[DEBUG][Step 1] FALLBACK TRIGGERED: GEMINI_API_KEY is not set or is a placeholder.');
    console.error('[DEBUG][Step 1] Ensure .env.local is at the project root (same folder as package.json) and contains: GEMINI_API_KEY=your_actual_key');
    return NextResponse.json(FALLBACK_RESULT);
  }

  try {
    const body = await req.json();
    const { transcript } = body;

    console.log('[DEBUG][Step 0] Received transcript (first 100 chars):', transcript?.slice(0, 100));

    // Validate transcript
    if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'Transcript is required and must be a non-empty string.' },
        { status: 400 }
      );
    }

    if (transcript.length > 5000) {
      return NextResponse.json(
        { error: 'Transcript exceeds maximum length of 5000 characters.' },
        { status: 400 }
      );
    }

    // ─── STEP 5: Model check ───────────────────────────────────────────────────
    const MODEL_NAME = 'gemini-2.5-pro';
    console.log('[DEBUG][Step 5] Using model:', MODEL_NAME);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const fullPrompt = SCAMVOICE_ANALYZE_PROMPT.replace('{TRANSCRIPT}', transcript);
    console.log('[DEBUG][Step 5] Prompt length (chars):', fullPrompt.length);

    // ─── STEP 2: Log Gemini call ───────────────────────────────────────────────
    console.log('[DEBUG][Step 2] Calling Gemini API now...');
    let rawText: string;
    try {
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      rawText = response.text();
      console.log('[DEBUG][Step 2] ✅ Gemini responded. Raw text length:', rawText.length);
      console.log('[DEBUG][Step 2] Raw Gemini response:');
      console.log(rawText);
    } catch (geminiError) {
      console.error('[DEBUG][Step 2] ❌ Gemini API call FAILED with error:');
      console.error(geminiError);
      // ─── STEP 3: Fallback trigger ────────────────────────────────────────────
      console.error('[DEBUG][Step 3] FALLBACK TRIGGERED due to Gemini API error.');
      return NextResponse.json(FALLBACK_RESULT);
    }

    // ─── STEP 4: Validate parsing ──────────────────────────────────────────────
    console.log('[DEBUG][Step 4] Attempting to parse Gemini response as JSON...');
    try {
      // Strip markdown code fences if LLM wraps JSON in ```json ... ```
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('[DEBUG][Step 4] ❌ No JSON object found in Gemini response. Full text was:');
        console.error(rawText);
        // ─── STEP 3: Fallback trigger ──────────────────────────────────────────
        console.error('[DEBUG][Step 3] FALLBACK TRIGGERED: could not find JSON in response.');
        return NextResponse.json(FALLBACK_RESULT);
      }

      const jsonString = jsonMatch[0];
      console.log('[DEBUG][Step 4] Extracted JSON string (first 300 chars):', jsonString.slice(0, 300));

      const parsed = JSON.parse(jsonString);
      console.log('[DEBUG][Step 4] ✅ JSON parsed successfully:', JSON.stringify(parsed, null, 2));

      const validated = validateResult(parsed);
      console.log('[DEBUG][Step 4] ✅ Validated result:', JSON.stringify(validated, null, 2));

      // ─── STEP 6: Final returned JSON ───────────────────────────────────────
      console.log('[DEBUG][Step 6] Final JSON being returned to client:', JSON.stringify(validated, null, 2));
      return NextResponse.json(validated);

    } catch (parseError) {
      console.error('[DEBUG][Step 4] ❌ JSON.parse FAILED. Error:', parseError);
      console.error('[DEBUG][Step 4] Raw text that failed to parse:');
      console.error(rawText);
      // ─── STEP 3: Fallback trigger ────────────────────────────────────────────
      console.error('[DEBUG][Step 3] FALLBACK TRIGGERED due to JSON parse failure.');
      return NextResponse.json(FALLBACK_RESULT);
    }

  } catch (error) {
    console.error('[DEBUG][Outer catch] Unhandled error in /api/analyze:', error);
    // ─── STEP 3: Fallback trigger ──────────────────────────────────────────────
    console.error('[DEBUG][Step 3] FALLBACK TRIGGERED due to unhandled outer error.');
    return NextResponse.json(FALLBACK_RESULT);
  }
}
