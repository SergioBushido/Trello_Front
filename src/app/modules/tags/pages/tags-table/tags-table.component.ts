import { Component, OnInit } from '@angular/core';

import { DataSourceTag } from './data-source';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth.service';
import { Tag } from '@models/tag.model';
import { TagService } from '@services/tag.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-tags-table',
  templateUrl: './tags-table.component.html'
})
export class TagsTableComponent implements OnInit {

  dataSource = new DataSourceTag();
  columns: string[] = ['id', 'name'];
  tag: Tag | null = null;
  user: User | null = null;

  constructor(
    private tagService: TagService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getTags();
    this.authService.user$
    .subscribe(user => {
      this.user = user;
    })
  }

  getTags() {
    this.tagService.getTags()
    .subscribe(tags => {
      this.dataSource.init(tags);
    })
  }

}
