import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { ProjectManagerService } from './../projectmanager.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss']
})
export class AddUpdateUserComponent implements OnInit {
  activeMode = 'ADD'; // ADD | EDIT
  title = 'Add User';
  saveButtonTitle = 'Add User';
  cancelButtonTitle = 'Reset';
  submitted = false;

  @Input() user: User = {
    userId: null,
    firstName: null,
    lastName: null,
    fullName: null,
    employeeId: null,
    projectId: null
  };

  @Input() allProjectNames: any[];

  @Output() userAdded = new EventEmitter<User>();
  @Output() userUpdated = new EventEmitter<User>();
  @Output() resetMode = new EventEmitter<void>();

  constructor(
    private projectManagerService: ProjectManagerService,
    private location: Location) { }

  ngOnInit() {
  }

  @Input()
  set mode(mode: string) {
    this.title = mode === 'ADD' ? 'Add User' : 'Edit User';
    this.saveButtonTitle = mode === 'ADD' ? 'Add User' : 'Update';
    this.cancelButtonTitle = mode === 'ADD' ? 'Reset' : 'Cancel';
    this.activeMode = mode;

  }

  save(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    this.submitted = true;

    if (this.activeMode === 'EDIT') {
      this.update();
    } else if (this.activeMode === 'ADD') {
      this.add();
    }
  }

  private update(): void {
    this.projectManagerService.updateUser(this.user)
    .subscribe(user => {
      this.userUpdated.emit(user);
    });
  }

  add(): void {
    this.user.employeeId = '-1';
    const firstName = this.user.firstName ? this.user.firstName.trim() : '';
    const lastName = this.user.lastName ? this.user.lastName.trim() : '';

    if (!firstName || !lastName) { return; }

    this.projectManagerService.addUser(this.user)
      .subscribe(user => {
        this.userAdded.emit(user);
      });
  }

  cancel(): void {
    this.resetMode.emit();
  }

}
