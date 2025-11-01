import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { pdfjs } from 'react-pdf';

import './styles/Header.css';
import './styles/Navbar.css';

// Lazy-loaded pages/components
const LoginPage = React.lazy(() => import('./features/auth/LoginPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const EditorPage = React.lazy(() => import('./pages/EditorPage'));
const ViewerPage = React.lazy(() => import('./pages/ViewerPage'));

const Dashboard = React.lazy(() => import('./components/Dashboard'));
const DocumentViewer = React.lazy(() => import('./components/DocumentViewer'));
const UserTable = React.lazy(() => import('./features/users/UserTable'));
const WIList = React.lazy(() => import('./features/wis/WIList'));
const WIUploadForm = React.lazy(() => import('./features/wis/WIUploadForm'));

// Lazy-load PDF worker (already done)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

export default App;

