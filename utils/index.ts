import Prisma, {
  Location,
  School,
  SchoolEducationLevel,
  Subject,
  TeachingSubject,
} from "@prisma/client"
import { PostsWithIncludes } from "src/posts/components/PostsList"
import { TeachingSubjectWithInclude } from "src/posts/components/PostView"

export function tailwindClassNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

export function formatItems(val: string): string {
  switch (val) {
    case "MALE": {
      return "Male"
    }
    case "FEMALE": {
      return "Female"
    }
    case "ADVANCE": {
      return "High School"
    }
    case "SECONDARY": {
      return "Secondary School"
    }
    case "PRIMARY": {
      return "Primary School"
    }
    case "NORMAL": {
      return "Normal School"
    }
    case "TECH": {
      return "Technical School"
    }
    case "SPECIAL": {
      return "Special Needs School"
    }
    case "CENTER": {
      return "Education Center"
    }
    default: {
      return val
    }
  }
}

export function getTeachingSubjects(subjects: TeachingSubjectWithInclude[]): string {
  const subjectsStr = subjects.map(({ subject: { name, level } }) => `${level}: ${name}`)

  return subjectsStr.join(" ")
}

export function createLocationName(locationData?: Location, withoutStreet?: boolean): string {
  if (locationData) {
    const withStreet = `${locationData.regionName} | ${locationData.districtName} | ${locationData.wardName} | ${locationData.streetName}`
    const notWithStreet = `${locationData.regionName} | ${locationData.districtName} | ${locationData.wardName}`

    return withoutStreet ? notWithStreet : withStreet
  }

  return "No Location"
}

export function trimSchoolTitle(title: string): string {
  return title.replace("School", "").trim()
}

export function schoolLevelsToString(levels: SchoolEducationLevel[]): string {
  return levels.reduce((acc, { level }, idx, arrRef) => {
    if (idx === 0 && idx === arrRef.length - 1) {
      return `${formatItems(level)}`
    }

    if (idx !== 0 && idx === arrRef.length - 1) {
      return `${acc}, & ${formatItems(level)}`
    }

    if (idx === 0 && idx !== arrRef.length - 1) {
      return trimSchoolTitle(formatItems(level))
    }

    return `${acc}, ${trimSchoolTitle(formatItems(level))}`
  }, "")
}

export function parseDistrictCBD(district: string): string {
  return district.replace("CBD", "MJINI")
}

type locationNamesType = "districtName" | "wardName" | "regionName"

export function getSchoolLocationName(
  post: PostsWithIncludes,
  locationName: locationNamesType,
  parse?: boolean
): string {
  const { currentSchool } = post.user
  if (currentSchool) {
    const name: string = currentSchool.location[locationName]

    return parse ? parseDistrictCBD(name) : name
  }

  return "School details not provided."
}

export function createPostTitle(post: PostsWithIncludes): string {
  const { currentSchool } = post.user

  if (currentSchool) {
    const { name: schoolName }: School = currentSchool
    const { levels } = currentSchool

    return `${trimSchoolTitle(schoolName)} ${schoolLevelsToString(levels)}`
  }

  return "School details not provided."
}
