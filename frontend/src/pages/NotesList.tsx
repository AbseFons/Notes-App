import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listNotes, updateNote, removeNote } from '../api/notes'
import { SimpleGrid, useToast } from '@chakra-ui/react'
import { NoteCard } from '../components/NoteCard'
import { ListSkeleton } from '../components/ListSkeleton'
import { EmptyState } from '../components/EmptyState'
import { Toolbar } from '../components/Toolbar'
import { AnimatePresence } from 'framer-motion'
import { MotionBox } from '../components/Motion'
import { ConfirmDialog } from '../components/ConfirmDialog'

export default function NotesList({ archived }: { archived: boolean }) {
  const qc = useQueryClient()
  const toast = useToast()
  const [q, setQ] = React.useState('')
  const [tag, setTag] = React.useState('')
  const [pendingDelete, setPendingDelete] = React.useState<number | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['notes', archived, q, tag],
    queryFn: () => listNotes({ archived, q: q || undefined, tag: tag || undefined })
  })

  const toggle = useMutation({
    mutationFn: (note: any) => updateNote(note.id, { archived: !note.archived }),
    onSuccess: (_data, note: any) => {
      qc.invalidateQueries({ queryKey: ['notes'] })
      toast({
        status: 'success',
        title: note.archived ? 'Note unarchived' : 'Note archived',
        duration: 2200,
        isClosable: true
      })
    },
    onError: () => toast({ status: 'error', title: 'Could not update the note' })
  })

  const del = useMutation({
    mutationFn: (id: number) => removeNote(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] })
      toast({ status: 'success', title: 'Note deleted', duration: 2200, isClosable: true })
      setPendingDelete(null)
    },
    onError: () => toast({ status: 'error', title: 'Could not delete the note' })
  })

  if (isLoading) return <ListSkeleton />

  if (!data || data.length === 0) {
    return (
      <>
        <Toolbar archived={archived} q={q} onQChange={setQ} tag={tag} onTagChange={setTag} count={0} />
        <EmptyState archived={archived} />
      </>
    )
  }

  return (
    <>
      <Toolbar archived={archived} q={q} onQChange={setQ} tag={tag} onTagChange={setTag} count={data.length} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, lg: 5 }}>
        <AnimatePresence mode="popLayout">
          {data.map((n: any) => (
            <MotionBox
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <NoteCard
                id={n.id}
                title={n.title}
                content={n.content}
                archived={n.archived}
                createdAt={n.createdAt}
                updatedAt={n.updatedAt}
                onToggleArchive={() => toggle.mutate(n)}
                onDelete={() => setPendingDelete(n.id)}
              />
            </MotionBox>
          ))}
        </AnimatePresence>
      </SimpleGrid>

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title="Delete note"
        description="Are you sure you want to delete this note? This action cannot be undone."
        confirmText="Delete"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => { if (pendingDelete !== null) del.mutate(pendingDelete) }}
        isLoading={del.isPending}
      />
    </>
  )
}
