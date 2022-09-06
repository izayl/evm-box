import { CssBaseline } from '@geist-ui/react'
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import Script from 'next/script'
import * as gtag from '../common/ga'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = CssBaseline.flush()

    return {
      ...initialProps,
      styles: [
        <>
          {initialProps.styles}
          {styles}
        </>,
      ],
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="og:image" content="/images/favicon.png" />
          <meta property="og:type" content="website" />
          <link rel="shortcut icon" href="/images/favicon.png" />
          <link rel="icon" sizes="16x16 32x32" href="/images/favicon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
          <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
