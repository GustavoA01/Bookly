import z from 'zod';

export const nameSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório'),
});

export const passwordSchema = z.object({
  previousPassword: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
});

export type NameFormType = z.infer<typeof nameSchema>;
export type PasswordFormType = z.infer<typeof passwordSchema>;
