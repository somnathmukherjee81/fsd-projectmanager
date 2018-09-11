import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ProjectManagerService } from './../projectmanager.service';
import { allResolved } from 'q';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  users: User[];
  selectedUser: User = {
    userId: null,
    firstName: null,
    lastName: null,
    fullName: null,
    employeeId: null,
    projectId: null
  };
  activeMode = 'ADD'; // ADD | EDIT
  allProjectNames: any[];

  constructor(private projectManagerService: ProjectManagerService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.projectManagerService.getUsers()
      .subscribe(users => {
        this.users = users;
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
  }

  delete(user: User): void {
    this.projectManagerService.deleteUser(user).subscribe(_ => {
      this.users = this.users.filter(t => t.userId !== user.userId);
      this.resetMode();
    });
  }

  getProjectSummary(projectId: number) {
    const foundProject = this.allProjectNames.find((projectName) => projectName.id === projectId);

    return foundProject ? foundProject.summary : '';
  }

  onSelect(user: User): void {
    this.selectedUser = user;
    this.activeMode = 'EDIT';
  }

  onUserAdded(user: User): void {
    this.users.push(user);
    this.activeMode = 'ADD';

    this.resetMode();
  }

  onUserUpdated(user: User): void {
    const index = this.users.findIndex((t) => t.userId === user.userId);

    if (index >= 0 ) {
      this.users[index] = user;
      this.resetMode();
    }
  }

  onResetMode(): void {
    this.resetMode();
  }

  resetMode(): void {
    this.selectedUser = {
      userId: null,
      firstName: null,
      lastName: null,
      fullName: null,
      employeeId: null,
      projectId: null
    };

    this.activeMode = 'ADD';
  }

}
