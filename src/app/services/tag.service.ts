import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Tag } from '@models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getTags() {
    return this.http.get<Tag[]>(`${this.apiUrl}/api/v1/tags`, {
      context: checkToken(),
    });
  }

  getTagById(id: number) {
    return this.http.get<Tag[]>(`${this.apiUrl}/api/v1/tags/${id}`, {
      context: checkToken(),
    });
  }

  createTag(tag: Tag) {
    return this.http.post<Tag>(`${this.apiUrl}/api/v1/tags`, tag, {
      context: checkToken(),
    });
  }

  updateTag(tagUpdated: Tag) {
    return this.http.put<Tag>(
      `${this.apiUrl}/api/v1/tags/${tagUpdated.id}`,
      tagUpdated,
      { context: checkToken() }
    );
  }

  deleteTag(id: number) {
    return this.http.delete<Tag>(`${this.apiUrl}/api/v1/tags/${id}`, {
      context: checkToken(),
    });
  }
  
}
