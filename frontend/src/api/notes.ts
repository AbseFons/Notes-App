import { api } from './client'

export interface Note {
  id: number
  title: string
  content?: string
  archived: boolean
  createdAt: string
  updatedAt: string
}

export interface ListParams {
  archived: boolean
  tag?: string
  q?: string
}

export async function listNotes({ archived, tag, q }: ListParams) {
  const params: Record<string, any> = { archived }
  if (tag) params.tag = tag
  if (q) params.q = q
  const res = await api.get('/notes', { params })
  return res.data
}

export async function getNote(id: number) {
  const res = await api.get<Note>(`/notes/${id}`)
  return res.data
}

export async function createNote(payload: { title: string, content?: string }) {
  const res = await api.post<Note>('/notes', payload)
  return res.data
}

export async function updateNote(id: number, payload: Partial<{ title: string, content?: string, archived?: boolean }>) {
  const res = await api.patch<Note>(`/notes/${id}`, payload)
  return res.data
}

export async function removeNote(id: number) {
  await api.delete(`/notes/${id}`)
}
