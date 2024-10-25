import TaskCategory from '../constants/TaskCategory';

export type TaskType = {
  id: string;
  date: string;
  title: string;
  description: string;
  isCompleted: boolean;
  start?: string;
  end?: string;
  category: keyof typeof TaskCategory;
};
