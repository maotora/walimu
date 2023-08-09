import { z } from "zod"

export const CreateLocationSchema = z.object({
  userLocation: z.string(),
  postLocation: z.string(),
  post: z.string(),
  viewer: z.string(),
  watcher: z.string(),
  subject: z.string(),
  teachingSubject: z.string(),
  school: z.string(),
  schoolEducationLevel: z.string(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateLocationSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteLocationSchema = z.object({
  id: z.number(),
})
