import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listNotes, updateNote, removeNote } from '../api/notes'
import { SimpleGrid } from '@chakra-ui/react'
import { NoteCard } from '../components/NoteCard'
import { ListSkeleton } from '../components/ListSkeleton'
import { EmptyState } from '../components/EmptyState'
import { Toolbar } from '../components/Toolbar'

export default function NotesList({ archived }: { archived: boolean }) {
  const qc = useQueryClient()
  const [q, setQ] = React.useState('')
  const [tag, setTag] = React.useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['notes', archived, q, tag],
    queryFn: () => listNotes({ archived, q: q || undefined, tag: tag || undefined })
  })

  const toggle = useMutation({
    mutationFn: (note: any) => updateNote(note.id, { archived: !note.archived }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] })
  })

  const del = useMutation({
    mutationFn: (id: number) => removeNote(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] })
  })

  if (isLoading) return <ListSkeleton />
  if (!data || data.length === 0) return (
    <>
      <Toolbar archived={archived} q={q} onQChange={setQ} tag={tag} onTagChange={setTag} count={0} />
      <EmptyState archived={archived} />
    </>
  )

  return (
    <>
      <Toolbar archived={archived} q={q} onQChange={setQ} tag={tag} onTagChange={setTag} count={data.length} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, lg: 5 }}>
        {data.map(n => (
          <NoteCard
            key={n.id}
            id={n.id}
            title={n.title}
            content={n.content}
            archived={n.archived}
            createdAt={n.createdAt}
            updatedAt={n.updatedAt}
            onToggleArchive={() => toggle.mutate(n)}
            onDelete={() => del.mutate(n.id)}
          />
        ))}
      </SimpleGrid>
    </>
  )
}