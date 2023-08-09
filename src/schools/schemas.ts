import { z } from "zod"

export const CreateSchoolSchema = z.object({
  schoolEducationLevel: z.string(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateSchoolSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteSchoolSchema = z.object({
  id: z.number(),
})
