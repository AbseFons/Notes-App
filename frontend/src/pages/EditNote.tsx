import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNote, getNote, updateNote } from '../api/notes'

export default function EditNote({ isNew = false }: { isNew?: boolean }) {
  const { id } = useParams()
  const nav = useNavigate()
  const qc = useQueryClient()
  const { data } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNote(Number(id)),
    enabled: !isNew && !!id
  })

  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')

  useEffect(()=>{
    if (data) { setTitle(data.title); setContent(data.content ?? '') }
  }, [data])

  const saveNew = useMutation({
    mutationFn: () => createNote({ title, content }),
    onSuccess: () => { qc.invalidateQueries({queryKey:['notes']}); nav('/') }
  })

  const saveExisting = useMutation({
    mutationFn: () => updateNote(Number(id), { title, content }),
    onSuccess: () => { qc.invalidateQueries({queryKey:['notes']}); nav('/') }
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isNew) saveNew.mutate()
    else saveExisting.mutate()
  }

  return (
    <form onSubmit={onSubmit} style={{display:'grid', gap:8, padding:16}}>
      <h3>{isNew ? 'New note' : 'Edit note'}</h3>
      <input placeholder="Note tittle" value={title} onChange={e=>setTitle(e.target.value)} required />
      <textarea placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} rows={8} />
      <div style={{display:'flex', gap:8}}>
        <button type="submit">Save</button>
        <button type="button" onClick={()=>nav(-1)}>Cancel</button>
      </div>
    </form>
  )
}
