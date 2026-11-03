import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import BoardPage from './features/board/BoardPage';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BoardPage />
  </React.StrictMode>
);
