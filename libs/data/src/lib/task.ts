export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;  // userId
  completed: boolean;
}
