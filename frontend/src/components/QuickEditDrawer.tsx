import React from 'react'
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter,
  Button, useDisclosure, IconButton
} from '@chakra-ui/react'
import { FiEdit2 } from 'react-icons/fi'
import { NoteForm, NoteFormValues } from './NoteForm'

export interface QuickEditDrawerProps {
  triggerAsIcon?: boolean
  note: {
    id: number
    title: string
    content?: string
    tags?: string[]
  }
  onSave: (values: NoteFormValues) => Promise<void> | void
}

export function QuickEditDrawer({ triggerAsIcon, note, onSave }: QuickEditDrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(values: NoteFormValues) {
    try {
      setLoading(true)
      await onSave(values)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {triggerAsIcon ? (
        <IconButton aria-label="Editar" icon={<FiEdit2 />} variant="ghost" size="sm" onClick={onOpen} />
      ) : (
        <Button leftIcon={<FiEdit2 />} variant="ghost" size="sm" color="muted_2" onClick={onOpen}>
          Edit
        </Button>
      )}

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Edit note</DrawerHeader>
          <DrawerBody>
            <NoteForm
              defaultValues={{ title: note.title, content: note.content, tags: note.tags }}
              onSubmit={handleSubmit}
              isSubmitting={loading}
              onCancel={onClose}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
