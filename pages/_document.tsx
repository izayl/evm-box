import { CssBaseline } from '@geist-ui/react'
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = CssBaseline.flush()

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <title>EVM Box</title>
          <meta name="description" content="use EVM Compatible Network with ease." />
          <meta name="keywords" content="ETH,EVM,EVM Compatible Network,Network,Blockchain,chain" />
          <meta property="og:title" content="EVM Box"/>
          <meta property="og:description" content="use EVM Compatible Network with ease."/>
          <meta property="og:image" content="/images/favicon.png"/>
          <meta property="og:type" content="website" />
          <link rel="shortcut icon" href="/images/favicon.png" />
          <link rel="icon" sizes="16x16 32x32" href="/images/favicon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
          <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
