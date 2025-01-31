import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { StageService, Stage, Task } from '../services/stage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [CommonModule, DragDropModule]
})
export class BoardComponent implements OnInit {
  stages: Stage[] = [];

  constructor(private stageService: StageService) {}

  ngOnInit() {
    this.getStages();
  }

  getStages() {
    this.stageService.getStages()
      .subscribe({
        next: (stages) => {
          this.stages = stages;
        },
        error: (error) => {
          console.error('Error loading stages:', error);
        }
      });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
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
    return this.stages.map(stage => 'stage-' + stage.id);
  }

  private saveStages() {
    this.stageService.updateStages(this.stages)
      .subscribe({
        next: () => {
          console.log('Stages updated successfully');
        },
        error: (error) => {
          console.error('Error updating stages:', error);
          this.getStages();
        }
      });
  }
}
