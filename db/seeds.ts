import db from "./index"
import { subjects } from "./subjects"

const seed = async () => {
  await db.subject.createMany({ data: subjects })

  console.log("Subjects Created! ✨")
}

export default seed
