import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetSubjectsInput
  extends Pick<Prisma.SubjectFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSubjectsInput) => {
    const {
      items: subjects,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.subject.count({ where }),
      query: (paginateArgs) => db.subject.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      subjects,
      nextPage,
      hasMore,
      count,
    }
  }
)
