import { VercelRequest, VercelResponse } from '@vercel/node';
import 'dotenv/config';
import { query } from '../server/db';
import { Board, Task } from '../server/types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 診断用
  if (req.url === '/api/health') {
    return res.json({
      status: 'ok',
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlLength: process.env.DATABASE_URL?.length || 0
    });
  }

  // CORS設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const path = req.url?.replace('/api', '') || '/';

  // ルーティング
  if (path.startsWith('/boards/') && req.method === 'GET') {
    // GET /api/boards/:boardId
    const boardId = path.split('/')[2];
    try {
      const boardRes = await query('SELECT * FROM boards WHERE id = $1', [boardId]);
      if (boardRes.rows.length === 0) {
        return res.status(404).json({ message: 'Board not found' });
      }
      
      const board: Board = {
        id: boardRes.rows[0].id.toString(),
        name: boardRes.rows[0].name,
        description: boardRes.rows[0].description || '',
      };

      const tasksRes = await query(
        'SELECT * FROM tasks WHERE board_id = $1 ORDER BY task_order',
        [boardId]
      );

      return res.json({ board, tasks: tasksRes.rows });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (path === '/boards' && req.method === 'POST') {
    // POST /api/boards
    try {
      const boardResult = await query(
        'INSERT INTO boards (name, description) VALUES ($1, $2) RETURNING id',
        ['My Task Board', 'Tasks to keep organised']
      );
      const boardId = boardResult.rows[0].id;

      const defaultTasks = [
        { name: 'Task in Progress', status_name: 'in-progress', icon: '⏰', content: 'This is a task in progress.', task_order: 0 },
        { name: 'Task Completed', status_name: 'completed', icon: '🏋️‍♂️', content: 'This is a completed task.', task_order: 1 },
        { name: "Task Won't Do", status_name: 'wont-do', icon: '☕', content: "This is a task that won't be done.", task_order: 2 },
        { name: 'Task To Do', status_name: 'to-do', icon: '📚', content: 'Work on a Challenge on devChallenges.io, learn TypeScript.', task_order: 3 }
      ];

      for (const task of defaultTasks) {
        await query(
          'INSERT INTO tasks (board_id, name, status_name, icon, content, task_order) VALUES ($1, $2, $3, $4, $5, $6)',
          [boardId, task.name, task.status_name, task.icon, task.content, task.task_order]
        );
      }

      return res.status(201).json({
        id: boardId.toString(),
        name: 'My Task Board',
        description: 'Tasks to keep organised',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (path === '/tasks' && req.method === 'POST') {
    // POST /api/tasks
    const { name, board_id, status_name, icon, content } = req.body;

    if (!name || !board_id || !status_name) {
      return res.status(400).json({ message: 'Missing required fields: name, board_id, status_name' });
    }

    try {
      const orderRes = await query(
        'SELECT count(*) as count FROM tasks WHERE board_id = $1 AND status_name = $2',
        [board_id, status_name]
      );
      const order = parseInt(orderRes.rows[0].count, 10);

      const result = await query(
        'INSERT INTO tasks (board_id, name, status_name, icon, content, task_order) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [board_id, name, status_name, icon || '', content || '', order]
      );

      return res.status(201).json({
        id: result.rows[0].id.toString(),
        name,
        status_name,
        icon: icon || '',
        content: content || '',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (path.startsWith('/tasks/') && req.method === 'PUT') {
    // PUT /api/tasks/:taskId
    const taskId = path.split('/')[2];
    const { name, content, icon, status_name } = req.body;

    try {
      const taskRes = await query('SELECT * FROM tasks WHERE id = $1', [taskId]);
      if (taskRes.rows.length === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
      const task = taskRes.rows[0];

      const newName = name !== undefined ? name : task.name;
      const newContent = content !== undefined ? content : task.content;
      const newIcon = icon !== undefined ? icon : task.icon;
      const newStatusName = status_name !== undefined ? status_name : task.status_name;

      await query(
        'UPDATE tasks SET name = $1, content = $2, icon = $3, status_name = $4 WHERE id = $5',
        [newName, newContent, newIcon, newStatusName, taskId]
      );

      return res.json({
        id: taskId,
        name: newName,
        content: newContent,
        icon: newIcon,
        status_name: newStatusName
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (path.startsWith('/tasks/') && req.method === 'DELETE') {
    // DELETE /api/tasks/:taskId
    const taskId = path.split('/')[2];

    try {
      const result = await query('DELETE FROM tasks WHERE id = $1', [taskId]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(404).json({ message: 'Not found' });
}
