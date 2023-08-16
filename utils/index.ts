import { Location } from "@prisma/client"

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
      return "Advance"
    }
    case "SECONDARY": {
      return "Secondary"
    }
    case "PRIMARY": {
      return "Primary"
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

export function createLocationName(locationData: Location): string {
  return `${locationData.regionName} > ${locationData.districtName} > ${locationData.wardName} > ${locationData.streetName}`
}
