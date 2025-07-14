// Plik: /api/gemini-proxy.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

// Konfiguracja, aby Vercel nie parsował ciała żądania, co pozwala na dostęp do surowych danych
// Jest to dobra praktyka, choć w tym prostym przypadku nie jest to krytyczne.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: Request) {
  // Akceptujemy tylko żądania typu POST
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Odczytanie klucza API Gemini ze zmiennych środowiskowych
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    console.error("Missing GEMINI_API_KEY environment variable");
    return new Response('Server configuration error.', { status: 500 });
  }

  try {
    // Odczytanie ciała żądania jako JSON
    const body = await req.json();
    const { userPrompt } = body;    // Sprawdzenie, czy prompt został dostarczony
    if (!userPrompt || typeof userPrompt !== 'string') {
      return new Response('Bad Request: Missing or invalid prompt', { status: 400 });
    }

    // --- KROK 1: Komunikacja z Gemini API ---
    // Inicjalizacja klienta Google Gemini AI przy użyciu klucza API
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Wygenerowanie treści na podstawie promptu użytkownika
    const result = await model.generateContent(userPrompt);
    const response = result.response;
    const text = response.text();

    // --- KROK 2: Zwrócenie odpowiedzi do klienta ---
    // Zwrócenie wygenerowanego tekstu w formacie JSON
    return new Response(JSON.stringify({ reply: text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error("Error processing request:", error);
    // Zwrócenie ogólnego błędu serwera
    return new Response('Internal Server Error', { status: 500 });
  }
}