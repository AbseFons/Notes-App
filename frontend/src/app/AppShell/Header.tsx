import React from 'react'
import { Box, Container, Flex, Heading, Spacer, HStack, Tabs, TabList, Tab, Button } from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  const index = location.pathname.startsWith('/archived') ? 1 : 0

  return (
    <Box position="sticky" top={0} bg="surface" borderBottom="1px solid" borderColor="border" zIndex={10}>
      <Container maxW="6xl" px={{ base: 4, md: 6 }} py={3}>
        <Flex align="center" gap={4}>
          <Heading size="md">Notes</Heading>
          <Tabs index={index} onChange={(i)=>navigate(i===0?'/':'/archived')}>
            <TabList>
              <Tab>Activas</Tab>
              <Tab>Archivadas</Tab>
            </TabList>
          </Tabs>
          <Spacer />
          <HStack spacing={2}>
            <Button as={Link} to="/new" variant="primary" size="sm">Nueva nota</Button>
            <ThemeToggle />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
