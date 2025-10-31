import { api } from './client'

export interface Tag {
  id: number
  name: string
}

export async function listTags(): Promise<Tag[]> {
  const res = await api.get('/tags')
  return res.data
}
