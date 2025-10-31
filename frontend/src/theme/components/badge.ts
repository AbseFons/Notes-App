import { defineStyleConfig } from '@chakra-ui/react'

export const Badge = defineStyleConfig({
  baseStyle: {
    borderRadius: 'full',
    fontWeight: 500,
    textTransform: 'none',
    lineHeight: 1.1,
  },
  variants: {
    stateActive: {
      bg: 'green.50',
      color: 'green.700',
      _dark: { bg: 'green.900', color: 'green.100' },
      px: 2, py: 0.5, fontSize: 'xs', // ⬅ más pequeño
    },
    stateArchived: {
      bg: 'gray.100',
      color: 'gray.600',
      _dark: { bg: 'whiteAlpha.200', color: 'gray.300' },
      px: 2, py: 0.5, fontSize: 'xs',
    },
    tagSubtle: {
      bg: 'surface',
      border: '1px solid',
      borderColor: 'border',
      color: 'text',
      px: 2, py: 0.5, fontSize: 'xs',
    },
    tagSolid: {
      bg: 'primary.50',
      color: 'primary.700',
      _dark: { bg: 'primary.900', color: 'primary.100' },
      px: 2, py: 0.5, fontSize: 'xs',
    },
  },
  defaultProps: { variant: 'tagSubtle' },
})
