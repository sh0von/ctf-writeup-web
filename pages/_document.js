import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang="en">
    <Head>
      <meta property='og:image' content='../C-Sec.png' />
    {/* Other meta tags, link tags, or styles can be added here */}
  </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
