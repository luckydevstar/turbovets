import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { AuthModule } from '@turbovets-secure-tasks/auth';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [AppController, AuthController, TaskController, AuditController],
  providers: [AppService, TaskService, AuditService],
})
export class AppModule {}
