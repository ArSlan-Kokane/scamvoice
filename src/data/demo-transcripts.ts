import { AnalysisResult } from '@/lib/analyzer';

export const DEMO_ANIMATION = [
  { 
    speaker: 'CALLER', 
    text: 'Hello, am I speaking with the account holder?',
    risk: 12,
    tactics: []
  },
  { 
    speaker: 'USER', 
    text: 'Yes, who is this?',
    risk: 12,
    tactics: []
  },
  { 
    speaker: 'CALLER', 
    text: 'Sir I am calling from SBI customer care. Your KYC has expired today. Account will be blocked in 10 minutes if not updated.',
    risk: 45,
    tactics: ['Urgency pressure', 'Impersonation']
  },
  { 
    speaker: 'USER', 
    text: 'Oh what do I need to do?',
    risk: 45,
    tactics: []
  },
  { 
    speaker: 'CALLER', 
    text: 'I am sending OTP to your number. Please share immediately. Only 5 minutes remaining.',
    risk: 72,
    tactics: ['Urgency pressure', 'Impersonation', 'OTP request']
  },
  { 
    speaker: 'USER', 
    text: 'Okay I got the OTP...',
    risk: 80,
    tactics: []
  },
  { 
    speaker: 'CALLER', 
    text: 'Please share quickly sir. Account will be permanently blocked and case will be filed.',
    risk: 91,
    tactics: ['Urgency pressure', 'Impersonation', 'OTP request', 'Fear manipulation']
  }
];

export const DEMO_FINAL_RESULT: AnalysisResult = {
  risk_score: 92,
  verdict: 'SCAM',
  confidence: 'HIGH',
  detected_tactics: [
    {
      tactic: 'Urgency pressure',
      evidence: 'Account will be blocked in 10 minutes if not updated.',
      severity: 'HIGH'
    },
    {
      tactic: 'Impersonation',
      evidence: 'I am calling from SBI customer care.',
      severity: 'MEDIUM'
    },
    {
      tactic: 'Credential harvesting',
      evidence: 'Please share that OTP with me to complete the verification process.',
      severity: 'HIGH'
    }
  ],
  summary: 'The caller is impersonating SBI bank staff and using intense time pressure to steal an OTP. This is a classic KYC scam pattern.',
  recommended_action: 'Hang up immediately. Do not share the OTP. Block this number and report it on the Chakshu portal.',
  scam_type: 'KYC Fraud',
  language_detected: 'English',
  trigger_panic_mode: false
};
export const demoTranscripts = [
  {
    title: 'KYC OTP Scam',
    transcript: `[CALLER]: Hello, am I speaking with the account holder?
[USER]: Yes, who is this?
[CALLER]: Sir, I am calling from SBI customer care. Your KYC verification has expired today. As per RBI guidelines, your account will be blocked within 10 minutes if not updated.
[USER]: Oh, what do I need to do?
[CALLER]: Sir, I am sending an OTP to your registered mobile. Please share that OTP with me to complete the verification process. This is very urgent, your account will be frozen otherwise.
[USER]: Okay, I got an OTP...
[CALLER]: Please share it quickly sir, only 5 minutes remaining.`
  },
  {
    title: 'Digital Arrest',
    transcript: `[CALLER]: Is this [Name]? I am calling from CBI Cyber Crime Branch, Delhi. You are under digital arrest. Do not disconnect this call.
[USER]: What? Why?
[CALLER]: Your Aadhaar number has been used in a money laundering case. A warrant has been issued. You must cooperate or we will send officers to your address immediately.
[USER]: I haven't done anything wrong.
[CALLER]: Sir, this is a classified operation. Do not tell anyone — not your family, not your friends. To clear your name, you must transfer ₹2,50,000 to our secure government account as surety bond. You will get it back after verification.`
  },
  {
    title: 'Courier Scam',
    transcript: `[CALLER]: Hello, this is FedEx customer service. We have a parcel for you from Dubai but it has been held at customs.
[USER]: I wasn't expecting anything from Dubai.
[CALLER]: Sir, your name and address is on the package. Inside there is a mobile phone and some foreign currency. Customs has flagged it. To release it you need to pay ₹3,500 customs clearance fee immediately via UPI.`
  }
];
