import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNote, getNote, updateNote } from '../api/notes'
import { Heading, Stack, Box, Text } from '@chakra-ui/react'
import { useAppToast } from '../hooks/useAppToast'
import { NoteForm, NoteFormValues } from '../components/NoteForm'

export default function EditNote({ isNew = false }: { isNew?: boolean }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const toast = useAppToast()

  const { data } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNote(Number(id)),
    enabled: !isNew && !!id
  })

  const saveNew = useMutation({
    mutationFn: (values: NoteFormValues) => createNote(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] })
      toast({ status: 'success', title: 'Note created' })
      navigate('/')
    },
    onError: () => toast({ status: 'error', title: 'Note not created' })
  })

  const saveExisting = useMutation({
    mutationFn: (values: NoteFormValues) => updateNote(Number(id), values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] })
      toast({ status: 'success', title: 'Note updated' })
      navigate('/')
    },
    onError: () => toast({ status: 'error', title: 'Note not updated' })
  })

  const defaultValues: NoteFormValues | undefined = !isNew && data
    ? { title: data.title, content: data.content ?? '' }
    : undefined

  return (
    <Stack spacing={4} align="stretch">
      <Heading size="md" mb={2}>
        {isNew ? 'New note' : 'Edit note'}
      </Heading>
      <Text color="muted" fontSize="sm">Create a new note to organize your ideas. </Text>
      <Box maxW="99%">
        <NoteForm
          defaultValues={defaultValues}
          onSubmit={(values) => {
            if (isNew) saveNew.mutate(values)
            else saveExisting.mutate(values)
          }}
          isSubmitting={isNew ? saveNew.isPending : saveExisting.isPending}
          onCancel={() => navigate(-1)}
        />
      </Box>
    </Stack>
  )
}
