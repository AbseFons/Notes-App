import React from 'react'
import {
  Box, Stack, HStack, FormControl, FormLabel, Input, Textarea,
  FormErrorMessage, Button, Badge, useToast
} from '@chakra-ui/react'

export interface NoteFormValues {
  title: string
  content?: string
  tags?: string[]
}

export function NoteForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  onCancel,
}: {
  defaultValues?: Partial<NoteFormValues>
  onSubmit: (values: NoteFormValues) => void
  isSubmitting?: boolean
  onCancel?: () => void
}) {
  const [title, setTitle] = React.useState(defaultValues?.title ?? '')
  const [content, setContent] = React.useState(defaultValues?.content ?? '')
  const [tagsText, setTagsText] = React.useState((defaultValues?.tags ?? []).join(', '))
  const [touched, setTouched] = React.useState(false)

  const invalidTitle = touched && title.trim().length < 1

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (title.trim().length < 1) return
    const tags = tagsText
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
    onSubmit({ title: title.trim(), content: content.trim() || undefined, tags })
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg={{ base: 'surface', _dark: 'blue' }}
      borderWidth="1px"
      borderStyle="solid"
      sx={{
        borderColor: 'border_2 !important',
        _dark: {
          borderColor: 'border_2 !important'
        },
      }}
      borderRadius="2xl"
      p={{ base: 4, md: 6 }}
      boxShadow={{ base: 'sm', _dark: 'none' }}
    >
      <Stack spacing={4}>
        <FormControl isInvalid={invalidTitle} isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            color="muted"
            bg="surface_nn"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g. Team meeting"
            onBlur={() => setTouched(true)}
          />
          <FormErrorMessage>Title is necesary</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Content</FormLabel>
          <Textarea
            color="text_new_card"
            bg="surface_nn"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add the details of your note..."
            rows={6}
            borderRadius="lg"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Tags (optional)</FormLabel>
          <Input
            color="text_new_card"
            bg="surface_nn"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="E.g. work, personal"
            borderRadius="lg"
          />
        </FormControl>

        <HStack spacing={3} pt={2}>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Save
          </Button>
          {onCancel && (
            <Button variant="ghost" colorScheme="gray" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </HStack>
      </Stack>
    </Box>
  )
}
