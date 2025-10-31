import React from 'react'
import { SimpleGrid, Box, Skeleton, SkeletonText } from '@chakra-ui/react'

export function ListSkeleton() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Box key={i} border="1px solid" borderColor="border" borderRadius="md" p={4}>
          <Skeleton height="18px" width="60%" />
          <SkeletonText mt="4" noOfLines={3} spacing="3" />
        </Box>
      ))}
    </SimpleGrid>
  )
}
