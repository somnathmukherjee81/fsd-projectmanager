import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Project } from '../models/project';
import { ProjectManagerService } from './../projectmanager.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update-project',
  templateUrl: './add-update-project.component.html',
  styleUrls: ['./add-update-project.component.scss']
})
export class AddUpdateProjectComponent implements OnInit {
  activeMode = 'ADD'; // ADD | EDIT
  title = 'Add Project';
  saveButtonTitle = 'Add Project';
  cancelButtonTitle = 'Reset';

  @Input() project: Project = {
    projectId: null,
    summary: null,
  };

  @Input() allUserNames: any[];

  @Output() projectAdded = new EventEmitter<Project>();
  @Output() projectUpdated = new EventEmitter<Project>();
  @Output() resetMode = new EventEmitter<void>();

  constructor(
    private projectManagerService: ProjectManagerService,
    private location: Location) { }

  ngOnInit() {
  }

  @Input()
  set mode(mode: string) {
    this.title = mode === 'ADD' ? 'Add Project' : 'Edit Project';
    this.saveButtonTitle = mode === 'ADD' ? 'Add Project' : 'Update';
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
    this.projectManagerService.updateProject(this.project)
    .subscribe(project => {
      this.projectUpdated.emit(project);
    });
  }

  add(): void {
    const summary = this.project.summary ? this.project.summary.trim() : '';

    if (!summary) { return; }

    this.projectManagerService.addProject(this.project)
      .subscribe(project => {
        this.projectAdded.emit(project);
      });
  }

  cancel(): void {
    this.resetMode.emit();
  }

}
