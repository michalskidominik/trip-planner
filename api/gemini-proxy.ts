// Plik: /api/gemini-proxy.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Akceptujemy tylko żądania typu POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Odczytanie klucza API Gemini ze zmiennych środowiskowych
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.error("Missing GEMINI_API_KEY environment variable");
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    // Odczytanie ciała żądania jako JSON
    const { userPrompt } = req.body;

    // Sprawdzenie, czy prompt został dostarczony
    if (!userPrompt || typeof userPrompt !== 'string') {
      return res.status(400).json({ error: 'Bad Request: Missing or invalid prompt' });
    }

    // --- KROK 1: Komunikacja z Gemini API ---
    // Inicjalizacja klienta Google Gemini AI przy użyciu klucza API
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Wygenerowanie treści na podstawie promptu użytkownika
    const result = await model.generateContent(userPrompt);
    const response = result.response;
    const text = response.text();    // --- KROK 2: Zwrócenie odpowiedzi do klienta ---
    // Zwrócenie wygenerowanego tekstu w formacie JSON
    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Error processing request:", error);
    // Zwrócenie ogólnego błędu serwera
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}