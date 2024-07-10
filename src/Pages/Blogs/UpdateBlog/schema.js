import { z } from "zod";

export const schema = z.object({
  title: z
    .string({ message: "please fill the title field" })
    .min(1, { message: "please fill the title field" }),
  content: z
    .string({ message: "please fill the content field" })
    .min(1, { message: "please fill the content field" }),
  image: z.any(),
});
