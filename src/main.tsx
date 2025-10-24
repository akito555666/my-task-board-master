import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// @ts-ignore: allow importing CSS for side effects without types
import './index.css';
import { TaskBoard } from './TaskBoard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskBoard />
  </StrictMode>
);
