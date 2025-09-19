import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Task } from '@turbovets-secure-tasks/data';
import { AuditService } from './audit.service';

interface UserContext {
  userId: string;
  role: string;
  organizationId: string;
  departmentId?: string;
}

@Injectable()
export class TaskService {
  constructor(private auditService: AuditService) {}
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive API documentation',
      assignedTo: '1',
      completed: false,
      organizationId: 'org1',
      departmentId: 'dept1',
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Review code changes',
      description: 'Review pull request #123',
      assignedTo: '2',
      completed: true,
      organizationId: 'org1',
      departmentId: 'dept1',
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Update user interface',
      description: 'Improve dashboard UI components',
      assignedTo: '3',
      completed: false,
      organizationId: 'org1',
      departmentId: 'dept2',
      createdBy: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      title: 'External task',
      description: 'Task from different organization',
      assignedTo: '4',
      completed: false,
      organizationId: 'org2',
      departmentId: 'dept3',
      createdBy: '4',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>, user: UserContext): Task {
    const newTask: Task = {
      ...task,
      id: (this.tasks.length + 1).toString(),
      organizationId: user.organizationId,
      departmentId: user.departmentId,
      createdBy: user.userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tasks.push(newTask);
    
    // Log audit event
    this.auditService.logAction('CREATE', 'TASK', newTask.id, user, {
      title: newTask.title,
      description: newTask.description,
      assignedTo: newTask.assignedTo
    });
    
    return newTask;
  }

  findAll(user: UserContext): Task[] {
    // Admin sees all tasks in their organization
    if (user.role === 'admin') {
      return this.tasks.filter(task => task.organizationId === user.organizationId);
    }
    
    // Manager sees tasks in their department
    if (user.role === 'manager') {
      return this.tasks.filter(task => 
        task.organizationId === user.organizationId && 
        task.departmentId === user.departmentId
      );
    }
    
    // User sees only their own tasks
    return this.tasks.filter(task => task.assignedTo === user.userId);
  }

  findOne(id: string, user: UserContext): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    
    // Check if user has access to this task
    if (!this.hasAccessToTask(task, user)) {
      throw new ForbiddenException('You do not have permission to access this task');
    }
    
    return task;
  }

  update(id: string, update: Partial<Task>, user: UserContext): Task {
    const task = this.findOne(id, user);
    
    // Only admin, manager, or task creator can update
    if (user.role !== 'admin' && user.role !== 'manager' && task.createdBy !== user.userId) {
      throw new ForbiddenException('You do not have permission to update this task');
    }
    
    // Log audit event before updating
    this.auditService.logAction('UPDATE', 'TASK', id, user, {
      changes: update,
      previousTitle: task.title
    });
    
    Object.assign(task, { ...update, updatedAt: new Date() });
    return task;
  }

  remove(id: string, user: UserContext): void {
    const task = this.findOne(id, user);
    
    // Only admin or task creator can delete
    if (user.role !== 'admin' && task.createdBy !== user.userId) {
      throw new ForbiddenException('You do not have permission to delete this task');
    }
    
    // Log audit event before deleting
    this.auditService.logAction('DELETE', 'TASK', id, user, {
      title: task.title,
      description: task.description
    });
    
    const index = this.tasks.findIndex((t) => t.id === id);
    this.tasks.splice(index, 1);
  }

  private hasAccessToTask(task: Task, user: UserContext): boolean {
    // Admin has access to all tasks in their organization
    if (user.role === 'admin') {
      return task.organizationId === user.organizationId;
    }
    
    // Manager has access to tasks in their department
    if (user.role === 'manager') {
      return task.organizationId === user.organizationId && 
             task.departmentId === user.departmentId;
    }
    
    // User has access only to their own tasks
    return task.assignedTo === user.userId;
  }
}
