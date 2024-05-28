import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksTableComponent } from './pages/tasks-table/tasks-table.component';

const routes: Routes = [
  {
    path: '',
    component: TasksTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
