import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stage, Task } from '../../services/stage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-task-dialog',
  template: `

  <div mat-dialog-content class="mat-typography">
  <mat-toolbar color="primary">
    <span class="title">Add Task</span>
    <span class="spacer"></span>
    <button mat-icon-button (click)="onClose()" class="close">
      <mat-icon>close</mat-icon>
    </button>
  </mat-toolbar>
  <form [formGroup]="taskForm" (ngSubmit)="onSave()">
    <mat-form-field appearance="fill">
      <mat-label>Title</mat-label>
      <input matInput formControlName="title" required>
    </mat-form-field>
    <mat-form-field appearance="fill">
      <mat-label>Description</mat-label>
      <textarea matInput formControlName="description"></textarea>
    </mat-form-field>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()" class="cancel"><mat-icon>cancel</mat-icon>Cancel</button>
      <button mat-button color="primary" type="submit" class="save"><mat-icon>check_circle</mat-icon>Save</button>
    </div>
  </form>
</div>

  `,
  styleUrls: ['./task-dialog.component.scss'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatIconModule, MatButtonModule]
})
export class TaskDialogComponent {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stage: Stage },
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        id: Math.random().toString(36).substring(2, 11),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description
      };
      this.dialogRef.close(task);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
