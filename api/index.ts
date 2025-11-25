import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import boardsRouter from '../server/routes/boards';
import tasksRouter from '../server/routes/tasks';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/boards', boardsRouter);
app.use('/api/tasks', tasksRouter);

export default app;
