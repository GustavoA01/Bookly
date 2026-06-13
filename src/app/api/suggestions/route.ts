import { GeminiResponseType } from '@/src/data/types/api';
import { BookType } from '@/src/data/types/books';
import { ai } from '@/src/services/google/geminiConfig';
import { getOpenLibraryBooks } from '@/src/services/openLibrary/getOpenLibraryBooks';
import { HarmBlockThreshold, HarmCategory } from '@google/genai';

const GOOGLE_BOOKS_MAX_RESULTS = 5;
const GOOGLE_BOOKS_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Erro inesperado na API de livros';

const normalizeSuggestions = (suggestions: GeminiResponseType['suggestions']) =>
  suggestions
    .filter((suggestion) => suggestion.title?.trim())
    .slice(0, GOOGLE_BOOKS_MAX_RESULTS);

const getSuggestionQuery = (suggestion: { title: string; author: string }) =>
  [suggestion.title, suggestion.author].filter(Boolean).join(' ');

const fetchOpenLibraryBook = async (suggestion: {
  title: string;
  author: string;
}) => {
  const response = await getOpenLibraryBooks(getSuggestionQuery(suggestion), 0);
  return response.items?.[0] || null;
};

const fetchGoogleBook = async (suggestion: {
  title: string;
  author: string;
}) => {
  const query = encodeURIComponent(
    `intitle:${suggestion.title} inauthor:${suggestion.author}`
  );

  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_ENDPOINT}?q=${query}&maxResults=1`,
      { cache: 'no-store' }
    );

    if (!response.ok) return fetchOpenLibraryBook(suggestion);

    const data = await response.json();
    return data.items?.[0] || fetchOpenLibraryBook(suggestion);
  } catch {
    return fetchOpenLibraryBook(suggestion);
  }
};

export const POST = async (req: Request) => {
  try {
    const { prompt, userBooks = [] } = await req.json();

    if (!prompt?.trim()) {
      return Response.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const userBookList = Array.isArray(userBooks)
      ? userBooks
          .map(
            (book: BookType) =>
              `${book.title} de ${book.author || 'autor desconhecido'}`
          )
          .join(', ')
      : '';

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      config: {
        responseMimeType: 'application/json',
        systemInstruction: `Você é um assistente que sugere livros baseado no gosto do usuário para meu site de livros que oferece recomendações personalizadas.
        Você vai receber a lista de livros adicionados do usuário, e irá sugerir livros similares a esses usando seu conhecimento literário.
        Livros do usuário: ${userBookList || 'Nenhum livro informado'}
        Responda apenas com o nome do livro e o autor, e com um texto de resposta que permitirá o usuário interagir com você.
        Não responda perguntas não relacionadas a livros ou sugestões de livros, caso o usuário pergunte algo fora desse contexto, responda que não pode responder.
        Responda no formato: {"response": string, "suggestions": [{"title": string, "author": string}]}
        `,
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    if (!response.text) throw new Error('No response from Gemini');

    const geminiData = JSON.parse(response.text) as GeminiResponseType;
    const suggestions = normalizeSuggestions(geminiData.suggestions || []);
    const books = (await Promise.all(suggestions.map(fetchGoogleBook))).filter(
      Boolean
    );

    return Response.json({
      chatResponse: geminiData.response,
      suggestions: books,
    });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Error fetching suggestions:', error);

    return Response.json(
      { error: message || 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
};
