import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const variantSoft = definePartsStyle({
  tab: {
    borderRadius: 'full',
    px: 4,
    py: 1.5,
    fontWeight: 600,
    _selected: {
      bg: '#8db9af7d',
      color: 'success.400',
      borderColor: 'accent.200',
    },
    _hover: { bg: 'accent.200' },
    _focusVisible: { boxShadow: '0 0 0 2px var(--chakra-colors-primary-200)' },
  },
  tabpanel: { px: 0 },
})

export const Tabs = defineMultiStyleConfig({
  variants: { soft: variantSoft },
  defaultProps: { variant: 'soft' },
})