import React from 'react'
import { AuthContextProvider } from '~/context/auth-context'
import { ReactQueryProvider } from '~/context/query-context'

export function GlobalContext({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ReactQueryProvider>
  )
}
