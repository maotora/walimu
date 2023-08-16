import { resolver } from "@blitzjs/rpc"
import db, { EducationLevel, School } from "db"
import { Ctx } from "blitz"
import { CreateSchoolSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateSchoolSchema),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    const { schoolEducationLevel, userId: providedUserId, ...schoolInput } = input
    const userId = ctx.session.userId || providedUserId

    const school = db.$transaction(async (trx) => {
      const school: School = await trx.school.create({
        data: {
          ...schoolInput,
          teachers: {
            connect: {
              id: userId,
            },
          },
        },
      })

      const educationLevels = schoolEducationLevel.map((level: EducationLevel) => ({
        schoolId: school.id,
        level,
      }))

      await trx.schoolEducationLevel.createMany({ data: educationLevels })

      return school
    })

    return school
  }
)
