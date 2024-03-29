import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
    
    @Get()
    getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length){
        }else{
            return this.tasksService.getAllTasks();
        }
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto ): Task {
        // console.log('body : ', body);
        return this.tasksService.createTask(CreateTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}

