import { z } from "zod"

export const CreateWatcherSchema = z.object({
  postId: z.number(),
  userId: z.number().optional(),
  comment: z.string().optional(),
})
export const UpdateWatcherSchema = z.object({
  id: z.number(),
  comment: z.string(),
})

export const DeleteWatcherSchema = z.object({
  id: z.number(),
})
