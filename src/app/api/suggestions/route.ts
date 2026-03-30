import { GeminiResponseType } from "@/src/data/types/api";
import { BookType } from "@/src/data/types/books";
import { ai } from "@/src/services/google/geminiConfig";

export const POST = async (req: Request) => {
  try {
    const { prompt, userBooks } = await req.json();

    if (!prompt)
      return Response.json({ error: "Prompt is required" }, { status: 400 });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        responseMimeType: "application/json",
        systemInstruction: `Você é um assistente que sugere livros baseado no gosto do usuário para meu site de livros que oferece recomendações personalizadas.
        Você vai receber a lista de livros adicionados do usuário, e irá sugerir livros similares a esses com a API Google Books.
        Livros do usuário: ${userBooks.map((book: BookType) => `${book.title} de ${book.author}`).join(", ")} 
        Responda apenas com o nome do livro e o autor, e com um texto de resposta que permitirá o usuário interagir com você.
        Responda no formato: {"response": string, "suggestions": [{"title": string, "author": string}]}
        `,
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });
    if (!response.text) throw new Error("No response from Gemini");

    const geminiData = JSON.parse(response.text) as GeminiResponseType;

    const bookPromises = geminiData.suggestions.map(async (s) => {
      const q = encodeURIComponent(`intitle:${s.title} inauthor:${s.author}`);
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1`,
      );
      const data = await res.json();
      return data.items?.[0] || null;
    });

    const books = (await Promise.all(bookPromises)).filter(Boolean);

    return Response.json({
      chatResponse: geminiData.response,
      suggestions: books,
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return Response.json({ error: "Failed to fetch suggestions" });
  }
};
