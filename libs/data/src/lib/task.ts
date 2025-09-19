export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;  // userId
  completed: boolean;
  organizationId: string;
  departmentId?: string;
  createdBy: string;  // userId
  createdAt: Date;
  updatedAt: Date;
}
