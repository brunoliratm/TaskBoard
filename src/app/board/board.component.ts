import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Stage {
  id: string;
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [CommonModule, DragDropModule]
})
export class BoardComponent implements OnInit {
  stages: Stage[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getStages();
  }

  getStages() {
    this.httpClient.get<Stage[]>('assets/stages.json')
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
  }

  getConnectedDropListIds(): string[] {
    return this.stages.map(stage => 'stage-' + stage.id);
  }
}
