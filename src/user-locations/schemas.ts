import { z } from "zod"

export const CreateUserLocationSchema = z.object({
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
export const UpdateUserLocationSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteUserLocationSchema = z.object({
  id: z.number(),
})
