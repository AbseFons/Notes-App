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
      bg: 'success.200',
      color: 'white',
      _hover: { bg: 'accent.500', boxShadow: 'sm' },
      _active: { bg: 'accent.600' },
    },
    ghost: {
      bg: 'transparent',
      border: '1px solid',
      borderColor: 'border_2',
      _hover: {
        bg: 'primary.50',
        _dark: { bg: 'whiteAlpha.100' }, 
      },
      _active: {
        bg: 'bg',
        _dark: { bg: 'whiteAlpha.200' },  
      },
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