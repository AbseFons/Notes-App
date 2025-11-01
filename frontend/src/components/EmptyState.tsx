import React from 'react'
import { Center, VStack, Heading, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function EmptyState({ archived }: { archived?: boolean }) {
  return (
    <Center py={16}>
      <VStack spacing={4}>
        <Heading size="md">{archived ? 'There are no archived notes.' : 'There are no active notes.'}</Heading>
        <Text color="muted">
          {archived ? 'Once you archive notes, they will appear here.' : 'Create your first note to get started.'}
        </Text>
        {!archived && (
          <Button as={Link} to="/new" variant="primary">
            New Note
          </Button>
        )}
      </VStack>
    </Center>
  )
}
