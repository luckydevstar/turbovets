import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@turbovets-secure-tasks/data';
import { JwtAuthGuard, RolesGuard, Roles, Role } from '@turbovets-secure-tasks/auth';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Roles(Role.Admin, Role.Manager, Role.User)
  getAll(): Task[] {
    return this.taskService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Manager, Role.User)
  getOne(@Param('id') id: string): Task {
    return this.taskService.findOne(id);
  }

  @Post()
  @Roles(Role.Admin, Role.Manager)
  create(@Body() task: Omit<Task, 'id'>): Task {
    return this.taskService.create(task);
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Manager)
  update(@Param('id') id: string, @Body() update: Partial<Task>): Task {
    return this.taskService.update(id, update);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string): void {
    return this.taskService.remove(id);
  }
}
