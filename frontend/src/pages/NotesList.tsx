import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listNotes, updateNote, removeNote } from '../api/notes'
import { Link } from 'react-router-dom'

export default function NotesList({ archived }: { archived: boolean }) {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['notes', archived],
    queryFn: () => listNotes({ archived })
  })

  const toggle = useMutation({
    mutationFn: (note: any) => updateNote(note.id, { archived: !note.archived }),
    onSuccess: () => qc.invalidateQueries({queryKey:['notes']})
  })

  const del = useMutation({
    mutationFn: (id: number) => removeNote(id),
    onSuccess: () => qc.invalidateQueries({queryKey:['notes']})
  })

  if (isLoading) return <p>Cargando…</p>
  if (!data?.length) return <p>Sin notas {archived ? 'archivadas' : 'activas'}.</p>

  return (
    <ul style={{padding:16}}>
      {data.map(n => (
        <li key={n.id} style={{border:'1px solid #ddd', padding:12, marginBottom:8, borderRadius:8}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <b>{n.title}</b>
            <div style={{display:'flex', gap:8}}>
              <button onClick={()=>toggle.mutate(n)}>{n.archived ? 'Desarchivar' : 'Archivar'}</button>
              <Link to={`/edit/${n.id}`}>Editar</Link>
              <button onClick={()=>del.mutate(n.id)}>Eliminar</button>
            </div>
          </div>
          {n.content && <p>{n.content}</p>}
        </li>
      ))}
    </ul>
  )
}
