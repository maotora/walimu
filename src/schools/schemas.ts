import { z } from "zod"
import { SchoolType } from "@prisma/client"

export const CreateSchoolSchema = z.object({
  schoolEducationLevel: z.string().array(),
  type: z.nativeEnum(SchoolType),
  locationId: z.number(),
  name: z.string(),
  userId: z.number().optional(),
})

export const UpdateSchoolSchema = z.object({
  id: z.number(),
  schoolEducationLevel: z.string().array().optional(),
  type: z.nativeEnum(SchoolType).optional(),
  locationId: z.number().optional(),
  name: z.string().optional(),
})

export const DeleteSchoolSchema = z.object({
  id: z.number(),
})
