import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../models/task';
import { ProjectManagerService } from './../projectmanager.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss']
})
export class AddUpdateTaskComponent implements OnInit {
  activeMode = 'ADD'; // ADD | EDIT
  title = 'Add Task';
  saveButtonTitle = 'Add Task';
  cancelButtonTitle = 'Reset';
  submitted = false;

  @Input() task: Task = {
    taskId: null,
    summary: null,
    projectId: null
  };

  @Input() allTaskNames: any[];
  @Input() allProjectNames: any[];
  @Input() allUserNames: any[];

  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() resetMode = new EventEmitter<void>();

  constructor(
    private projectManagerService: ProjectManagerService,
    private location: Location) { }

  ngOnInit() {
  }

  @Input()
  set mode(mode: string) {
    this.title = mode === 'ADD' ? 'Add Task' : 'Edit Task';
    this.saveButtonTitle = mode === 'ADD' ? 'Add Task' : 'Update';
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
    this.projectManagerService.updateTask(this.task)
    .subscribe(task => {
      this.taskUpdated.emit(task);
    });
  }

  add(): void {
    const summary = this.task.summary ? this.task.summary.trim() : '';

    if (!summary) { return; }

    this.projectManagerService.addTask(this.task)
      .subscribe(task => {
        this.taskAdded.emit(task);
      });
  }

  cancel(): void {
    this.resetMode.emit();
  }

}
