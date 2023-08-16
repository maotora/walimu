import { z } from "zod"

export const CreateLocationSchema = z.object({
  regionName: z.string(),
  districtName: z.string(),
  wardName: z.string(),
  streetName: z.string(),
})

export const UpdateLocationSchema = z.object({
  id: z.number(),
})

export const DeleteLocationSchema = z.object({
  id: z.number(),
})
