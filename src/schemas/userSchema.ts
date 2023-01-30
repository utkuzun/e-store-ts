import z from 'zod';

const userSchema = z.object({
  name: z.string().min(3).max(50),
  password: z.string().min(6),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN']),
});

export type UserValidation = z.infer<typeof userSchema>;

export const userLoginSchema = userSchema.pick({ email: true, password: true });

export default userSchema;
