import z from "zod";

export const signUpSchema = z.object({
  username: z.string().max(100),
  password: z.string().min(8),
});
export type SignUpInputData = z.infer<typeof signUpSchema>;
