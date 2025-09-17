'use client'

import { ChakraProvider as BaseChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    }
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseChakraProvider theme={theme}>
      {children}
    </BaseChakraProvider>
  )
}