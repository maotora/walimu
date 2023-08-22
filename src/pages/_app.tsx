import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { MantineProvider } from "@mantine/core"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { useRouter } from "next/router"
import { withBlitz } from "src/blitz-client"
import LoginForm from "src/auth/components/LoginForm"
import "src/styles/globals.css"

import "src/core/styles/index.css"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  const router = useRouter()
  if (error instanceof AuthenticationError) {
    return (
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          return router.push(next)
        }}
      />
    )
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      {getLayout(
        <MantineProvider>
          <Component {...pageProps} />
        </MantineProvider>
      )}
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
