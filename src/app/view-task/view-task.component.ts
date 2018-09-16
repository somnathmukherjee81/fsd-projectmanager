import { Component, ElementRef, OnInit, Renderer2, AfterViewInit, ViewChild } from '@angular/core';
import { Task } from '../models/task';
import { ProjectManagerService } from './../projectmanager.service';
import { allResolved } from 'q';
import * as moment from 'moment';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit, AfterViewInit {
  private sorted = false;
  private localMoment = moment;
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
  sortBy = 'startDate';

  @ViewChild('sortByStartDate') sortByStartDate: ElementRef;

  constructor(
    private projectManagerService: ProjectManagerService,
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.localMoment.locale('en');
    this.getTasks();
  }

  ngAfterViewInit() {
    this.renderer.addClass(this.sortByStartDate.nativeElement, 'active');
    this.renderer.setAttribute(this.sortByStartDate.nativeElement, 'aria-pressed', 'true');
  }

  getTasks(): void {
    this.projectManagerService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
        this.sort(this.sortBy);
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
    this.updateTaskStatus(task, 'Completed');
  }

  suspendTask(task: Task): void {
    this.updateTaskStatus(task, 'Suspended');
  }

  updateTaskStatus(task: Task, status: string): void {
    task.status = status;
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

  sort(by: string | any): void {
    this.sortBy = by;

    this.tasks.sort((a: any, b: any) => {
      let val1 = a[by];
      let val2 = b[by];

      if (by === 'startDate' || by === 'endDate') {
        val1 = this.localMoment.utc(val1).valueOf();
        val2 = this.localMoment.utc(val2).valueOf();
      } else if (by === 'priority') {
        val1 = parseInt(val1, 10) || -1;
        val2 = parseInt(val2, 10) || -1;
      } else {
        val1 = val1 || '';
        val2 = val2 || '';
      }

      if (val1 < val2) {
        return this.sorted ? 1 : -1;
      }

      if (val1 > val2) {
        return this.sorted ? -1 : 1;
      }
      return 0;
    });

    this.sorted = !this.sorted;
  }

}
