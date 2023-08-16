import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from "@heroicons/react/20/solid"
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
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <p className="text-lg font-semibold tracking-tight text-indigo-600 leading-8">
              Deploy faster
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              A better workflow
            </h1>
            <p className="mt-6 text-xl text-gray-700 leading-8">
              Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi,
              nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci
              at in viverra scelerisque eget. Eleifend egestas fringilla sapien.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-16 grid grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
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
              <figure className="pl-8 border-l border-indigo-600">
                <blockquote className="text-xl font-semibold tracking-tight text-gray-900 leading-8">
                  <p>
                    “Vel ultricies morbi odio facilisi ultrices accumsan donec lacus purus. Lectus
                    nibh ullamcorper ac dictum justo in euismod. Risus aenean ut elit massa. In amet
                    aliquet eget cras. Sem volutpat enim tristique.”
                  </p>
                </blockquote>
                <figcaption className="flex mt-8 gap-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="flex-none w-10 h-10 mt-1 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <div className="font-semibold text-gray-900">Brenna Goyette</div>
                    <div className="text-gray-600">@brenna</div>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="max-w-xl text-base text-gray-700 leading-7 lg:col-span-7">
              <p>
                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis
                mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio
                penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa
                rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                vitae sed turpis id.
              </p>
              <ul role="list" className="max-w-xl mt-8 text-gray-600 space-y-8">
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon
                    className="flex-none w-5 h-5 mt-1 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">Push to deploy.</strong> Lorem
                    ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
                    suscipit eaque, iste dolor cupiditate blanditiis ratione.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon
                    className="flex-none w-5 h-5 mt-1 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">SSL certificates.</strong> Anim
                    aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                    commodo.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon
                    className="flex-none w-5 h-5 mt-1 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">Database backups.</strong> Ac
                    tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi
                    lobortis.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id
                blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel.
                Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac
                tempor et ut. Ac lorem vel integer orci.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                No server? No problem.
              </h2>
              <p className="mt-6">
                Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis
                arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat
                vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris.
                Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
                ipsum eu a sed convallis diam.
              </p>
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
