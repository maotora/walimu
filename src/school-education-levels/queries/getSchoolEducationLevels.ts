import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetSchoolEducationLevelsInput
  extends Pick<Prisma.SchoolEducationLevelFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSchoolEducationLevelsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: schoolEducationLevels,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.schoolEducationLevel.count({ where }),
      query: (paginateArgs) =>
        db.schoolEducationLevel.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      schoolEducationLevels,
      nextPage,
      hasMore,
      count,
    }
  }
)
