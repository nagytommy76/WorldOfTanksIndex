'use client'
import React from 'react'
import { Montserrat } from 'next/font/google'
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles'

const montserrat = Montserrat({
   subsets: ['latin'],
})

const darkTheme = createTheme({
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               textTransform: 'none',
            },
         },
      },
   },
   palette: {
      mode: 'dark',
      primary: {
         main: '#fca311',
      },
      secondary: {
         main: '#2b2a2a',
      },
      info: {
         // main: '#357EC7',
         main: '#0084ff',
      },
   },
   typography: {
      fontFamily: montserrat.style.fontFamily,
   },
})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
   return <MUIThemeProvider theme={darkTheme}>{children}</MUIThemeProvider>
}
