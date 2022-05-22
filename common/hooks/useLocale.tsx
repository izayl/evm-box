import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import zh from '../locales/zh.json'
import en from '../locales/en.json'

enum Locale {
  Zh = 'zh',
  En = 'en',
}

export interface LocaleContextType {
  locale: Locale
  langs: Record<'zh' | 'en', Record<string, string>>
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: Locale.En,
  langs: {
    zh,
    en,
  },
})

export const useLocale = () => {
  const { locale, langs } = useContext(LocaleContext)
  const t = (k: keyof typeof zh) => langs[locale][k]

  return t
}

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LocaleContextType>({
    locale: Locale.En,
    langs: { zh, en },
  })
  const { query } = useRouter()
  useEffect(() => {
    const locale = navigator.language.split('-')[0]

    setState({ ...state, locale: locale === 'zh' ? Locale.Zh : Locale.En })
  }, [])

  useEffect(() => {
    if (query.lang && ['zh', 'en'].includes(query.lang as string)) {
      setState({ ...state, locale: query.lang as Locale })
    }
  }, [query.lang])

  return (
    <LocaleContext.Provider value={state}>{children}</LocaleContext.Provider>
  )
}
