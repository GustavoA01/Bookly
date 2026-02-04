import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(3, "Título é obrigatório"),
  author: z.string().optional(),
  genre: z.string().optional(),
  numberOfPages: z.number().optional(),
  currentPage: z.number().optional(),
  synopsis: z.string().optional(),
  comment: z.string().optional(),
  rating: z.number().optional().nullable(),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
});

export type BookFormType = z.infer<typeof bookSchema>;

export const listSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
});

export type ListFormType = z.infer<typeof listSchema>;
