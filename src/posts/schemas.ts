import { z } from "zod"

export const CreatePostSchema = z.object({
  viewer: z.string(),
  watcher: z.string(),
  subject: z.string(),
  teachingSubject: z.string(),
  school: z.string(),
  schoolEducationLevel: z.string(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdatePostSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeletePostSchema = z.object({
  id: z.number(),
})
