import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type SignupFormType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type SigninFormType = z.infer<typeof signinSchema>;
