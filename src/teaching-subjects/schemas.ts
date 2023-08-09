import { z } from "zod"

export const CreateTeachingSubjectSchema = z.object({
  school: z.string(),
  schoolEducationLevel: z.string(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateTeachingSubjectSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteTeachingSubjectSchema = z.object({
  id: z.number(),
})
