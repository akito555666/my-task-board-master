export interface Task {
  id: string;
  name: string;
  status_name: 'in-progress' | 'completed' | 'wont-do' | 'to-do';
  icon: string;
  content: string;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
}