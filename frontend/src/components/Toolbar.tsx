import React from 'react'
import { HStack, Input, InputGroup, InputLeftElement, Text, Box, Select, Badge, IconButton } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { listTags } from '../api/tags'

import { FiSearch, FiFilter } from 'react-icons/fi'

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

        <InputGroup maxW={{ base: '100%', md: '340px' }}>
          <InputLeftElement pointerEvents="none" h="full">
            <FiSearch color="gray" />
          </InputLeftElement>
          <Input
            value={q}
            onChange={(e) => onQChange(e.target.value)}
            placeholder="Search for title or content..."
            color="muted"
            borderColor="border_2"
            size="sm"
            borderRadius="lg"
            px={3}
          />
        </InputGroup>

        <InputGroup maxW={{ base: '100%', md: '220px' }}>
          <InputLeftElement pointerEvents="none" h="full">
            <FiFilter size={16} color="gray" />
          </InputLeftElement>
          <Select
            size="sm"
            value={tag}
            onChange={(e) => onTagChange(e.target.value)}
            placeholder="Filter by tag"
            color="muted"
            borderColor="border_2"
            borderRadius="lg"
            pl="32px"
          >
            {(tags || []).map(t => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </Select>
        </InputGroup>

        {tag && (
          <Badge variant="tagSolid">
            {tag}
            <IconButton
              aria-label="Take out filter"
              size="xs"
              variant="ghost"
              ml={2}
              onClick={() => onTagChange('')}
              icon={<span>✕</span>}
            />
          </Badge>
        )}

        <Text fontWeight={600} fontSize="sm" color="muted">
          {typeof count === 'number' ? `${count} ${archived ? 'archived' : 'actived'}` : (archived ? 'Archive' : 'Active')}
        </Text>
      </HStack>
    </Box>
  )
}
