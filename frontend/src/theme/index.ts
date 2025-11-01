import { extendTheme, ThemeConfig } from '@chakra-ui/react'

import { Button as ButtonTheme } from './components/button'
import { Badge as BadgeTheme } from './components/badge'
import { Tabs as TabsTheme } from './components/tabs'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

export const foundations = {
  fonts: {
    heading: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Apple Color Emoji, Segoe UI Emoji',
    body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Apple Color Emoji, Segoe UI Emoji',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '12px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,.06)',
    md: '0 4px 12px rgba(0,0,0,.08)',
    lg: '0 10px 24px rgba(0,0,0,.12)',
  },
  semanticTokens: {
    colors: {
      bg: {
        default: 'rgba(242, 230, 192, 0.35)',       // Amarillo crema 
        _dark: '#0E1A1B',         
      },
      surface: {
        default: '#ffc48d35',
        _dark: '#4a403a75',
      },
      surface_nn: {
        default: '#fff7eed1',
        _dark: '#4a403a75',
      },
      border: {
        default: '#c2bda938',       
        _dark: '#1B1E2A',
      },
      border_2: {
        default: '#7b786a73',       
        _dark: '#aeb0b95c',
      },
      text: {
        default: '#4aa7a5c9',
        _dark: '#faf5c2fe',
      },
      text_card: {
        default: '#676360ff',
        _dark: '#c5d4c4ea',
      },
      text_new_card: {
        default: '#464645ff',
        _dark: '#d4ded3f3',
      },
      muted: {
        default: '#6B6B6B',
        _dark: '#c7cecbb7',
      },

      muted_2: {
        default: '#6b6b6b9a',
        _dark: '#b7b8baa8',
      },

      primary: {
        50: '#f9ccbc7a',           // Durazno
        100: '#F7B79F',
        200: '#F19D84',
        300: '#EC8268',
        400: '#E6674D',
        500: '#E04C32',
        600: '#CC442D',
        700: '#B03A26',
        800: '#943020',
        900: '#78261A',
      },
      success: {
        10: '#c9efe77e',
        50: '#8DB9AF',           // Verde menta suave
        100: '#7AAFA3',
        200: '#69A597',
        300: '#589C8C',
        400: '#4B8C7D',
        500: '#3E7D6E',
        600: '#366D60',
        700: '#2E5E52',
        800: '#264E44',
        900: '#1E3E36',
      },
      accent: {
        50: '#4FB7B6',           // Turquesa
        100: '#45A9A8',
        200: '#3C9B9A',
        300: '#338D8C',
        400: '#2A7F7E',
        500: '#217170',
        600: '#1D6362',
        700: '#185554',
        800: '#144746',
        900: '#103938',
      },
    },
  },

}

export const theme = extendTheme({
  config,
  ...foundations,
  components: {
    Button: ButtonTheme,
    Badge: BadgeTheme,
    Tabs: TabsTheme,
  },
  styles: {
    global: {
      'html, body, #root': { height: '100%' },
      body: { bg: 'bg', color: 'text' },
    },
  },
})