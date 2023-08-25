import { z } from "zod"

export const CreateUserLocationSchema = z.object({
  regionName: z.string(),
  districtName: z.string(),
  wardName: z.string(),
  streetName: z.string(),
  userId: z.number(),
})

export const UpdateUserLocationSchema = z.object({
  id: z.number(),
  userId: z.number().optional(),
  regionName: z.string().optional(),
  districtName: z.string().optional(),
  wardName: z.string().optional(),
  streetName: z.string().optional(),
})

export const DeleteUserLocationSchema = z.object({
  id: z.number(),
})
