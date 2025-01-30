import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from '../../services/taskService';
import { StageService } from '../../services/stageService';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Stage {
  id: string;
  title: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  stageId: string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  imports: [CommonModule, HttpClientModule, DragDropModule]
})
export class BoardComponent implements OnInit {
  stages: Stage[] = [];
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private stageService: StageService) { }

  ngOnInit() {
    this.stages = this.taskService.getStages();
    this.tasks = this.taskService.getTasks();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const stageId = event.container.id;
      const stage = this.stages.find(stage => stage.id === stageId);
      if (stage) {
        this.taskService.reorderTasks(stageId, stage.tasks);
      }
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const taskId = event.item.data.id;
      const sourceStageId = event.previousContainer.id;
      const targetStageId = event.container.id;
      this.taskService.moveTask(taskId, sourceStageId, targetStageId);
    }
  }
}
