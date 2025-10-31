import { defineStyleConfig } from '@chakra-ui/react'

export const Badge = defineStyleConfig({
  baseStyle: {
    borderRadius: 'full',
    fontWeight: 500,
  },
  variants: {
    stateActive: {
      bg: '#c8f7c5',
      color: '#256029',
    },
    stateArchived: {
      bg: '#e0e0e0',
      color: '#555555',
    },
    tagSubtle: {
      bg: 'surface',
      border: '1px solid',
      borderColor: 'border',
      color: 'text',
    },
    tagSolid: {
      bg: 'primary.50',
      color: 'primary.700',
    },
  },
  defaultProps: {
    variant: 'tagSubtle',
  },
})