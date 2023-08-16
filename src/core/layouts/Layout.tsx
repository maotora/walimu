import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import Footer from "./Footer"
import Header from "./Header"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
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
      <div className="px-4">{children}</div>
      <Footer />
    </>
  )
}

export default Layout
