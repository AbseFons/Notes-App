import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      aria-label="Change theme"
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      title={colorMode === 'light' ? 'Changing to Dark Theme' : 'Changing to Light Teme'}
      icon={<span>{colorMode === 'light' ? '🌙' : '☀️'}</span>}
    />
  )
}
