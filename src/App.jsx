import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { pdfjs } from 'react-pdf';

import LoginPage from './features/auth/LoginPage'
import AdminPage from './pages/AdminPage'
import EditorPage from './pages/EditorPage'
import ViewerPage from './pages/ViewerPage'

import Dashboard from './components/Dashboard';
import DocumentViewer from './components/DocumentViewer'
import UserTable from './features/users/UserTable'
import WIList from './features/wis/WIList'
import WIUploadForm from './features/wis/WIUploadForm'


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/admin" element={<AdminPage />} >
        <Route index element={<Dashboard role="Admin" />} />
        <Route path="users" element={<UserTable />} />
        <Route path="wis" element={<WIList />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      <Route path="/editor" element={<EditorPage />} >
        <Route index element={<Dashboard role="Editor" />} />
        <Route path="wis" element={<WIList />} />
        <Route path="upload" element={<WIUploadForm />} />
        <Route path="*" element={<Navigate to="/editor" replace />} />
      </Route>

      <Route path="/viewer" element={<ViewerPage />} >
        <Route index element={<Dashboard role="Viewer" />} />
        <Route path="wis" element={<WIList />} />
        <Route path="*" element={<Navigate to="/viewer" replace />} />
      </Route>

      <Route path="/view/:wiId" element={<DocumentViewer />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
