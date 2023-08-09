import { z } from "zod"

export const CreateWatcherSchema = z.object({
  subject: z.string(),
  teachingSubject: z.string(),
  school: z.string(),
  schoolEducationLevel: z.string(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateWatcherSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteWatcherSchema = z.object({
  id: z.number(),
})
