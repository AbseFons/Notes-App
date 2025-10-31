import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProviders } from './app/providers/AppProviders'
import { AppShell } from './app/AppShell/AppShell'
import NotesList from './pages/NotesList'
import Archived from './pages/Archived'
import EditNote from './pages/EditNote'

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<NotesList archived={false} />} />
            <Route path="/archived" element={<NotesList archived={true} />} />
            <Route path="/new" element={<EditNote isNew />} />
            <Route path="/edit/:id" element={<EditNote />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </AppProviders>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)