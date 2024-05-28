import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

import { Tag } from '@models/tag.model';

export class DataSourceTag extends DataSource<Tag> {

  data = new BehaviorSubject<Tag[]>([]);
  originalData: Tag[]= [];

  connect(): Observable<Tag[]> {
    return this.data;
  }

  init(data: Tag[]) {
    this.originalData = data;
    this.data.next(data);
  }

  disconnect() { }

}
