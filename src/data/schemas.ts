import z from "zod";

export const bookSchema = z
  .object({
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
  })
  .superRefine((data, ctx) => {
    const { numberOfPages, currentPage } = data;
    if (numberOfPages && currentPage) {
      if (currentPage > numberOfPages) {
        ctx.addIssue({
          path: ["currentPage"],
          message: "A página atual não pode ser maior que o número de páginas.",
          code: "invalid_value",
          values: ["currentPage"],
        });
      }
    }

    if (numberOfPages && numberOfPages <= 0) {
      ctx.addIssue({
        path: ["numberOfPages"],
        message: "O número de páginas deve ser maior que zero.",
        code: "invalid_value",
        values: ["numberOfPages"],
      });
    }

    if (currentPage && currentPage < 0) {
      ctx.addIssue({
        path: ["currentPage"],
        message: "A página atual deve ser maior que 0.",
        code: "invalid_value",
        values: ["currentPage"],
      });
    }
  });

export const listSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
});

export type BookFormType = z.infer<typeof bookSchema>;
export type ListFormType = z.infer<typeof listSchema>;
