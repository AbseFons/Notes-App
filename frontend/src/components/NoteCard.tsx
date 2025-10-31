import React from 'react'
import {
  Box, Flex, Heading, Text, Badge, Button, useColorModeValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { relativeTime } from '../api/time'

export interface NoteCardProps {
  id: number
  title: string
  content?: string
  archived: boolean
  createdAt: string
  updatedAt: string
  onToggleArchive: () => void
  onDelete: () => void
}

export function NoteCard(props: NoteCardProps) {
  const { id, title, content, archived, createdAt, updatedAt, onToggleArchive, onDelete } = props
  const cardBg = useColorModeValue('surface', 'surface')
  const hoverBg = useColorModeValue('rgba(0,0,0,0.02)', 'rgba(255,255,255,0.02)')
  const border = '1px solid'
  const borderColor = 'border'

  return (
    <Box
      as="article"
      bg="surface"
      border="1px solid"
      borderColor={{ base: 'border', _dark: 'whiteAlpha.200' }}   // borde sutil en dark
      borderRadius="md"
      p={4}
      transition="all 0.15s ease-out"
      boxShadow={{ base: 'sm', _dark: 'none' }}                    // sombra ligera en light
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'md', bg: 'rgba(0,0,0,0.02)' }}
      _dark={{ _hover: { bg: 'whiteAlpha.50' } }}                  // hover sutil en dark
    >
      <Flex align="flex-start" gap={3} mb={2}>
        <Heading as="h3" size="md" noOfLines={1} flex="1" fontWeight={600}>
          {title}
        </Heading>
        <Badge variant={archived ? 'stateArchived' : 'stateActive'} mt="1px">
          {archived ? 'Archivada' : 'Activa'}
        </Badge>
      </Flex>

      {content && (
        <Text mt={1} noOfLines={3} color="muted" fontSize="sm">
          {content}
        </Text>
      )}

      <Text mt={3} fontSize="xs" color="muted">
        creada {relativeTime(createdAt)}
        {updatedAt !== createdAt && <> · actualizada {relativeTime(updatedAt)}</>}
      </Text>

      <Flex mt={3} gap={2} wrap="wrap">
        <Button size="sm" variant="ghost" onClick={onToggleArchive}>
          {archived ? 'Desarchivar' : 'Archivar'}
        </Button>
        <Button as={Link} to={`/edit/${id}`} size="sm" variant="ghost">
          Editar
        </Button>
        <Button size="sm" variant="outline" colorScheme="red" onClick={onDelete}>
          Eliminar
        </Button>
      </Flex>
    </Box>
  )
}
