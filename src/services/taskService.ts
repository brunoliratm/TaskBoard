import { Injectable } from '@angular/core';
import tasks from '../repository/tasks.json';
import stages from '../repository/stages.json';
import * as fs from 'fs';

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
export class TaskService {
  private tasks: Task[] = tasks;
  private stages: Stage[] = stages.map(stage => ({
    ...stage,
    tasks: stage.tasks.map(taskId => this.tasks.find(task => task.id === taskId) as Task)
  }));

  getTasks() {
    return this.tasks;
  }

  getStages() {
    return this.stages;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  modifyTask(taskId: string, updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveTasks();
    }
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  reorderTasks(stageId: string, tasks: Task[]) {
    const stage = this.stages.find(stage => stage.id === stageId);
    if (stage) {
      stage.tasks = tasks;
      this.saveStages();
    }
  }

  moveTask(taskId: string, sourceStageId: string, targetStageId: string) {
    const sourceStage = this.stages.find(stage => stage.id === sourceStageId);
    const targetStage = this.stages.find(stage => stage.id === targetStageId);
    if (sourceStage && targetStage) {
      const task = sourceStage.tasks.find(task => task.id === taskId);
      if (task) {
        sourceStage.tasks = sourceStage.tasks.filter(task => task.id !== taskId);
        targetStage.tasks.push(task);
        this.saveStages();
      }
    }
  }

  private saveTasks() {
    fs.writeFileSync('../repository/tasks.json', JSON.stringify(this.tasks, null, 2));
  }

  private saveStages() {
    const stagesData = this.stages.map(stage => ({
      ...stage,
      tasks: stage.tasks.map(task => task.id)
    }));
    fs.writeFileSync('../repository/stages.json', JSON.stringify(stagesData, null, 2));
  }
}
