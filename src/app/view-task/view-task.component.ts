import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { ProjectManagerService } from './../projectmanager.service';
import { allResolved } from 'q';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task = {
    taskId: null,
    summary: null,
    projectId: null
  };
  activeMode = 'ADD'; // ADD | EDIT
  allTaskNames: any[];
  allProjectNames: any[];
  allUserNames: any[];

  constructor(private projectManagerService: ProjectManagerService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.projectManagerService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
        this.refreshTaskNames();
      });

    this.projectManagerService.getProjects()
      .subscribe(projects => {
        this.allProjectNames = projects.map((p) => {
          const projectName = {
            id: p.projectId,
            summary: p.summary
          };

          return projectName;
        });
      });

    this.projectManagerService.getUsers()
      .subscribe(users => {
        this.allUserNames = users.map((u) => {
          const userName = {
            id: u.userId,
            fullName: u.fullName
          };

          return userName;
        });
      });
  }

  delete(task: Task): void {
    this.projectManagerService.deleteTask(task).subscribe(_ => {
      this.tasks = this.tasks.filter(t => t.taskId !== task.taskId);
      this.resetMode();
      this.refreshTaskNames();
    });
  }

  completeTask(task: Task): void {
    // Status value for 'Completed'
    task.status = 'Completed';
    this.projectManagerService.updateTask(task).subscribe(updatedTask => {
      this.onTaskUpdated(updatedTask);
    });
  }

  getTaskSummary(taskId: number) {
    const foundTask = this.tasks.find((task) => task.taskId === taskId);

    return foundTask ? foundTask.summary : '';
  }

  getProjectSummary(projectId: number) {
    const foundProject = this.allProjectNames.find((projectName) => projectName.id === projectId);

    return foundProject ? foundProject.summary : '';
  }

  getUserFullName(userId: number) {
    const foundUser = this.allUserNames.find((userName) => userName.id === userId);

    return foundUser ? foundUser.fullName : '';
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
    const index = this.tasks.findIndex((t) => t.taskId === task.taskId);

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
        id: t.taskId,
        summary: t.summary
      };

      return taskName;
    });
  }

  resetMode(): void {
    this.selectedTask = {
      taskId: null,
      summary: null,
      projectId: null
    };

    this.activeMode = 'ADD';
  }

}
