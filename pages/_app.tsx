import { CssBaseline, GeistProvider } from '@geist-ui/react'
import { AppProps } from 'next/app'
import Script from 'next/script'
import Head from 'next/head'
import * as gtag from '../common/ga'
import { LocaleProvider, useLocale } from '../common/hooks/useLocale'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const t = useLocale()
  return (
    <LocaleProvider>
      <GeistProvider>
        <CssBaseline />
        <Head>
          <title>{t('AppName')}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <meta name="description" content={t('AppDesc')} />
          <meta
            name="keywords"
            content="ETH,EVM,EVM Compatible Network,Network,Blockchain,chain"
          />
          <meta property="og:title" content="EVM Box" />
          <meta property="og:description" content={t('AppDesc')} />
        </Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
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
        <Component {...pageProps} />
      </GeistProvider>
    </LocaleProvider>
  )
}

export default App
