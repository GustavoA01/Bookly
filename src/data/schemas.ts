import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(3, "Título é obrigatório"),
  author: z.string().optional(),
  genre: z.string().optional(),
  numberOfPages: z.number().optional(),
  currentPage: z.number().optional(),
  synopsis: z.string().optional(),
  comment: z.string().optional(),
  rating: z.number().min(0).max(100).optional(),
  imageUrl: z.string().optional(),
});

export type BookFormType = z.infer<typeof bookSchema>;
