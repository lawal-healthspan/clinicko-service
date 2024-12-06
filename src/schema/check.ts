import { z } from "zod";


export const eventBodySchema = z.object({
    userId: z.string().min(10, "userId must be at least 10 characters"),
    apiKey: z.string().min(10, "API key must be at least 76 characters"),
  });