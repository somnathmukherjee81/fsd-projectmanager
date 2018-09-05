import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from './../task.service';
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

  @Input() task: Task = {
    taskID: null,
    summary: null
  };

  @Input() allTaskNames: any[];

  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() resetMode = new EventEmitter<void>();

  constructor(
    private taskService: TaskService,
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

  save(): void {
    if (this.activeMode === 'EDIT') {
      this.update();
    } else if (this.activeMode === 'ADD') {
      this.add();
    }
  }

  private update(): void {
    this.taskService.updateTask(this.task)
    .subscribe(task => {
      this.taskUpdated.emit(task);
    });
  }

  add(): void {
    const summary = this.task.summary ? this.task.summary.trim() : '';

    if (!summary) { return; }

    this.taskService.addTask(this.task)
      .subscribe(task => {
        this.taskAdded.emit(task);
      });
  }

  cancel(): void {
    this.resetMode.emit();
  }

}
