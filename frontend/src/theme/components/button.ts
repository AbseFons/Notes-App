import { defineStyleConfig } from '@chakra-ui/react'

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: 'md',
    fontWeight: 600,
    _focusVisible: { boxShadow: '0 0 0 2px var(--chakra-colors-primary-200)' },
  },
  sizes: {
    sm: { h: 8, px: 3, fontSize: 'sm' },
    md: { h: 10, px: 4, fontSize: 'sm' },
    lg: { h: 12, px: 5, fontSize: 'md' },
  },
  variants: {
    primary: {
      bg: 'primary.600',
      color: 'white',
      _hover: { bg: 'primary.700' },
      _active: { bg: 'primary.800' },
    },
    ghost: {
      bg: 'transparent',
      _hover: { bg: 'surface' },
      _active: { bg: 'surface' },
      border: '1px solid',
      borderColor: 'border',
    },
    danger: {
      bg: 'danger.600',
      color: 'white',
      _hover: { bg: 'danger.700' },
      _active: { bg: 'danger.800' },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
})