import { formatDistanceToNow } from 'date-fns'
import { es, enUS } from 'date-fns/locale'

export function relativeTime(iso: string | Date, lang: 'es' | 'en' = 'es') {
  const d = typeof iso === 'string' ? new Date(iso) : iso
  const locale = lang === 'en' ? enUS : es
  return formatDistanceToNow(d, { addSuffix: true, locale })
}
