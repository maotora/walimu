import { z } from "zod"

export const CreateSubjectSchema = z.object({
  teachingSubject: z.string(),
  school: z.string(),
  schoolEducationLevel: z.string(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateSubjectSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteSubjectSchema = z.object({
  id: z.number(),
})
