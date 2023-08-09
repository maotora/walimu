import { z } from "zod"

export const CreatePostLocationSchema = z.object({
  post: z.string(),
  viewer: z.string(),
  watcher: z.string(),
  subject: z.string(),
  teachingSubject: z.string(),
  school: z.string(),
  schoolEducationLevel: z.string(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdatePostLocationSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeletePostLocationSchema = z.object({
  id: z.number(),
})
