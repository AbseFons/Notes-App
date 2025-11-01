import { UseToastOptions, useToast } from '@chakra-ui/react'

export function useAppToast(defaults?: UseToastOptions) {
  const toast = useToast()
  return (opts: UseToastOptions) => toast({
    position: 'bottom-right',
    duration: 2400,
    isClosable: true,
    variant: 'subtle',
    ...defaults,
    ...opts,
  })
}
