import { z } from "zod"

export const CreateSchoolEducationLevelSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateSchoolEducationLevelSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteSchoolEducationLevelSchema = z.object({
  id: z.number(),
})
