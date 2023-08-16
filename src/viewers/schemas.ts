import { z } from "zod"

export const CreateViewerSchema = z.object({
  postId: z.number(),
  userId: z.number().optional(),
})
export const UpdateViewerSchema = z.object({
  id: z.number(),
})

export const DeleteViewerSchema = z.object({
  id: z.number(),
})
