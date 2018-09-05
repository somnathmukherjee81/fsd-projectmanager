import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from './../task.service';
import { allResolved } from 'q';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task = {
    taskID: null,
    summary: null
  };
  activeMode = 'ADD'; // ADD | EDIT
  allTaskNames: any[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
        this.refreshTaskNames();
      });
  }

  delete(task: Task): void {
    this.taskService.deleteTask(task).subscribe(_ => {
      this.tasks = this.tasks.filter(t => t.taskID !== task.taskID);
      this.resetMode();
      this.refreshTaskNames();
    });
  }

  completeTask(task: Task): void {
    // Status value for 'Completed'
    task.status = 3;
    this.taskService.updateTask(task).subscribe(updatedTask => {
      this.onTaskUpdated(updatedTask);
    });
  }

  getTaskSummary(taskId: number) {
    const foundTask = this.tasks.find((task) => task.taskID === taskId);

    return foundTask ? foundTask.summary : '';
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
    this.activeMode = 'EDIT';
  }

  onTaskAdded(task: Task): void {
    this.tasks.push(task);
    this.activeMode = 'ADD';

    this.resetMode();
    this.refreshTaskNames();
  }

  onTaskUpdated(task: Task): void {
    const index = this.tasks.findIndex((t) => t.taskID === task.taskID);

    if (index >= 0 ) {
      this.tasks[index] = task;
      this.resetMode();
      this.refreshTaskNames();
    }
  }

  onResetMode(): void {
    this.resetMode();
    this.refreshTaskNames();
  }

  refreshTaskNames(): void {
    this.allTaskNames = this.tasks.map((t) => {
      const taskName = {
        id: t.taskID,
        summary: t.summary
      };

      return taskName;
    });
  }

  resetMode(): void {
    this.selectedTask = {
      taskID: null,
      summary: null
    };

    this.activeMode = 'ADD';
  }

}
