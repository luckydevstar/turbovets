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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Task[]>(this.apiUrl, { headers });
  }

  addTask(task: Partial<Task>): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Task>(this.apiUrl, task, { headers });
  }
  deleteTask(id: number) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  updateTask(id: number, update: Partial<Task>) {
    return this.http.put<Task>(`http://localhost:3000/api/tasks/${id}`, update);
  }

}
