import { useEffect, useState } from 'react'
import { CssBaseline, GeistProvider, useTheme } from '@geist-ui/react'
import { AppProps } from 'next/app'
import Script from 'next/script'
import Head from 'next/head'
import * as gtag from '../common/ga'
import { LocaleProvider, useLocale } from '../common/hooks/useLocale'
import { ThemeProvider } from '../common/hooks/useThemeContext'
import useThemeDetector from '../common/hooks/useThemeDetector'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const t = useLocale()
  const theme = useTheme()
  const isDarkTheme = useThemeDetector()
  const [themeType, setThemeType] = useState(isDarkTheme ? 'light' : 'dark')
  const switchTheme = (type: string) => {
    setThemeType(type)
    // if (typeof window === 'undefined' || !window.localStorage) return
    // window.localStorage.setItem('theme', type)
  }

  useEffect(() => {
    switchTheme(isDarkTheme ? 'dark' : 'light')
  }, [isDarkTheme])

  return (
    <LocaleProvider>
      <ThemeProvider switchTheme={switchTheme} themeType={themeType}>
        <GeistProvider themeType={themeType} themes={[theme]}>
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
          </Head>
          <Component {...pageProps} />
        </GeistProvider>
      </ThemeProvider>
    </LocaleProvider>
  )
}

export default App
