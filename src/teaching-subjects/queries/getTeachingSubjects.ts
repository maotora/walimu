import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetTeachingSubjectsInput
  extends Pick<Prisma.TeachingSubjectFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTeachingSubjectsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: teachingSubjects,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.teachingSubject.count({ where }),
      query: (paginateArgs) => db.teachingSubject.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      teachingSubjects,
      nextPage,
      hasMore,
      count,
    }
  }
)
