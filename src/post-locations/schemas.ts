import { z } from "zod"

export const CreatePostLocationSchema = z.object({
  regionName: z.string(),
  districtName: z.string(),
  wardName: z.string(),
  streetName: z.string(),
  postId: z.number(),
})

export const UpdatePostLocationSchema = z.object({
  id: z.number(),
  postId: z.number().optional(),
  locationId: z.number().optional(),
  regionName: z.string().optional(),
  districtName: z.string().optional(),
  wardName: z.string().optional(),
  streetName: z.string().optional(),
})

export const DeletePostLocationSchema = z.object({
  id: z.number(),
})
