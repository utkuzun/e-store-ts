import z from 'zod';

const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(50),
  password: z.string().min(6),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN']),
});

export type UserValidation = z.infer<typeof userSchema>;

export const userValidationSchema = userSchema.omit({ id: true });
export const userLoginSchema = userSchema.pick({ email: true, password: true });

export const publicUserSchema = userSchema.omit({ password: true });
export const publicUsersSchema = publicUserSchema.array();

export default userSchema;
