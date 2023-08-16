import { z } from "zod"
import { EducationLevel } from "@prisma/client"

export const CreateSubjectSchema = z.object({
  level: z.nativeEnum(EducationLevel),
  name: z.string(),
})
export const UpdateSubjectSchema = z.object({
  id: z.number(),
  level: z.nativeEnum(EducationLevel).optional(),
  name: z.string().optional(),
})

export const DeleteSubjectSchema = z.object({
  id: z.number(),
})
