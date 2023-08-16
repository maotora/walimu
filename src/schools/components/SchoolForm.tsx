import { useState, useEffect, SetStateAction, Dispatch, ReactEventHandler, Suspense } from "react"
import { useForm, UseFormReturnType } from "@mantine/form"
import { TextInput, Button, Stack, Container, MultiSelect, Select } from "@mantine/core"
import { EducationLevel, SchoolType } from "@prisma/client"
import { formatItems } from "utils"
import { invoke } from "@blitzjs/rpc"
import createLocation from "src/locations/mutations/createLocation"
import createSchool from "src/schools/mutations/createSchool"

type SchoolFormProps = {
  onSubmit: (arg0: any) => Promise<any>
  submitText: string
}

const initialValues = {
  name: "",
  regionName: "",
  districtName: "",
  wardName: "",
  streetName: "",
  schoolEducationLevel: [EducationLevel.PRIMARY],
  type: SchoolType.NORMAL,
}

type SchoolFormValues = {
  name: string
  regionName: string
  districtName: string
  wardName: string
  streetName: string
  schoolEducationLevel: EducationLevel[]
  type: SchoolType
}

const validate = {
  name: (value: string) => (value.length >= 3 ? null : "School Name must be at least 4 characters"),
}

export default function SchoolForm(props: SchoolFormProps) {
  const { onSubmit, submitText } = props
  const form = useForm({
    initialValues,
    validate,
  })

  async function handleSubmit(values: SchoolFormValues) {
    try {
      const { regionName, districtName, wardName, streetName, ...schoolValues } = values
      const { id: locationId } = await invoke(createLocation, {
        regionName,
        districtName,
        wardName,
        streetName,
      })
      const { id: schooldId } = await invoke(createSchool, {
        ...schoolValues,
        locationId,
      })
      await onSubmit(schooldId)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container maw={500} className="my-24">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <BasicForm form={form} />
        <Suspense fallback="Loading...">
          <LocationForm form={form} />
        </Suspense>
        <Button className="mt-2" type="submit">
          {submitText}
        </Button>
      </form>
    </Container>
  )
}

type ExternalFormType = {
  form: UseFormReturnType<any>
}

function BasicForm(props: ExternalFormType) {
  const { form } = props
  const educationLevelData = [
    {
      value: EducationLevel.PRIMARY,
      label: formatItems(EducationLevel.PRIMARY),
    },
    {
      value: EducationLevel.SECONDARY,
      label: formatItems(EducationLevel.SECONDARY),
    },
    {
      value: EducationLevel.ADVANCE,
      label: formatItems(EducationLevel.ADVANCE),
    },
  ]

  const schoolTypeData = [
    {
      value: SchoolType.NORMAL,
      label: formatItems(SchoolType.NORMAL),
    },
    {
      value: SchoolType.SPECIAL,
      label: formatItems(SchoolType.SPECIAL),
    },
    {
      value: SchoolType.TECH,
      label: formatItems(SchoolType.TECH),
    },
    {
      value: SchoolType.CENTER,
      label: formatItems(SchoolType.CENTER),
    },
  ]

  return (
    <Stack spacing="md">
      <TextInput
        withAsterisk
        label="School Name"
        placeholder="Kiwanja Cha Ndege"
        {...form.getInputProps("name")}
      />

      <MultiSelect
        data={educationLevelData}
        label="Education Level"
        placeholder="Select all levels that applies"
        withAsterisk
        {...form.getInputProps("schoolEducationLevel")}
      />

      <Select
        label="Your School Type"
        placeholder="Pick one"
        data={schoolTypeData}
        defaultValue={initialValues.type}
        {...form.getInputProps("type")}
      />
    </Stack>
  )
}

function parseLocations(locations: any[], name: string) {
  if (locations && locations.length > 0) {
    return locations.map((location) => ({
      label: location[name],
      value: location[name],
    }))
  }
  return []
}

const ROOT_URL =
  process.env.NODE_ENV === "production"
    ? "https://locations.webongo.services"
    : "http://192.168.0.105:3000"

function LocationForm(props: ExternalFormType) {
  const { form } = props
  const [regions, setRegions] = useState([])
  const [selectedRegion, setSelectedRegion] = useState<number>()
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState<number>()
  const [wards, setWards] = useState([])
  const [selectedWard, setSelectedWard] = useState<number>()
  const [places, setPlaces] = useState([])

  useEffect(() => {
    fetch(`${ROOT_URL}/regions`, { method: "GET" })
      .then(async (res) => {
        const regions = await res.json()
        setRegions(regions)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function handleRegionSelect(e: any) {
    type regionType = {
      regionName: string
      regionCode: number
    }
    const regionName = e.target.value
    const [filteredRegion] = regions.filter(
      (region: regionType) => region && region.regionName === regionName
    ) as regionType[]
    if (filteredRegion?.regionCode !== selectedRegion) {
      setSelectedRegion(filteredRegion?.regionCode)
    }
  }

  function handleDistrictsChange(e: any) {
    type districtType = {
      districtName: string
      districtCode: number
    }
    const districtName = e.target.value
    const [filteredDistrict] = districts.filter(
      (district: districtType) => district && district.districtName === districtName
    ) as districtType[]
    if (filteredDistrict?.districtCode !== selectedDistrict) {
      setSelectedDistrict(filteredDistrict?.districtCode)
    }
  }

  function handleWardChange(e: any) {
    type wardType = {
      wardName: string
      wardCode: number
    }
    const wardName = e.target.value
    const [filteredWard] = wards.filter(
      (ward: wardType) => ward && ward.wardName === wardName
    ) as wardType[]
    if (filteredWard?.wardCode !== selectedDistrict) {
      setSelectedWard(filteredWard?.wardCode)
    }
  }

  return (
    <Suspense fallback="Loading...">
      <Stack spacing="md" className="mt-2">
        <Select
          data={parseLocations(regions, "regionName")}
          label="School Region"
          placeholder="Choose Region"
          onSelect={handleRegionSelect}
          {...form.getInputProps("regionName")}
        />
        <DistrictSelect
          regionCode={selectedRegion}
          handleChange={handleDistrictsChange}
          setDistricts={setDistricts}
          districts={districts}
          form={form}
        />
        <WardSelect
          districtCode={selectedDistrict}
          handleChange={handleWardChange}
          setWards={setWards}
          wards={wards}
          form={form}
        />
        <PlaceSelect wardCode={selectedWard} setPlaces={setPlaces} places={places} form={form} />
      </Stack>
    </Suspense>
  )
}

type DistrictSelectProps = {
  handleChange: ReactEventHandler<HTMLInputElement>
  setDistricts: Dispatch<SetStateAction<any[]>>
  form: UseFormReturnType<any>
  regionCode: number | undefined
  districts: any[]
}

function handleEscapeLetters(arr: any[], name: string) {
  if (arr && arr.length > 0) {
    return arr.map((obj) => ({
      ...obj,
      [name]: obj[name].replaceAll("\n", " "),
    }))
  }
  return []
}

function DistrictSelect(props: DistrictSelectProps) {
  const { handleChange, districts, setDistricts, form, regionCode } = props

  useEffect(() => {
    fetch(`${ROOT_URL}/regions/${regionCode}/districts`)
      .then(async (res) => {
        const { districts } = await res.json()
        setDistricts(handleEscapeLetters(districts, "districtName"))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [regionCode])

  return (
    <Select
      data={parseLocations(districts, "districtName")}
      label="School District"
      placeholder="Choose District"
      disabled={!districts}
      onSelect={handleChange}
      {...form.getInputProps("districtName")}
    />
  )
}

type WardSelectionProps = {
  handleChange: ReactEventHandler<HTMLInputElement>
  setWards: Dispatch<SetStateAction<any[]>>
  form: UseFormReturnType<any>
  districtCode: number | undefined
  wards: any[]
}

function WardSelect(props: WardSelectionProps) {
  const { handleChange, wards, setWards, form, districtCode } = props

  useEffect(() => {
    fetch(`${ROOT_URL}/districts/${districtCode}/wards`)
      .then(async (res) => {
        const { wards } = await res.json()
        setWards(handleEscapeLetters(wards, "wardName"))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [districtCode])

  return (
    <Select
      data={parseLocations(wards, "wardName")}
      label="School Ward"
      placeholder="Choose Ward"
      disabled={!wards}
      onSelect={handleChange}
      {...form.getInputProps("wardName")}
    />
  )
}

type PlaceSelectProps = {
  setPlaces: Dispatch<SetStateAction<any[]>>
  form: UseFormReturnType<any>
  wardCode: number | undefined
  places: any[]
}

function PlaceSelect(props: PlaceSelectProps) {
  const { places, setPlaces, form, wardCode } = props

  useEffect(() => {
    fetch(`${ROOT_URL}/wards/${wardCode}/places`)
      .then(async (res) => {
        const { places } = await res.json()
        const placeNames = places && places.length ? places.map(({ placeName }) => placeName) : []
        const uniqPlaces = new Set(placeNames)
        const placesArr = Array.from(uniqPlaces)
        setPlaces(placesArr)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [wardCode])

  function parsePlaces(places: any[]) {
    if (places && places.length > 0) {
      return places.map((place) => ({
        label: place,
        value: place,
      }))
    }
    return []
  }

  return (
    <Select
      data={parsePlaces(places)}
      disabled={!places}
      label="School Place"
      placeholder="Choose Place"
      {...form.getInputProps("streetName")}
    />
  )
}
