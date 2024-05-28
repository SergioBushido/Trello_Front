import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { ResponseTask, Task } from '@models/task.model';
import { ToDoRequest } from '@models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(`${this.apiUrl}/api/v1/tasks`, {
      context: checkToken(),
    });
  }

  getTaskById(id: number) {
    return this.http.get<Task[]>(`${this.apiUrl}/api/v1/tasks/${id}`, {
      context: checkToken(),
    });
  }

  createTask(task: ToDoRequest) {
    return this.http.post<ResponseTask>(`${this.apiUrl}/api/v1/tasks`, task, {
      context: checkToken(),
    });
  }

  updateTask(id: number,  toDoRequest: ToDoRequest) {
    return this.http.put<Task>(
      `${this.apiUrl}/api/v1/tasks/${id}`,
      toDoRequest,
      { context: checkToken() }
    );
  }

  deleteTask(id: number) {
    return this.http.delete<Task>(`${this.apiUrl}/api/v1/tasks/${id}`, {
      context: checkToken(),
    });
  }
}
