import React from 'react'
import { Center, VStack, Heading, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function EmptyState({ archived }: { archived?: boolean }) {
  return (
    <Center py={16}>
      <VStack spacing={4}>
        <Heading size="md">{archived ? 'No hay notas archivadas' : 'No hay notas activas'}</Heading>
        <Text color="muted">
          {archived ? 'Cuando archives notas, aparecerán aquí.' : 'Crea tu primera nota para empezar.'}
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
