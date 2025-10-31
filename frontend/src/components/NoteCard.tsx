import React from 'react'
import {
  Box, Flex, Heading, Text, HStack, Spacer, Badge, Button, useColorModeValue
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
      bg={cardBg}
      border={border}
      borderColor={borderColor}
      borderRadius="md"
      p={4}
      transition="all 0.15s ease-out"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'md', bg: hoverBg }}
    >
      <Flex align="baseline" gap={3}>
        <Heading as="h3" size="md" noOfLines={1}>{title}</Heading>
        <Badge variant={archived ? 'stateArchived' : 'stateActive'}>{archived ? 'Archived' : 'Active'}</Badge>
        <Spacer />
        <HStack spacing={2}>
          <Button size="sm" variant="ghost" onClick={onToggleArchive}>
            {archived ? 'Unarchive' : 'Archive'}
          </Button>
          <Button as={Link} to={`/edit/${id}`} size="sm" variant="ghost">
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </HStack>
      </Flex>

      {content && (
        <Text mt={2} noOfLines={3} color="muted">
          {content}
        </Text>
      )}

      <Text mt={3} fontSize="xs" color="muted">
        created {relativeTime(createdAt)}
        {updatedAt !== createdAt && <> · updated {relativeTime(updatedAt)}</>}
      </Text>
    </Box>
  )
}
