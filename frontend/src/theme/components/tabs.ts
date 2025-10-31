import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const variantSoft = definePartsStyle({
  tab: {
    borderRadius: 'full',
    px: 4,
    py: 2,
    _selected: {
      bg: 'primary.50',
      color: 'primary.700',
      borderColor: 'primary.200',
    },
    _hover: { bg: 'primary.100' },
    _focusVisible: { boxShadow: '0 0 0 2px var(--chakra-colors-primary-200)' },
  },
  tabpanel: { px: 0 },
})

export const Tabs = defineMultiStyleConfig({
  variants: { soft: variantSoft },
  defaultProps: { variant: 'soft' },
})