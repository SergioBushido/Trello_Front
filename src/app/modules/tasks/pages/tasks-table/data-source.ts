import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

import { Task } from '@models/task.model';

export class DataSourceTask extends DataSource<Task> {

  data = new BehaviorSubject<Task[]>([]);
  originalData: Task[]= [];

  connect(): Observable<Task[]> {
    return this.data;
  }

  init(data: Task[]) {
    this.originalData = data;
    this.data.next(data);
  }

  disconnect() { }

}
