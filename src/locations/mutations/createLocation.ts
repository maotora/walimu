import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateLocationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateLocationSchema),
  resolver.authorize(),
  async (input) => {
    const { regionName, districtName, wardName, streetName } = input

    const locationData = await db.location.upsert({
      where: {
        locationsUniqueness: {
          regionName,
          districtName,
          wardName,
          streetName,
        },
      },
      create: input,
      update: input,
    })

    return locationData
  }
)
