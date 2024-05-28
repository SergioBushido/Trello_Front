import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { TagsRoutingModule } from './tags.routing.module';
import { TagsTableComponent } from './pages/tags-table/tags-table.component';


@NgModule({
  declarations: [
    TagsTableComponent,
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    CdkTableModule
  ]
})
export class TagsModule { }
