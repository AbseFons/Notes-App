import React from 'react'
import { Box, Container, Flex, Heading, Spacer, HStack, Tabs, TabList, Tab, Button, Image, useColorModeValue, TabIndicator } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const index = location.pathname.startsWith('/archived') ? 1 : 0

  const headerBg = useColorModeValue('rgba(246, 238, 124, 0.65)', '#1E3036',)
  const headerBorder = useColorModeValue('gray.200', '#7d8e9423')

  const logoSrc = useColorModeValue('/assets/logo-light.svg', '/assets/logo-dark.svg')


  return (
    <Box
      position="sticky"
      top={0}
      bg={headerBg}
      borderBottom="1px solid"
      borderColor={headerBorder}
      zIndex={10}
      boxShadow="sm"
      bgGradient={{
        base: 'linear(to-b, rgba(0,0,0,0.00), rgba(0,0,0,0.00))',
        _dark: 'linear(to-b, rgba(255,255,255,0.02), rgba(255,255,255,0))',
      }}
    >
      <Container maxW="10xl" px={{ base: 4, md: 10 }} py={3.5}>
        <Flex align="center" gap={50}>
          <HStack spacing={2}>
            <Link to="/">
              <Image
                src={logoSrc}
                alt="Notes"
                h="45px"
                cursor="pointer"
                _hover={{ opacity: 0.8, transform: 'scale(1.02)' }}
                transition="all 0.15s ease"
              />
            </Link>
          </HStack>

          <Tabs index={index} onChange={(i) => navigate(i === 0 ? '/' : '/archived')} variant="soft">
            <TabList>
              <Tab px={6} py={2}>Active</Tab>
              <Tab px={6} py={2}>Archive</Tab>
            </TabList>
          </Tabs>

          <Spacer />

          <HStack spacing={2}>
            <Button
              as={Link}
              to="/new"
              size="sm"
              variant="primary"
              boxShadow="sm"
              _hover={{ boxShadow: 'md' }}
              leftIcon={<FiPlus />}
            >
              New Note
            </Button>
            <ThemeToggle />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
