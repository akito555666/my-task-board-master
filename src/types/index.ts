export interface Task {
  id: string;  // フロントエンドでは文字列として扱う
  name: string;
  status_name: 'in-progress' | 'completed' | 'wont-do' | 'to-do';
  icon: string;
  content: string;
}

export interface Board {
  id: string;  // フロントエンドでは文字列として扱う
  name: string;
  description?: string;
}