import { Suspense } from "react"
import { useForm } from "@mantine/form"
import { TextInput, Button, Stack, Container, MultiSelect, Select } from "@mantine/core"
import { EducationLevel, SchoolType } from "@prisma/client"
import { formatItems } from "utils"
import { invoke } from "@blitzjs/rpc"
import createLocation from "src/locations/mutations/createLocation"
import createSchool from "src/schools/mutations/createSchool"
import {
  LocationForm,
  ExternalFormType,
  locationInitialValues,
  locationTypes,
} from "src/locations/components/LocationForm"

type SchoolFormProps = {
  onSubmit: (arg0: any) => Promise<any>
  submitText: string
}

const initialValues = {
  name: "",
  ...locationInitialValues,
  schoolEducationLevel: [EducationLevel.PRIMARY],
  type: SchoolType.NORMAL,
}

type SchoolFormValues = {
  name: string
  schoolEducationLevel: EducationLevel[]
  type: SchoolType
} & locationTypes

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

export const educationLevelData = [
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

export const schoolTypeData = [
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

function BasicForm(props: ExternalFormType) {
  const { form } = props

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
