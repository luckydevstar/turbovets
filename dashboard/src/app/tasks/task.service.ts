import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { withCredentials: true });
  }

  addTask(task: Partial<Task>): Observable<Task> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Task>(this.apiUrl, task, { headers, withCredentials: true });
  }
  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }
  updateTask(id: number, update: Partial<Task>) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Task>(`http://localhost:3000/api/tasks/${id}`, update, { headers, withCredentials: true });
  }

}
