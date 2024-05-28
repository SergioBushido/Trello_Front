import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { OutputData, TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';

import { ToDo, Column, ToDoRequest, mapTodoRequestToTodo, mapTodoToTodoRequest } from '@models/todo.model';
import { Task, mapTaskToToDo, mapResponseTaskToTask } from '@models/task.model';
import { TaskService } from '@services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '@models/tag.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit {

  faTrash = faTrash;
  tasks: Task[] = [];
  showModal = false;
  projectId: string | null = null;

  columns: Column[] = [
    { id: 1, title: 'ToDo', todos: [] },
    { id: 2, title: 'Doing', todos: [] },
    { id: 3, title: 'Done', todos: [] },
  ];

  connectedDropLists: string[] = [];

  constructor(private dialog: Dialog, private taskService: TaskService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTasks();
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
    });
  }



  loadTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      // Limpiar todos los todos en cada columna antes de añadir nuevos
      this.columns.forEach(column => column.todos = []);
  
      // Clasificar tareas en las columnas basado en su estado
      tasks.forEach(task => {
        const column = this.columns.find(c => c.title === task.status);
        if (column) {
          const todoToAdd: ToDo = mapTaskToToDo(task);
          column.todos.push(todoToAdd);
        }
      }); 
    });
  }
  

  createTask(taskData: ToDoRequest) {
    this.taskService.createTask(taskData)
    .subscribe((responseTask) => {
      this.tasks.push(mapResponseTaskToTask(responseTask));
    });
    this.cdr.detectChanges();
  }

  updateTask(id: number, toDoRequest: ToDoRequest) {
    this.taskService.updateTask(id, toDoRequest)
    .subscribe((updatedTask) => {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    });
    this.cdr.detectChanges();
  }

  deleteTask(event: MouseEvent, taskId: number) {
    event.stopPropagation();
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
       this.loadTasks();
       this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al borrar la tarea', error);
      }
    });
  }
  

  getTasksById(id: number) {
    return this.tasks.filter((task: Task) => task.id === id);
  }


  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
  
      const todo: ToDo = event.item.data; // Aquí accedes a los datos de la tarea que se está moviendo
      const newColumnIndex = this.getColumnIndex(event.container.id);
      if (newColumnIndex === -1 || newColumnIndex >= this.columns.length) {
        console.error('Invalid column index:', newColumnIndex);
        return;
      }
  
      const newColumn = this.columns[newColumnIndex];
      todo.status = newColumn.title; // Actualizar el estado con el título de la nueva columna
  
      this.updateTask(todo.id!, mapTodoToTodoRequest(todo));
    }
  }
  

  getColumnIndex(containerId: string): number {
    // Extraer el número al final del ID que representa el índice de la columna en el array `columns`
    const indexPart = containerId.split('-').pop();
    const index = Number(indexPart);
  
    if (isNaN(index)) {
      console.error('Failed to parse index from container ID:', containerId);
      return -1;
    }
  
    return index;
  }

  addColumn(title: string) {
    this.columns.push({
      id: this.columns.length + 1,
      title: title,
      todos: []
    });
    this.showModal = false; // Close modal after adding
  }

  deleteColumn(columnId: number) {
    this.columns = this.columns.filter((column) => column.id !== columnId);
  }

  openNewTaskDialog(column: Column) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: { todo: { id: null, title: '', status: column.title, description: '' } }  
    });

    dialogRef.closed.subscribe((result: any) => {
      if (result && result.todo) {
        console.log('newTodo:', result);
        const newTodo: ToDoRequest = {
          name: result.todo.title,
          status: column.title,
          projectId: Number(this.projectId),
          tagIds: result.todo.tagIds || [],
          description: result.todo.description || ''
        }
        console.log('newTodo:', newTodo);
        this.createTask(newTodo);
        column.todos.push(mapTodoRequestToTodo(newTodo));
      }
    });
  }

  openDialog(todo: ToDo) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        todo: { ...todo }, 
      },
    });
    dialogRef.closed.subscribe((output: any) => {
      if (output && output.isEdit) {
        this.updateTask(output.todo.id!, mapTodoToTodoRequest(output.todo));
      }
    });
  }
}

