import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTaskComponent } from './add-update-task.component';

import { FormsModule } from '@angular/forms';

describe('AddUpdateTaskComponent', () => {
  let component: AddUpdateTaskComponent;
  let fixture: ComponentFixture<AddUpdateTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AddUpdateTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
