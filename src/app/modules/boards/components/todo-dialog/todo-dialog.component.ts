import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { faClose, faCheckToSlot, faBars, faUser, faTag, faCheckSquare, faClock } from '@fortawesome/free-solid-svg-icons';
import { ToDo } from '@models/todo.model';
import { Tag } from '@models/tag.model';
import { TagService } from '@services/tag.service';

interface InputData {
  todo: ToDo;
}

export interface OutputData {
  todo: ToDo;
  isEdit: boolean;
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
})
export class TodoDialogComponent implements OnInit {
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  todo: ToDo;
  tags: Tag[] = [];

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData,
    private tagService: TagService
  ) {
    this.todo = data.todo || { title: '', status: '', description: '' };
  }

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.tagService.getTags().subscribe({
      next: (tags) => {
        this.tags = tags;
      },
      error: (error) => {
        console.error('Error loading tags:', error);
      }
    });
  }


  close() {
    this.dialogRef.close();
  }

  saveTodo() {
    this.dialogRef.close({ todo: this.todo, isEdit: !!this.todo.id });
    // this.taskService.createTask(this.todo).subscribe({
    //   next: (newTask) => {
    //     this.dialogRef.close({ todo: this.todo, isEdit: !!this.todo.id });
    //   },
    //   error: (error) => {
    //     console.error('Error creating task:', error);
    //   }
    // });
  }
}
