import { createContext, useContext } from 'react'

export const DeckThemeContext = createContext<string | undefined>(undefined)

export function useDeckTheme(): string | undefined {
  return useContext(DeckThemeContext)
}
