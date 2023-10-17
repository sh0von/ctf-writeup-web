import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">        
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    {/* Other meta tags, link tags, or styles can be added here */}
  </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
