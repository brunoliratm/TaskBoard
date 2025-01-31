import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface Stage {
  id: string;
  title: string;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private apiUrl = '/api/stages';

  constructor(private http: HttpClient) { }

  getStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(this.apiUrl);
  }

  updateStages(stages: Stage[]): Observable<Stage[]> {
    return this.http.put<Stage[]>(this.apiUrl, stages);
  }
}
