import Document, { DocumentContext, Html, Main, NextScript, Head } from "next/document"
import { createGetInitialProps } from "@mantine/next"

const getInitialProps = createGetInitialProps()

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, ...getInitialProps }
  }

  render() {
    return (
      <Html lang="en" className="h-full">
        <Head />
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
