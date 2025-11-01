import React from 'react'
import {
  Box, Flex, Heading, Text, Badge, Button, useColorModeValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { relativeTime } from '../api/time'
import { FiArchive, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateNote } from '../api/notes'
import { QuickEditDrawer } from './QuickEditDrawer'
import type { NoteFormValues } from './NoteForm'
import { useAppToast } from '../hooks/useAppToast'


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
  const qc = useQueryClient()
  const toast = useAppToast()

  const save = useMutation({
    mutationFn: (values: NoteFormValues) => updateNote(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] })
      toast({ status: 'success', title: 'Nota actualizada' })
    },
    onError: () => toast({ status: 'error', title: 'No se pudo actualizar la nota' }),
  })

  return (
    <Box
      as="article"
      bg="surface"
      borderWidth="1px"
      borderStyle="solid"

      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{
        borderColor: 'border !important',
        _dark: {
          borderColor: 'border !important'
        },
      }}
      borderRadius="2xl"
      minH="220px"
      p={4}
      transition="all 0.15s ease-out"
      boxShadow={{ base: 'sm', _dark: 'none' }}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'md',
        bg: { base: 'rgba(0,0,0,0.02)', _dark: 'whiteAlpha.50' },
      }}
    >
      <Flex align="flex-start" gap={3} mb={3}>
        <Heading as="h3" size="md" noOfLines={1} flex="1" fontWeight={700} color="text_card">
          {title}
        </Heading>
        <Badge variant={archived ? 'stateArchived' : 'stateActive'} mt="1px">
          {archived ? 'Archived' : 'Active'}
        </Badge>
      </Flex>

      {content && (
        <Text mt={0} noOfLines={3} color="muted" fontSize="sm">
          {content}
        </Text>
      )}

      <Text mt={10} fontSize="xs" color="muted_2">
        Created {relativeTime(createdAt)}
        {updatedAt !== createdAt && <> · Updated {relativeTime(updatedAt)}</>}
      </Text>

      <Flex mt={3} gap={2} wrap="wrap">
        <Button size={{ base: 'xs', md: 'sm' }} variant="ghost" color="muted_2" leftIcon={<FiArchive />} onClick={onToggleArchive}>
          {archived ? 'Unarchive' : 'Archive'}
        </Button>
        <QuickEditDrawer
          triggerAsIcon={false}
          note={{ id, title, content }}   // agrega tags si las tienes: tags
          onSave={(values) => save.mutate(values)}
        />
        <Button
          size={{ base: 'xs', md: 'sm' }}
          variant="ghost"
          color="primary.200"
          leftIcon={<FiTrash2 />}
          _hover={{ bg: 'primary.50', _dark: { bg: 'red.900' } }}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Flex>
    </Box>
  )
}
