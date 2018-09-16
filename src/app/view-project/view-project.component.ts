import { Component, ElementRef, OnInit, Renderer2, AfterViewInit, ViewChild } from '@angular/core';
import { Project } from '../models/project';
import { ProjectManagerService } from './../projectmanager.service';
import { allResolved } from 'q';
import * as moment from 'moment';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit, AfterViewInit {
  private sorted = false;
  private localMoment = moment;
  projects: Project[];
  selectedProject: Project = {
    projectId: null,
    summary: null
  };
  activeMode = 'ADD'; // ADD | EDIT
  allUserNames: any[];
  sortBy = 'startDate';

  @ViewChild('sortByStartDate') sortByStartDate: ElementRef;

  constructor(
    private projectManagerService: ProjectManagerService,
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.localMoment.locale('en');
    this.getProjects();
  }

  ngAfterViewInit() {
    this.renderer.addClass(this.sortByStartDate.nativeElement, 'active');
    this.renderer.setAttribute(this.sortByStartDate.nativeElement, 'aria-pressed', 'true');
  }

  getProjects(): void {
    this.projectManagerService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
        this.sort(this.sortBy);
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

  delete(project: Project): void {
    this.projectManagerService.deleteProject(project).subscribe(_ => {
      this.projects = this.projects.filter(t => t.projectId !== project.projectId);
      this.resetMode();
    });
  }

  completeProject(project: Project): void {
    this.updateProjectStatus(project, 'Completed');
  }

  suspendProject(project: Project): void {
    this.updateProjectStatus(project, 'Suspended');
  }

  updateProjectStatus(project: Project, status: string): void {
    project.status = status;
    this.projectManagerService.updateProject(project).subscribe(updatedProject => {
      this.onProjectUpdated(updatedProject);
    });
  }

  getUserFullName(userId: number) {
    const foundUser = this.allUserNames.find((userName) => userName.id === userId);

    return foundUser ? foundUser.fullName : '';
  }

  onSelect(project: Project): void {
    this.selectedProject = project;
    this.activeMode = 'EDIT';
  }

  onProjectAdded(project: Project): void {
    this.projects.push(project);
    this.activeMode = 'ADD';

    this.resetMode();
  }

  onProjectUpdated(project: Project): void {
    const index = this.projects.findIndex((t) => t.projectId === project.projectId);

    if (index >= 0 ) {
      this.projects[index] = project;
      this.resetMode();
    }
  }

  onResetMode(): void {
    this.resetMode();
  }

  resetMode(): void {
    this.selectedProject = {
      projectId: null,
      summary: null
    };

    this.activeMode = 'ADD';
  }

  sort(by: string | any): void {
    this.sortBy = by;

    this.projects.sort((a: any, b: any) => {
      let val1 = a[by];
      let val2 = b[by];

      if (by === 'startDate' || by === 'endDate') {
        val1 = this.localMoment.utc(val1).valueOf();
        val2 = this.localMoment.utc(val2).valueOf();
      } else if (by === 'priority') {
        val1 = parseInt(val1, 10);
        val2 = parseInt(val2, 10);
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
