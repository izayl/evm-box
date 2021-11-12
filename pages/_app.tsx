import { CssBaseline, GeistProvider } from '@geist-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
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
          <meta
            name="description"
            content={t('AppDesc')}
          />
          <meta
            name="keywords"
            content="ETH,EVM,EVM Compatible Network,Network,Blockchain,chain"
          />
          <meta property="og:title" content="EVM Box" />
          <meta
            property="og:description"
            content={t('AppDesc')}
          />
        </Head>
        <Component {...pageProps} />
      </GeistProvider>
    </LocaleProvider>
  )
}

export default App
