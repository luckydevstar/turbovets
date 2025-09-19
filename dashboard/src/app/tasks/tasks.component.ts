import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskService, Task } from './task.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  role: string | null = null;
  
  tasks: Task[] = [];
  errorMessage = '';
  newTask: Partial<Task> = { title: '', description: '', assignedTo: '' };

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    console.log('User role from token:', this.role);
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: () => (this.errorMessage = 'Failed to load tasks')
    });
  }

  addTask(): void {
    if (!this.newTask.title || !this.newTask.description) {
      this.errorMessage = 'Title and description are required';
      return;
    }

    this.taskService.addTask(this.newTask).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTask = { title: '', description: '', assignedTo: '' }; // reset form
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to add task';
      }
    });
  }
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        // ✅ Remove from local list
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      error: () => {
        this.errorMessage = 'Failed to delete task';
      }
    });
  }
  editingTask: Partial<Task> | null = null;

  startEdit(task: Task): void {
    this.editingTask = { ...task }; // clone task
  }

  cancelEdit(): void {
    this.editingTask = null;
  }

  saveEdit(id: number): void {
    if (!this.editingTask) return;

    this.taskService.updateTask(id, this.editingTask).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex((t) => t.id === id);
        if (index > -1) this.tasks[index] = updated;
        this.editingTask = null;
      },
      error: () => {
        this.errorMessage = 'Failed to update task';
      }
    });
  }
  
  canEditOrDelete(): boolean {
    return this.role === 'admin' || this.role === 'manager';
  }

  canAccessAudit(): boolean {
    return this.role === 'admin' || this.role === 'manager';
  }

  logout(): void {
    this.authService.logout();
  }

}
