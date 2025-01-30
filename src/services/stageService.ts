import { Injectable } from '@angular/core';
import stages from '../repository/stages.json';

interface Task {
  id: string;
  title: string;
  description: string;
  stageId: string;
}

interface Stage {
  id: string;
  title: string;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private stages: Stage[] = stages.map(stage => ({
    ...stage,
    tasks: stage.tasks.map(taskId => ({ id: taskId, title: '', description: '', stageId: stage.id }))
  }));

  getStages() {
    return this.stages;
  }

  addStage(stage: Stage) {
    this.stages.push(stage);
  }

  modifyStage(stageId: string, updatedStage: Stage) {
    const index = this.stages.findIndex(stage => stage.id === stageId);
    if (index !== -1) {
      this.stages[index] = updatedStage;
    }
  }

  removeStage(stageId: string) {
    this.stages = this.stages.filter(stage => stage.id !== stageId);
  }

  reorderStages(stages: Stage[]) {
    this.stages = stages;
  }
}
