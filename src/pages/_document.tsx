import { Html, Head, Main, NextScript } from 'next/document'
import { Poppins } from 'next/font/google'

export default function Document() {
  return (
    <Html lang="en" className="bg-slate-950 text-slate-50">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
