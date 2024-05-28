import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Project } from '@models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<Project[]>(`${this.apiUrl}/api/v1/projects`, {
      context: checkToken(),
    });
  }

  getProjectById(id: string) {
    return this.http.get<Project[]>(`${this.apiUrl}/api/v1/projects/${id}`, {
      context: checkToken(),
    });
  }

  createProject(project: Project) {
    return this.http.post<Project>(`${this.apiUrl}/api/v1/projects`, project, {
      context: checkToken(),
    });
  }

  updateProject(projectUpdated: Project) {
    return this.http.put<Project>(
      `${this.apiUrl}/api/v1/projects/${projectUpdated.id}`,
      projectUpdated,
      { context: checkToken() }
    );
  }

  deleteProject(id: string) {
    return this.http.delete<Project>(`${this.apiUrl}/api/v1/projects/${id}`, {
      context: checkToken(),
    });
  }

}
