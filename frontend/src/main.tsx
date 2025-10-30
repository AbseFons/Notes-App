import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NotesList from './pages/NotesList'
import Archived from './pages/Archived'
import EditNote from './pages/EditNote'

const qc = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <header style={{display:'flex',gap:16,padding:12,borderBottom:'1px solid #eee'}}>
          <b>Notes</b>
          <Link to="/">Active</Link>
          <Link to="/archived">Archived</Link>
          <Link to="/new">New Note</Link>
        </header>
        <Routes>
          <Route path="/" element={<NotesList archived={false} />} />
          <Route path="/archived" element={<NotesList archived={true} />} />
          <Route path="/new" element={<EditNote isNew />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
