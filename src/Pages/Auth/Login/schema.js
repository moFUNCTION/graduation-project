import { z } from "zod";

export const schema = z.object({
  email: z.string().email({ message: "please enter a valid email " }),
  password: z
    .string()
    .min(8, { message: "password must be more than 8 charcters" }),
});
