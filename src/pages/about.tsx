import { GlobeAltIcon, ArrowUpCircleIcon, LockClosedIcon } from "@heroicons/react/20/solid"
import Layout from "src/core/layouts/Layout"

export default function AboutPage() {
  return (
    <Layout>
      <div className="relative py-24 overflow-hidden bg-white isolate sm:py-32">
        <div
          className="absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
          aria-hidden="true"
        >
          <div
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(63.1% 29.6%, 100% 17.2%, 76.7% 3.1%, 48.4% 0.1%, 44.6% 4.8%, 54.5% 25.4%, 59.8% 49.1%, 55.3% 57.9%, 44.5% 57.3%, 27.8% 48%, 35.1% 81.6%, 0% 97.8%, 39.3% 100%, 35.3% 81.5%, 97.2% 52.8%, 63.1% 29.6%)",
            }}
          />
        </div>
        <div className="flex flex-col w-full px-6 mx-auto md:flex-row max-w-7xl lg:px-8">
          <div className="w-full md:w-3/5">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <p className="text-lg font-semibold tracking-tight text-blue-600 leading-8">
                Kupeleka Haraka
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Mchakato Bora wa Kazi
              </h1>
              <p className="mt-6 text-base text-gray-700 md:text-lg lg:text-base leading-7">
                MbuyuFikra, shirika lililoanzishwa mkoani Dodoma, Tanzania, linajitahidi kuboresha
                maisha ya jamii kupitia miradi mbalimbali. Moja ya miradi yetu ni kubuni na
                kutekeleza programu inayosaidia walimu kupata wenzao wa kubadilishana shule
                kulingana na aina ya shule, masomo wanayofundisha, na eneo la shule hiyo.
              </p>
            </div>
            <div className="max-w-xl text-base text-gray-700 md:text-lg lg:text-base leading-7 lg:col-span-7">
              <p>
                Kupitia programu hii, walimu wanaweza kufanya mabadilishano ya shule kwa urahisi na
                ufanisi zaidi. Tunathamini mchango wa walimu wetu katika kuboresha elimu na tunataka
                kuhakikisha kuwa rasilimali hii inasaidia katika kufikia malengo yetu ya pamoja.
              </p>
              <ul
                role="list"
                className="max-w-xl mt-6 text-gray-600 md:mt-8 lg:mt-6 space-y-6 md:space-y-8"
              >
                <li className="flex gap-x-3">
                  <ArrowUpCircleIcon
                    className="flex-none w-5 h-5 mt-1 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="text-base md:text-lg lg:text-base">
                    <strong className="font-semibold text-gray-900">Kupeleka Haraka.</strong>{" "}
                    Programu yetu inaruhusu walimu kubadilishana shule kwa urahisi na haraka. Hii
                    inasaidia kuboresha mazingira ya kazi kwa walimu.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon
                    className="flex-none w-5 h-5 mt-1 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="text-base md:text-lg lg:text-base">
                    <strong className="font-semibold text-gray-900">Usalama wa Takwimu.</strong>{" "}
                    Tunaipa kipaumbele usalama wa taarifa za walimu na shule. Takwimu zote
                    zinahifadhiwa kwa njia salama na za siri.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <GlobeAltIcon
                    className="flex-none w-5 h-5 mt-1 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="text-base md:text-lg lg:text-base">
                    <strong className="font-semibold text-gray-900">Kanda Toofauti.</strong>{" "}
                    Programu yetu inaruhusu walimu kubadilishana shule kwa kuzingatia eneo lao na
                    aina ya shule wanazopendelea kufundisha.
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-base text-gray-700 md:text-lg lg:text-base leading-7">
                Aidha, tunatoa taarifa za mabadilishano kwa walimu pale eneo linalopendelewa na
                mwalimu mmoja linapolingana na posti ya mwalimu mwingine. Taarifa hizi zinaweza
                kutolewa kupitia barua pepe au ujumbe mfupi wa SMS. Pia, tunapenda kuwahakikishia
                walimu kuwa hatutaweka hadharani taarifa zao za mawasiliano hadi watakapokubali ombi
                la kubadilishana shule lililowasilishwa na mwalimu mwingine anayependa kubadilishana
                shule hiyo.
              </p>
            </div>
          </div>
          <div className="w-full mt-8 md:w-2/5 md:mt-0 md:self-center">
            <div className="relative lg:order-last lg:col-span-5">
              <svg
                className="absolute -top-[40rem] left-1 -z-10 h-[64rem] w-[175.5rem] -translate-x-1/2 stroke-gray-900/10 [mask-image:radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e87443c8-56e4-4c20-9111-55b82fa704e3"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M0.5 0V200M200 0.5L0 0.499983" />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)"
                />
              </svg>
              <figure className="pl-8 border-l border-blue-600">
                <blockquote className="text-xl font-semibold tracking-tight text-gray-900 leading-8">
                  <p>
                    “The power of education extends beyond the development of skills we need for
                    economic success. It can contribute to nation-building and reconciliation.”
                  </p>
                </blockquote>
                <figcaption className="flex mt-8 gap-x-4">
                  <div className="text-sm leading-6">
                    <div className="font-semibold text-gray-900">Nelson Mandela</div>
                    <div className="text-gray-600">
                      Anti-Apartheid Revolutionary, Former President of South Africa
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

/*
const people = [
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    bio: "Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.",
  },
  // More people...
]

export function OurTeam() {
  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            We’re a dynamic group of individuals who are passionate about what we do and dedicated
            to delivering the best results for our clients.
          </p>
        </div>
        <ul
          role="list"
          className="max-w-2xl mx-auto mt-20 grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
        >
          {people.map((person) => (
            <li key={person.name} className="flex flex-col gap-6 xl:flex-row">
              <img
                className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
                src={person.imageUrl}
                alt=""
              />
              <div className="flex-auto">
                <h3 className="text-lg font-semibold tracking-tight text-gray-900 leading-8">
                  {person.name}
                </h3>
                <p className="text-base text-gray-600 leading-7">{person.role}</p>
                <p className="mt-6 text-base text-gray-600 leading-7">{person.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

*/
