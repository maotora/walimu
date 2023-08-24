import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateContactSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateContactSchema),
  resolver.authorize(),
  async (input) => {
    const contact = await db.contact.create({ data: input })

    return contact
  }
)
