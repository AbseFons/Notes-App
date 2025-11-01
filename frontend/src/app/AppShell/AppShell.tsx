import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { Header } from './Header'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box minH="100vh" bg="bg">
      <Header />
      <Container maxW="7xl" px={{ base: 4, md: 8 }} py={6}>
        {children}
      </Container>
    </Box>
  )
}
