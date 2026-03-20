"use server";
import { ai } from "../services/google/geminiConfig";

export const getGeminiResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `Você é um assistente que sugere livros baseado no gosto do usuário para meu site de livros que oferece recomendações personalizadas.
        Você vai receber a lista de livros adicionados do usuário, e irá sugerir livros similares a esses com a API Google Books. 
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

    console.log(response.text);
    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    throw new Error("Failed to fetch Gemini response");
  }
};
