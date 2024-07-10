import { z } from "zod";

export const schema = z.object({
  firstname: z
    .string({ message: "please fill the first name field" })
    .min(4, { message: "first name must be more than 4 characters " }),
  lastname: z
    .string({ message: "please fill the last name field" })
    .min(4, { message: "last name must be more than 4 characters " }),
  image: z.any(),
});
