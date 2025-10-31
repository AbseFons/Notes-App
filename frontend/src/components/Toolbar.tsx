import React from 'react'
import { HStack, Input, Text, Box, Select, Badge, IconButton } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { listTags } from '../api/tags'

export interface ToolbarProps {
  archived: boolean
  q: string
  onQChange: (v: string) => void
  tag: string
  onTagChange: (v: string) => void
  count?: number
}

export function Toolbar({ archived, q, onQChange, tag, onTagChange, count }: ToolbarProps) {
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: listTags,
  })

  return (
    <Box bg="surface" border="1px solid" borderColor="border" borderRadius="md" p={3} mb={4}>
      <HStack spacing={3} align="center" wrap="wrap">
        <Text fontWeight={600}>
          {typeof count === 'number' ? `${count} ${archived ? 'archivadas' : 'activas'}` : (archived ? 'Archivadas' : 'Activas')}
        </Text>

        <Input
          value={q}
          onChange={(e)=>onQChange(e.target.value)}
          placeholder="Buscar por título o contenido…"
          size="sm"
          maxW={{ base: '100%', md: '340px' }}
        />

        <Select
          size="sm"
          value={tag}
          onChange={(e)=>onTagChange(e.target.value)}
          placeholder="Filtrar por tag"
          maxW={{ base: '100%', md: '220px' }}
        >
          {(tags || []).map(t => (
            <option key={t.id} value={t.name}>{t.name}</option>
          ))}
        </Select>

        {tag && (
          <Badge variant="tagSolid">
            {tag}
            <IconButton
              aria-label="Quitar filtro"
              size="xs"
              variant="ghost"
              ml={2}
              onClick={()=>onTagChange('')}
              icon={<span>✕</span>}
            />
          </Badge>
        )}
      </HStack>
    </Box>
  )
}
