import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectManagerService } from './../projectmanager.service';
import { allResolved } from 'q';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  projects: Project[];
  selectedProject: Project = {
    projectId: null,
    summary: null
  };
  activeMode = 'ADD'; // ADD | EDIT
  allUserNames: any[];

  constructor(private projectManagerService: ProjectManagerService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectManagerService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
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
    // Status value for 'Completed'
    project.status = 'Completed';
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

}
