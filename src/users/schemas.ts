import { z } from "zod"

export const CreateUserSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateUserSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteUserSchema = z.object({
  id: z.number(),
})
