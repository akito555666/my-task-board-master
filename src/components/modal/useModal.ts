import { Dispatch, SetStateAction } from 'react';
import { Task } from '../../types';

interface UseModalProps {
  setEditTask: Dispatch<SetStateAction<Partial<Task> | null>>;
}

export const useModal = ({ setEditTask }: UseModalProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditTask((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleIconSelect = (icon: string) => {
    setEditTask((prev) => prev ? { ...prev, icon } : null);
  };

  const handleStatusSelect = (status_name: Task['status_name']) => {
    setEditTask((prev) => prev ? { ...prev, status_name } : null);
  };

  return {
    handleInputChange,
    handleIconSelect,
    handleStatusSelect,
  };
};