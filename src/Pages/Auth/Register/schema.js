import { z } from "zod";

export const schema = z
  .object({
    firstname: z
      .string({ message: "please fill the first name field" })
      .min(4, { message: "first name must be more than 4 characters " }),
    lastname: z
      .string({ message: "please fill the last name field" })
      .min(4, { message: "last name must be more than 4 characters " }),
    email: z.string().email({ message: "please enter a valid email " }),
    password: z
      .string()
      .min(8, { message: "password must be more than 8 charcters" }),
    confirmPassword: z
      .string({
        message: "please fill the confirm password field",
      })
      .min(1, {
        message: "please fill the confirm password field",
      }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "please make sure that you confirm password correctly",
    path: ["confirmPassword"],
  });
