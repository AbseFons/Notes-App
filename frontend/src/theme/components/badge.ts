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
      bg: 'success.10',
      color: 'success.200',
      _dark: { bg: 'success.700', color: 'success.50' },
      px: 3, py: 1, fontSize: 'xs',
    },
    stateArchived: {
      bg: 'primary.50',
      color: 'primary.500',
      _dark: { bg: 'primary.200', color: 'gray.700' },
      px: 3, py: 1, fontSize: 'xs',
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
