import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@turbovets-secure-tasks/data';
import { JwtAuthGuard, RolesGuard, Roles, Role } from '@turbovets-secure-tasks/auth';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Roles(Role.Admin, Role.Manager, Role.User)
  getAll(@Request() req): Task[] {
    return this.taskService.findAll(req.user);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Manager, Role.User)
  getOne(@Param('id') id: string, @Request() req): Task {
    return this.taskService.findOne(id, req.user);
  }

  @Post()
  @Roles(Role.Admin, Role.Manager, Role.User)
  create(@Body() task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'organizationId' | 'departmentId' | 'createdBy'>, @Request() req): Task {
    return this.taskService.create({
      ...task,
      organizationId: req.user.organizationId,
      departmentId: req.user.departmentId,
      createdBy: req.user.userId
    }, req.user);
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Manager, Role.User)
  update(@Param('id') id: string, @Body() update: Partial<Task>, @Request() req): Task {
    return this.taskService.update(id, update, req.user);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Manager, Role.User)
  remove(@Param('id') id: string, @Request() req): void {
    return this.taskService.remove(id, req.user);
  }
}
