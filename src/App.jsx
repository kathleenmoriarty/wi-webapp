import React from 'react'
import './App.css'
import LoginPage from './features/auth/LoginPage'
import { Route, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import DocumentViewer from './components/DocumentViewer'
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/viewer" element={<ViewerPage />} />
      <Route path="/view/:wiId" element={<DocumentViewer />} />
    </Routes>
  )
}

export default App
