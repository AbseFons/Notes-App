import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listNotes, updateNote, removeNote } from '../api/notes'
import { Link } from 'react-router-dom'
import { relativeTime } from '../api/time'

export default function NotesList({ archived }: { archived: boolean }) {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['notes', archived],
    queryFn: () => listNotes({ archived })
  })

  const toggle = useMutation({
    mutationFn: (note: any) => updateNote(note.id, { archived: !note.archived }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] })
  })

  const del = useMutation({
    mutationFn: (id: number) => removeNote(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] })
  })

  if (isLoading) return <p>Cargando…</p>
  if (!data?.length) return <p>Sin notas {archived ? 'archivadas' : 'activas'}.</p>

  return (
    <ul style={{ padding: 16 }}>
      {data.map(n => (
        <li key={n.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8, borderRadius: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b>{n.title}</b>

                {/* Chip*/}
                {n.archived ? (
                  <span
                    style={{
                      fontSize: 12,
                      background: '#e0e0e0',
                      color: '#555',
                      padding: '2px 6px',
                      borderRadius: 6,
                      fontWeight: 500,
                    }}
                  >
                    Archived
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: 12,
                      background: '#c8f7c5',
                      color: '#256029',
                      padding: '2px 6px',
                      borderRadius: 6,
                      fontWeight: 500,
                    }}
                  >
                    Active
                  </span>
                )}
              </div>

              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                Created {relativeTime(n.createdAt)}
                {n.updatedAt !== n.createdAt && <> · Updated {relativeTime(n.updatedAt)}</>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => toggle.mutate(n)}>{n.archived ? 'Unarchive' : 'Archive'}</button>
              <Link to={`/edit/${n.id}`}>Edit</Link>
              <button onClick={() => del.mutate(n.id)}>Delete</button>
            </div>
          </div>
          {n.content && <p>{n.content}</p>}
        </li>
      ))}
    </ul>
  )
}
