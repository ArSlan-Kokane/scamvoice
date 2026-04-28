export interface Tactic {
  tactic: string;
  evidence: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface AnalysisResult {
  risk_score: number;
  verdict: 'SAFE' | 'SUSPICIOUS' | 'SCAM';
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  detected_tactics: Tactic[];
  summary: string;
  recommended_action: string;
  scam_type: string;
  language_detected: string;
  trigger_panic_mode: boolean;
}

export const FALLBACK_RESULT: AnalysisResult = {
  risk_score: 50,
  verdict: 'SUSPICIOUS',
  confidence: 'LOW',
  detected_tactics: [],
  summary: "Analysis uncertain — verify this call independently",
  recommended_action: "Verify the caller's identity through official channels.",
  scam_type: "Other",
  language_detected: "Unknown",
  trigger_panic_mode: false
};

export function validateResult(raw: any): AnalysisResult {
  try {
    if (!raw || typeof raw !== 'object') {
      console.warn("Invalid raw result received:", raw);
      return FALLBACK_RESULT;
    }
    
    // Ensure all fields are present and correctly typed
    const result: AnalysisResult = {
      risk_score: typeof raw.risk_score === 'number' ? raw.risk_score : 50,
      verdict: ['SAFE', 'SUSPICIOUS', 'SCAM'].includes(raw.verdict) ? raw.verdict : 'SUSPICIOUS',
      confidence: ['LOW', 'MEDIUM', 'HIGH'].includes(raw.confidence) ? raw.confidence : 'LOW',
      detected_tactics: Array.isArray(raw.detected_tactics) ? raw.detected_tactics.map((t: any) => ({
        tactic: String(t.tactic || ''),
        evidence: String(t.evidence || ''),
        severity: ['LOW', 'MEDIUM', 'HIGH'].includes(t.severity) ? t.severity : 'LOW'
      })) : [],
      summary: String(raw.summary || FALLBACK_RESULT.summary),
      recommended_action: String(raw.recommended_action || FALLBACK_RESULT.recommended_action),
      scam_type: String(raw.scam_type || "Other"),
      language_detected: String(raw.language_detected || "Unknown"),
      trigger_panic_mode: Boolean(raw.trigger_panic_mode)
    };

    return result;
  } catch (e) {
    console.error("Error in validateResult:", e);
    return FALLBACK_RESULT;
  }
}
