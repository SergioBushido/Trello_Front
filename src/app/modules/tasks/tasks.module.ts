import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { TasksRoutingModule } from './tasks.routing.module';
import { TasksTableComponent } from './pages/tasks-table/tasks-table.component';


@NgModule({
  declarations: [
    TasksTableComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    CdkTableModule
  ]
})
export class TasksModule { }
