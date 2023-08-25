import Image from "next/image"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"

export default function HomePage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="relative px-6 isolate lg:px-8">
          <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Fundisha kwa amani ukiwa karibu na uwapendao.
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-8">
                Tunakurahisishia zoezi la kupata mwalimu mwezako anayehitaji kuhamia kituo ulipo na
                wewe kuhamia alipo.
              </p>
              <div className="flex items-center justify-center mt-10 gap-x-6">
                <Link
                  href="/posts"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Matangazo ya Kuhama
                </Link>
                <Link href="/about" legacyBehavior>
                  <a className="text-sm font-semibold text-gray-900 leading-6">
                    Kuhusu Sisi <span aria-hidden="true">→</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <HowTo />
      </div>
    </Layout>
  )
}

const posts = [
  {
    id: 1,
    title: "Jisajiri kwenye mfumo",
    href: "/auth/login",
    description:
      "Jisajiri kwenye mfumo wa kuhama walimu ili uweze kuanza safari yako ya kupata mwalimu anayehitaji kuhamia eneo lako la kazi.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
  },
  {
    id: 2,
    title: "Weka maelezo ya shule yako",
    href: "/schools/new",
    description:
      "Weka maelezo ya shule unayofundisha sasa, ambayo ni, jina la shule, aina ya shule, masomo unayofundisha hapo shuleni na mahali inapopatikana.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
  },
  {
    id: 3,
    title: "Weka maudhui yako wazi",
    href: "/posts/new",
    description:
      "Weka wazi maudhui yako kupitia post zetu, maudhui yenye kusudi la kutangaza uhitaji wako wa kupata mwalimu wa kubadilishiana nae vituo vya kazi.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
  },
]

function HowTo() {
  return (
    <div className="px-6 mx-auto mb-8 max-w-7xl lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Jinsi ya Kutumia
        </h2>
      </div>
      <div className="max-w-2xl mx-auto mt-16 grid auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="relative overflow-hidden bg-gray-900 isolate rounded-2xl"
          >
            <img src={post.imageUrl} alt="" className="object-cover w-full h-64" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white leading-6">
                <Link href={post.href} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 text-gray-300">{post.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
