import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  StageService,
  Stage as StageModel,
  Task,
} from '../../services/stage.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  template: `
    <div class="board">
      <div *ngFor="let stage of stages; let i = index" class="stage">
        <h3>
          <input
            *ngIf="stage.editing"
            [(ngModel)]="stage.title"
            (blur)="editStageTitle(stage, stage.title)"
          />
          <span *ngIf="!stage.editing">{{ stage.title }}</span>
          <mat-icon (click)="stage.editing = !stage.editing">{{
            stage.editing ? 'done' : 'edit'
          }}</mat-icon>
          <span class="task-count">({{ stage.tasks.length }})</span>
        </h3>

        <div
          cdkDropList
          [id]="'stage-' + stage.id"
          [cdkDropListData]="stage.tasks"
          [cdkDropListConnectedTo]="getConnectedDropListIds()"
          class="task-list"
          (cdkDropListDropped)="drop($event)"
        >
          <cdk-virtual-scroll-viewport
            [itemSize]="10"
            class="virtual-scroll-viewport"
          >
            <div
              *ngFor="let task of stage.tasks"
              class="task"
              cdkDrag
              [cdkDragData]="task"
            >
              <h4>{{ task.title }}</h4>
              <p>{{ task.description }}</p>
            </div>
          </cdk-virtual-scroll-viewport>
        </div>

        <button mat-button (click)="openTaskDialog(stage)">Add Task</button>
      </div>
    </div>
  `,
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ScrollingModule,
  ],
})
export class BoardComponent implements OnInit {
  stages: StageModel[] = [];

  constructor(private stageService: StageService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getStages();
  }

  getStages() {
    this.stageService.getStages().subscribe({
      next: (stages) => {
        this.stages = stages.map((stage) => ({ ...stage, editing: false }));
      },
      error: (error) => {
        console.error('Error loading stages:', error);
      },
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.saveStages();
  }

  getConnectedDropListIds(): string[] {
    return this.stages.map((stage) => 'stage-' + stage.id);
  }

  openTaskDialog(stage: StageModel): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: { stage },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveTask(result, stage);
      }
    });
  }

  editStageTitle(stage: StageModel, newTitle: string) {
    stage.title = newTitle;
    stage.editing = false;
    this.saveStages();
  }

  private saveTask(task: Task, stage: StageModel): void {
    stage.tasks.push(task);
    this.saveStages();
  }

  private saveStages() {
    this.stageService.updateStages(this.stages).subscribe({
      next: () => {
        console.log('Stages updated successfully');
      },
      error: (error) => {
        console.error('Error updating stages:', error);
        this.getStages();
      },
    });
  }
}
