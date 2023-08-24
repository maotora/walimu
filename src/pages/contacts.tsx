import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline"
import Layout from "src/core/layouts/Layout"
import createContact from "src/contacts/mutations/createContact"
import { useMutation } from "@blitzjs/rpc"
import { Notification, Button } from "@mantine/core"
import { Textarea, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react"

const validate = {
  inqury: (value: string) =>
    value.length >= 10 ? null : "Inqury should be at least 10 characters.",
  names: (value: string) =>
    value.length >= 3 ? null : "Names has to be at least 3 characters long.",
  phone: (value: string) =>
    value.length >= 10 ? null : "Phone number has to be at least 10 characters long",
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
}

const initialValues = {
  phone: "",
  email: "",
  names: "",
  inqury: "",
}

type contactValueType = {
  phone: string
  email: string
  names: string
  inqury: string
}

export default function ContactsPage() {
  const [loading, setLoading] = useState(false)
  const [createContactMutation] = useMutation(createContact)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)

  const form = useForm({
    validate,
    initialValues,
  })

  async function handleSubmit(values: contactValueType) {
    try {
      setLoading(true)
      await createContactMutation(values)
      setLoading(false)
      setShowSuccessNotification(true)
      form.reset()
    } catch (err) {
      console.log(err)
      setShowErrorNotification(true)
    }
  }

  return (
    <Layout>
      <div className="relative bg-white isolate">
        {showSuccessNotification && (
          <Notification
            onClose={() => setShowSuccessNotification(false)}
            className="right-0 w-2/3 md:w-1/2"
          >
            Ujumbe umetumwa vema!
          </Notification>
        )}

        {showErrorNotification && (
          <Notification
            onClose={() => setShowErrorNotification(false)}
            className="right-0 w-2/3 md:w-1/2"
          >
            Ujumbe umekwama kwenda, tefadhali jaribu tena.
          </Notification>
        )}
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="max-w-xl mx-auto lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 w-full overflow-hidden bg-gray-100 -z-10 ring-1 ring-gray-900/10 lg:w-1/2">
                <svg
                  className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                      width={200}
                      height={200}
                      x="100%"
                      y={-1}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" strokeWidth={0} fill="white" />
                  <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                  </svg>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Get in touch</h2>
              <p className="mt-6 text-lg text-gray-600 leading-8">
                Our Support Team is well trained, and very active to take your inquries, you can
                fill the form or get in a quick call with us, just be sure to do so in working
                hours.
              </p>
              <dl className="mt-10 text-base text-gray-600 space-y-4 leading-7">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <BuildingOffice2Icon className="w-6 text-gray-400 h-7" aria-hidden="true" />
                  </dt>
                  <dd>
                    41115, Dodoma CBD
                    <br />
                    Dodoma, Tanzania, East Africa.
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon className="w-6 text-gray-400 h-7" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-gray-900" href="tel:+255 (626) 763-274">
                      +255 (626) 763-274
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon className="w-6 text-gray-400 h-7" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-gray-900" href="mailto:support@kuhamawalimu.com">
                      support@kuhamawalimu.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
          >
            <div className="max-w-xl mx-auto lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-900 leading-6"
                  >
                    Names
                  </label>
                  <div className="mt-2.5">
                    <TextInput
                      type="text"
                      name="names"
                      id="names"
                      {...form.getInputProps("names")}
                      autoComplete="given-name"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 leading-6"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <TextInput
                      type="email"
                      name="email"
                      id="email"
                      {...form.getInputProps("email")}
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-900 leading-6"
                  >
                    Phone number
                  </label>
                  <div className="mt-2.5">
                    <TextInput
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      {...form.getInputProps("phone")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="inqury"
                    className="block text-sm font-semibold text-gray-900 leading-6"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <Textarea
                      name="inqury"
                      id="inqury"
                      rows={4}
                      {...form.getInputProps("inqury")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <Button type="submit" loading={loading}>
                  Tuma Ujumbe
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
