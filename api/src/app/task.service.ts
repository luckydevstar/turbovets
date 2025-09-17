import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@turbovets-secure-tasks/data';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  create(task: Omit<Task, 'id'>): Task {
    const newTask: Task = {
      ...task,
      id: (this.tasks.length + 1).toString(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  update(id: string, update: Partial<Task>): Task {
    const task = this.findOne(id);
    Object.assign(task, update);
    return task;
  }

  remove(id: string): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException(`Task with ID ${id} not found`);
    this.tasks.splice(index, 1);
  }
}
