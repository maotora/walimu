import { z } from "zod"

export const CreateViewerSchema = z.object({
  watcher: z.string(),
  subject: z.string(),
  teachingSubject: z.string(),
  school: z.string(),
  schoolEducationLevel: z.string(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateViewerSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteViewerSchema = z.object({
  id: z.number(),
})
