/**
 * Gemini Service
 * ==============
 * Higher-level wrapper around Gemini API calls
 * Handles all AI tool prompts and API interactions
 */

import { getGeminiAPIKey } from '../config/index';

class GeminiService {
  /**
   * Generate text from a prompt
   */
  static async generateText(prompt, apiKeyOverride = null) {
    if (!prompt) throw new Error('Prompt is required');

    const apiKey = getGeminiAPIKey(apiKeyOverride);
    if (!apiKey) throw new Error('Gemini API key not configured');

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'API returned an error');
      }

      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
      console.error('generateText error:', error);
      throw error;
    }
  }

  /**
   * Generate text-to-speech audio
   */
  static async generateTTS(text, apiKeyOverride = null) {
    if (!text) throw new Error('Text is required');

    const apiKey = getGeminiAPIKey(apiKeyOverride);
    if (!apiKey) throw new Error('Gemini API key not configured');

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text }] }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Aoede' },
                },
              },
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
    } catch (error) {
      console.error('generateTTS error:', error);
      throw error;
    }
  }

  /**
   * Generate image using Imagen
   */
  static async generateImage(prompt, apiKeyOverride = null) {
    if (!prompt) throw new Error('Prompt is required');

    const apiKey = getGeminiAPIKey(apiKeyOverride);
    if (!apiKey) throw new Error('Gemini API key not configured');

    try {
      const enhancedPrompt = `${prompt} The style should be realistic, dignified, warm, architectural photography, golden hour lighting.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt: enhancedPrompt }],
            parameters: { sampleCount: 1 },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const base64 = data.predictions?.[0]?.bytesBase64Encoded;
      if (!base64) throw new Error('No image data returned');

      return `data:image/png;base64,${base64}`;
    } catch (error) {
      console.error('generateImage error:', error);
      throw error;
    }
  }

  /**
   * Chat with Gemini (for interactive conversations)
   */
  static async chat(chatHistory, systemPrompt, apiKeyOverride = null) {
    if (!chatHistory || chatHistory.length === 0) {
      throw new Error('Chat history is required');
    }

    const apiKey = getGeminiAPIKey(apiKeyOverride);
    if (!apiKey) throw new Error('Gemini API key not configured');

    try {
      const prompt = `${systemPrompt}\n\nCurrent conversation:\n${chatHistory
        .map((m) => `${m.role}: ${m.text}`)
        .join('\n')}\n\nassistant:`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
      console.error('chat error:', error);
      throw error;
    }
  }

  /**
   * Generic tool dispatcher - routes to appropriate prompt builder
   */
  static async executeTool(toolId, input1, input2 = '', apiKeyOverride = null) {
    const toolPrompts = {
      a2i: () => `You are an A²I (Arrears-to-Impact) Advocate for La Familia 479 Community Land Trust.
The user has a state/court debt of: "${input1}".
They are proposing to perform this community action instead of cash payment: "${input2}".

Write a formal, legal-adjacent proposal to the court/agency.
Key elements:
1. Acknowledge the debt but cite the "Dignity Protocol" concept that unpayable debt is systemic waste.
2. Propose the "A²I Exchange" (Arrears to Impact) converting the debt into equivalent "Co-Care Credits".
3. Explain how the proposed community action benefits the local economy and reduces state burden.
4. Request a suspension of the debt pending completion.
Tone: Respectful, firm, and heavily structured like a legal motion.`,

      medical: () => `You are a Patient Advocate fighting for medical equity.
The user is going to the doctor for: "${input1}".
Their main fear or context is: "${input2}".

Prepare them to advocate for themselves so they are not dismissed.
Output:
1. 🛡️ Personal Medical Bill of Rights (2-3 sentences)
2. 📋 The 3 Essential Questions to ask the doctor before leaving
3. 🛑 The Pushback Script if the doctor refuses to run tests

Tone: Fiercely protective, empowering, and medically professional.`,

      sentinel: () => `You are a Legal Advocate for tenants and workers. Analyze this contract/document for "Extraction Risks" (predatory clauses, unfair terms, hidden fees): "${input1}".

Output:
1. 🚩 Red Flags (Dangerous terms)
2. 🟢 Green Flags (Protections present)
3. 💡 Plain English Summary
4. ❓ Clarifying Questions to ask the signer`,

      foia: () => `You are an expert in Arkansas Freedom of Information Act (FOIA) law. Draft a formal, authoritative FOIA request letter to: ${input1}. Requesting: ${input2}.
Cite "Ark. Code Ann. § 25-19-101 et seq.".
State this is for La Familia 479 (non-profit) and request fee waiver.
Tone: Professional, firm.`,

      decoder: () => `Decode this legal text into plain English: "${input1}".
Start with BLUF (Bottom Line Up Front).
List deadlines, money amounts, next steps.
Tone: Supportive.`,

      negotiator: () => `Draft a negotiation script for dealing with creditor "${input1}".
Situation: "${input2}".
Cite FDCPA protections.
Goal: Manageable payment plan.`,

      ordinance: () => `Analyze this ordinance for impact on low-income families: "${input1}".
Output: Risk Level, Impact, 3 Actionable Talking Points.`,

      impact: () => `Write an inspiring "Impact Narrative" for La Familia 479 based on: "${input1}".
Use brand voice: authoritative, restorative, hopeful.
Concept: "Verifiable Healing".`,

      grant: () => `Write the "${input1}" section for a grant proposal regarding: "${input2}".
Context: Converting "Perishable Capital" to "Sovereign Assets".`,

      meeting: () => `Synthesize these meeting notes: "${input1}".
Output: Executive Summary, Decisions, Action Items, Next Steps.`,

      miner: () => `Analyze this family narrative for "Verifiable Healing" actions: "${input1}".
Assign "Co-Care Credit" values.
Calculate TOTAL Sovereign Equity.`,

      tutor: () => `Create a learning module for: "${input1}".
Context: "${input2}".
3-Step Action Plan, connection to sovereignty, one immediate action.`,

      mediator: () => `Draft a Non-Violent Communication (NVC) script for: "${input1}".
Context: "${input2}".
Structure: Observation, Feeling, Need, Request.`,

      legacy: () => `Write a dignified "Family Chapter" biography for: "${input1}".
Notes: "${input2}".
Highlight resilience and contribution.`,

      resume: () => `Translate this informal experience into professional resume bullets: "${input1}".
Use corporate action verbs.`,

      chef: () => `Create 3 dignified, healthy zero-waste meal ideas using: "${input1}".`,

      vision: () => `Create a 5-Year "Sovereignty Roadmap" for this dream: "${input1}".
Milestones for Year 1, 3, 5 and immediate action.`,

      social: () => `You are a Social Media Strategist for the Dignity Protocol.
Create 3 posts (LinkedIn, Instagram, Facebook) based on this impact story: "${input1}".
Use hashtags like #VerifiableHealing #LandSovereignty.`,

      hustle: () => `You are a Zero-Capital Business Coach for the Dignity Protocol.
A community member wants to start this micro-business: "${input1}".
Their currently available resources are: "${input2}".

Create a highly practical "Hustle Blueprint":
1. 🚀 The 30-Day Launch Plan
2. 💰 Simple Pricing Math
3. 📱 The Copy-Paste Script for first customers
Tone: Street-smart, practical, encouraging.`,

      barter: () => `You are a Fair Trade Arbitrator for a community land trust.
Analyze these two offers for a barter exchange:
Offer A: "${input1}"
Offer B: "${input2}"

Task:
1. Estimate fair market value of both
2. Identify the "Equity Gap"
3. Propose a "Fair Trade Contract"
4. Suggest "Sweeteners" to bridge the gap without money`,
    };

    const promptBuilder = toolPrompts[toolId];
    if (!promptBuilder) {
      throw new Error(`Unknown tool: ${toolId}`);
    }

    const prompt = promptBuilder();
    return this.generateText(prompt, apiKeyOverride);
  }
}

export default GeminiService;
