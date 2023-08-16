import { z } from "zod"
import { SchoolType } from "@prisma/client"

export const CreatePostSchema = z.object({
  subjectIds: z.number().array(),
  type: z.nativeEnum(SchoolType),
  userId: z.number().optional(),
  locationIds: z.number().array(),
})

export const UpdatePostSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeletePostSchema = z.object({
  id: z.number(),
})
