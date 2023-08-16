import { useState } from "react"
import { Disclosure, RadioGroup } from "@headlessui/react"
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline"
import { CheckIcon } from "@heroicons/react/20/solid"
import Layout from "src/core/layouts/Layout"
import { tailwindClassNames as classNames } from "utils"

const pricing = {
  frequencies: [
    { value: "monthly", label: "Monthly", priceSuffix: "/month" },
    { value: "annually", label: "Annually", priceSuffix: "/year" },
  ],
  tiers: [
    {
      name: "Hobby",
      id: "tier-hobby",
      href: "#",
      price: { monthly: "$15", annually: "$144" },
      description: "The essentials to provide your best work for clients.",
      features: ["5 products", "Up to 1,000 subscribers", "Basic analytics"],
      mostPopular: false,
    },
    {
      name: "Freelancer",
      id: "tier-freelancer",
      href: "#",
      price: { monthly: "$30", annually: "$288" },
      description: "The essentials to provide your best work for clients.",
      features: [
        "5 products",
        "Up to 1,000 subscribers",
        "Basic analytics",
        "48-hour support response time",
      ],
      mostPopular: false,
    },
    {
      name: "Startup",
      id: "tier-startup",
      href: "#",
      price: { monthly: "$60", annually: "$576" },
      description: "A plan that scales with your rapidly growing business.",
      features: [
        "25 products",
        "Up to 10,000 subscribers",
        "Advanced analytics",
        "24-hour support response time",
        "Marketing automations",
      ],
      mostPopular: true,
    },
    {
      name: "Enterprise",
      id: "tier-enterprise",
      href: "#",
      price: { monthly: "$90", annually: "$864" },
      description: "Dedicated support and infrastructure for your company.",
      features: [
        "Unlimited products",
        "Unlimited subscribers",
        "Advanced analytics",
        "1-hour, dedicated support response time",
        "Marketing automations",
        "Custom reporting tools",
      ],
      mostPopular: false,
    },
  ],
}
const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
]
export default function PricingPage() {
  const [frequency, setFrequency] = useState(pricing.frequencies[0])

  return (
    <Layout>
      <div className="bg-white">
        <main>
          {/* Pricing section */}
          <div className="px-6 mx-auto mt-16 max-w-7xl sm:mt-32 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-base font-semibold text-indigo-600 leading-7">Pricing</h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Pricing plans for teams of&nbsp;all&nbsp;sizes
              </p>
            </div>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-center text-gray-600 leading-8">
              Choose an affordable plan that’s packed with the best features for engaging your
              audience, creating customer loyalty, and driving sales.
            </p>
            <div className="flex justify-center mt-16">
              <RadioGroup
                value={frequency}
                onChange={setFrequency}
                className="p-1 text-xs font-semibold text-center rounded-full grid grid-cols-2 gap-x-1 leading-5 ring-1 ring-inset ring-gray-200"
              >
                <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
                {pricing.frequencies.map((option) => (
                  <RadioGroup.Option
                    key={option.value}
                    value={option}
                    className={({ checked }) =>
                      classNames(
                        checked ? "bg-indigo-600 text-white" : "text-gray-500",
                        "cursor-pointer rounded-full px-2.5 py-1"
                      )
                    }
                  >
                    <span>{option.label}</span>
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
            <div className="max-w-md mx-auto mt-10 isolate grid grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
              {pricing.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={classNames(
                    tier.mostPopular ? "ring-2 ring-indigo-600" : "ring-1 ring-gray-200",
                    "rounded-3xl p-8"
                  )}
                >
                  <h2
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                      "text-lg font-semibold leading-8"
                    )}
                  >
                    {tier.name}
                  </h2>
                  <p className="mt-4 text-sm text-gray-600 leading-6">{tier.description}</p>
                  <p className="flex items-baseline mt-6 gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      {tier.price[frequency?.value!]}
                    </span>
                    <span className="text-sm font-semibold text-gray-600 leading-6">
                      {frequency?.priceSuffix}
                    </span>
                  </p>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                        : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                      "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    )}
                  >
                    Buy plan
                  </a>
                  <ul role="list" className="mt-8 text-sm text-gray-600 space-y-3 leading-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          className="flex-none w-5 h-6 text-indigo-600"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ section */}
          <div className="px-6 mx-auto my-24 max-w-7xl sm:my-56 lg:px-8">
            <div className="max-w-4xl mx-auto divide-y divide-gray-900/10">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 leading-10">
                Frequently asked questions
              </h2>
              <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                {faqs.map((faq) => (
                  <Disclosure as="div" key={faq.question} className="pt-6">
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-900">
                            <span className="text-base font-semibold leading-7">
                              {faq.question}
                            </span>
                            <span className="flex items-center ml-6 h-7">
                              {open ? (
                                <MinusSmallIcon className="w-6 h-6" aria-hidden="true" />
                              ) : (
                                <PlusSmallIcon className="w-6 h-6" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="pr-12 mt-2">
                          <p className="text-base text-gray-600 leading-7">{faq.answer}</p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

/*
function TestimonialSection() {
  return (
    <div className="mx-auto mt-24 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
      <div className="relative px-6 py-20 overflow-hidden bg-gray-900 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
        <img
          className="absolute inset-0 object-cover w-full h-full brightness-150 saturate-0"
          src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
          alt=""
        />
        <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
        <div className="absolute -left-80 -top-56 transform-gpu blur-3xl" aria-hidden="true">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="relative max-w-2xl mx-auto lg:mx-0">
          <img
            className="w-auto h-12"
            src="https://tailwindui.com/img/logos/workcation-logo-white.svg"
            alt=""
          />
          <figure>
            <blockquote className="mt-6 text-lg font-semibold text-white sm:text-xl sm:leading-8">
              <p>
                “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas
                culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.”
              </p>
            </blockquote>
            <figcaption className="mt-6 text-base text-white">
              <div className="font-semibold">Judith Black</div>
              <div className="mt-1">CEO of Workcation</div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}

 */
