import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

export const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => shouldForwardProp(prop) || ['transition', 'initial', 'animate', 'exit', 'whileHover'].includes(prop as string),
})
