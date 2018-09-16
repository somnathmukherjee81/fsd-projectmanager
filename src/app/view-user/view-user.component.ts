import { Component, ElementRef, OnInit, Renderer2, AfterViewInit, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { ProjectManagerService } from './../projectmanager.service';
import { allResolved } from 'q';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit, AfterViewInit {
  private sorted = false;
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
  sortBy = 'employeeId';

  @ViewChild('sortByEmployeeId') sortByEmployeeId: ElementRef;

  constructor(
    private projectManagerService: ProjectManagerService,
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.renderer.addClass(this.sortByEmployeeId.nativeElement, 'active');
    this.renderer.setAttribute(this.sortByEmployeeId.nativeElement, 'aria-pressed', 'true');
  }

  getUsers(): void {
    this.projectManagerService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.sort(this.sortBy);
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

  sort(by: string | any): void {
    this.sortBy = by;

    this.users.sort((a: any, b: any) => {
      let val1 = a[by];
      let val2 = b[by];

      if (by === 'employeeId') {
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
