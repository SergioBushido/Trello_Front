import { Component, OnInit } from '@angular/core';

import { DataSourceTask } from './data-source';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user.model';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html'
})
export class TasksTableComponent implements OnInit {

  dataSource = new DataSourceTask();
  columns: string[] = ['id', 'name', 'project', 'tags'];
  user: User | null = null;
  task: Task | null = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.authService.user$
    .subscribe(user => {
      this.user = user;
    })
  }

  getTasks() {
    this.taskService.getTasks()
    .subscribe(tasks => {
      this.dataSource.init(tasks);
    })
  }

}
