import Link from "next/link"
import Layout from "src/core/layouts/Layout"

export default function HomePage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="relative px-6 isolate lg:px-8">
          <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative px-3 py-1 text-sm text-gray-600 rounded-full leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Announcing our next round of funding.{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Fundisha kwa amani ukiwa karibu na uwapendao.
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-8">
                Tunakurahisishia zoezi la kupata mwalimu mwezako anayehitaji kuhamia kituo ulipo na
                wewe kuhamia alipo.
              </p>
              <div className="flex items-center justify-center mt-10 gap-x-6">
                <Link href="/auth/login" legacyBehavior>
                  <a className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Anza Nasi
                  </a>
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
      </div>
    </Layout>
  )
}
