import { z } from "zod"

export const CreateWatcherSchema = z.object({
  postId: z.number(),
  userId: z.number().optional(),
  comment: z.string().optional(),
})
export const UpdateWatcherSchema = z.object({
  id: z.number(),
  paired: z.boolean().optional(),
  comment: z.string().optional(),
  approved: z.boolean().optional(),
})

export const DeleteWatcherSchema = z.object({
  id: z.number(),
})
