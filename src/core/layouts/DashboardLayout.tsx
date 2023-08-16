import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import Footer from "./Footer"
import Header from "./Header"
import SideBar from "./Sidebar"

const DashboardLayout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Kuhama Walimu"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
        <Suspense fallback="Loading...">
          <SideBar />
        </Suspense>
        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="max-w-2xl mx-auto space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default DashboardLayout
