import { UseFormReturnType } from "@mantine/form"
import { Select, Stack } from "@mantine/core"
import { useEffect, useState, Suspense, Dispatch, ReactEventHandler, SetStateAction } from "react"

export const locationInitialValues = {
  regionName: "",
  districtName: "",
  wardName: "",
  streetName: "",
}

export type locationTypes = {
  regionName: string
  districtName: string
  wardName: string
  streetName: string
}
export type ExternalFormType = {
  form: UseFormReturnType<any>
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
    ? "https://locations-api.onrender.com"
    : "http://192.168.0.105:3000"

export function LocationForm(props: ExternalFormType) {
  const { form } = props
  const [regions, setRegions] = useState([])
  const [selectedRegion, setSelectedRegion] = useState<number>()
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState<number>()
  const [wards, setWards] = useState([])
  const [selectedWard, setSelectedWard] = useState<number>()
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${ROOT_URL}/regions`, { method: "GET" })
      .then(async (res) => {
        const regions = await res.json()
        setRegions(regions)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
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
          defaultValue={loading ? "Loading..." : ""}
          label="School Region"
          placeholder={loading ? "Loading..." : "Choose Region"}
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (regionCode) {
      setLoading(true)
      fetch(`${ROOT_URL}/regions/${regionCode}/districts`)
        .then(async (res) => {
          const { districts } = await res.json()
          setDistricts(handleEscapeLetters(districts, "districtName"))
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }
  }, [regionCode])

  return (
    <Select
      data={parseLocations(districts, "districtName")}
      defaultValue={loading ? "Loading..." : ""}
      label="School District"
      placeholder={loading ? "Loading..." : "Choose District"}
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (districtCode) {
      setLoading(true)
      fetch(`${ROOT_URL}/districts/${districtCode}/wards`)
        .then(async (res) => {
          const { wards } = await res.json()
          setWards(handleEscapeLetters(wards, "wardName"))
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }
  }, [districtCode])

  return (
    <Select
      data={parseLocations(wards, "wardName")}
      label="School Ward"
      placeholder={loading ? "Loading..." : "Choose Ward"}
      defaultValue={loading ? "Loading..." : ""}
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (wardCode) {
      setLoading(true)
      fetch(`${ROOT_URL}/wards/${wardCode}/places`)
        .then(async (res) => {
          const { places } = await res.json()
          const placeNames = places && places.length ? places.map(({ placeName }) => placeName) : []
          const uniqPlaces = new Set(placeNames)
          const placesArr = Array.from(uniqPlaces)
          setPlaces(placesArr)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }
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
      defaultValue={loading ? "Loading..." : ""}
      label="School Place"
      placeholder={loading ? "Loading..." : "Choose Place"}
      {...form.getInputProps("streetName")}
    />
  )
}
