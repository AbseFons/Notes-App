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
        default: '#f7f7f8',
        _dark: '#0f1115',
      },
      surface: {
        default: '#ffffff',
        _dark: '#151923',
      },
      border: {
        default: '#e6e6e8',
        _dark: '#1f2430',
      },
      text: {
        default: '#1a1a1b',
        _dark: '#e5e7eb',
      },
      muted: {
        default: '#6b7280',
        _dark: '#9aa4b2',
      },
      primary: {
        50: '#eef6ff',
        100: '#d9eaff',
        200: '#b7d5ff',
        300: '#8ebcff',
        400: '#5b9bff',
        500: '#2f74ff',
        600: '#1f5de0',
        700: '#184ab3',
        800: '#153f93',
        900: '#112f69',
      },
      success: {
        50: '#d3f9d8',
        100: '#b2f2bb',
        600: '#2f9e44',
      },
      danger: {
        50: '#ffe3e3',
        100: '#ffa8a8',
        600: '#e03131',
      },
      warning: {
        50: '#fff3bf',
        100: '#ffd43b',
        600: '#f08c00',
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