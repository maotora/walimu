import React, { Suspense, useEffect, useState } from "react"
import { useForm } from "@mantine/form"
import { Button, Title, Stack, Select, Container, MultiSelect } from "@mantine/core"
import {
  LocationForm,
  ExternalFormType,
  locationInitialValues,
  locationTypes,
} from "src/locations/components/LocationForm"
import { SchoolType, Subject, Prisma } from "@prisma/client"
import { useAuthenticatedSession } from "@blitzjs/auth"
import { invoke, useQuery } from "@blitzjs/rpc"
import createLocation from "src/locations/mutations/createLocation"
import getSubjects from "src/subjects/queries/getSubjects"
import createPost from "../mutations/createPost"
import getSchools from "src/schools/queries/getSchools"
import { schoolTypeData } from "src/schools/components/SchoolForm"

type SchoolsWithIncludes = Prisma.SchoolGetPayload<{
  include: {
    levels: true
  }
}>

const initialValues = {
  subjectIds: [],
  type: SchoolType.NORMAL,
  ...locationInitialValues,
}

type postFormValues = {
  subjectIds: Subject[] | string
  type: SchoolType
} & locationTypes

const validate = {
  subjectIds: (value: Subject[]) => (value.length > 1 ? null : "You must add subjects"),
}

type PostFormProps = {
  onSubmit: (args: any) => void
  submitText: string
}

export default function PostForm(props: PostFormProps) {
  const { onSubmit, submitText } = props
  const form = useForm({
    initialValues,
    validate,
  })

  async function handleSubmit(values: postFormValues) {
    try {
      console.log("Submitting...")
      const { regionName, districtName, wardName, streetName, ...postValues } = values
      const locationResponse = await invoke(createLocation, {
        regionName,
        districtName,
        wardName,
        streetName,
      })
      const postResponse = await invoke(createPost, {
        locationIds: [locationResponse.id],
        ...postValues,
      })

      onSubmit(postResponse.id)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container maw={500} className="my-24">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LocationForm form={form} />
        <BasicForm form={form} />
        <Button type="submit" className="my-4">
          {submitText}
        </Button>
      </form>
    </Container>
  )
}

type formDataType = {
  label: string
  value: number | any
}

function getLevelsFromSchool(school: SchoolsWithIncludes) {
  return school.levels.map(({ level }) => level)
}

function BasicForm(props: ExternalFormType) {
  const { form } = props
  const [subjectsData, setSubjectsData] = useState<formDataType[]>([])
  const { userId } = useAuthenticatedSession()
  const [{ schools }] = useQuery(getSchools, {
    where: {
      teachers: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      levels: true,
    },
  })
  const [school] = schools
  const [{ subjects }] = useQuery(getSubjects, {
    where: {
      level: {
        in: getLevelsFromSchool(school as SchoolsWithIncludes),
      },
    },
  })

  useEffect(() => {
    if (subjects.length > 0) {
      const rawSubjectsData = subjects.map(({ name, id, level }) => ({
        label: `${level} | ${name}`,
        value: id,
      }))

      setSubjectsData(rawSubjectsData)
    }
  }, [subjects])

  return (
    <Stack spacing="md">
      <Select
        label="Your School Type"
        placeholder="Pick one"
        data={schoolTypeData}
        defaultValue={initialValues.type}
        {...form.getInputProps("type")}
      />

      <MultiSelect
        data={subjectsData}
        label="Subjects"
        placeholder="Select all subjects that applies"
        withAsterisk
        {...form.getInputProps("subjectIds")}
      />
    </Stack>
  )
}
