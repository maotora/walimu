import { z } from "zod"

export const CreateContactSchema = z.object({
  names: z.string(),
  phone: z.string(),
  email: z.string(),
  inqury: z.string(),
})

export const DeleteContactSchema = z.object({
  id: z.number(),
})
