import { createContext, useContext } from 'react'

export interface ThemeContextType {
  themeType: string
  switchTheme: (themeType: string) => void
}

const defaultThemeContextValue = {
  themeType: '',
  switchTheme: () => {},
}

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContextValue)

export const ThemeProvider: React.FC<{ children: React.ReactNode } & ThemeContextType> = ({
  children,
  themeType,
  switchTheme,
}) => {
  return <ThemeContext.Provider value={{ switchTheme, themeType }}>{children}</ThemeContext.Provider>
}

export const useThemeSwitch = () => {
  const { switchTheme, themeType } = useContext(ThemeContext)
  return { switchTheme, themeType }
}
