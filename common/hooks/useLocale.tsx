import { createContext, useContext, useEffect, useState } from 'react'
import zh from '../locales/zh.json'
import en from '../locales/en.json'

export interface LocaleContextType {
  locale: 'en' | 'zh'
  langs: Record<'zh' | 'en', Record<string, string>>
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
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
    locale: 'en',
    langs: { zh, en },
  })
  useEffect(() => {
    const locale = navigator.language.split('-')[0]

    setState({ ...state, locale: locale === 'zh' ? 'zh' : 'en' })
  }, [])

  return (
    <LocaleContext.Provider value={state}>{children}</LocaleContext.Provider>
  )
}
