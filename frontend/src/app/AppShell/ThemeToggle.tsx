import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      aria-label="Cambiar tema"
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      title={colorMode === 'light' ? 'Cambiar a oscuro' : 'Cambiar a claro'}
      icon={<span>{colorMode === 'light' ? '🌙' : '☀️'}</span>}
    />
  )
}
