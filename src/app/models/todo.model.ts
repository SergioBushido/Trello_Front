import { Tag } from "./tag.model";

export interface ToDo {
  id?: number;
  title: string;
  status: string;
  projectId: number;
  tagIds: number[];
  description?: string;
}

export interface ToDoRequest {
  name: string;
  status: string;
  projectId: number;
  tagIds: number[];
  description?: string;
}

export interface Column {
  id: number;
  title: string;
  todos: ToDo[];
}


export function mapTodoRequestToTodo(todoRequest: ToDoRequest): ToDo { 
  return {
    title: todoRequest.name,
    status: todoRequest.status,
    projectId: todoRequest.projectId,
    tagIds: todoRequest.tagIds,
    description: todoRequest.description
  };
}

export function mapTodoToTodoRequest(todo: ToDo): ToDoRequest {
  return {
    name: todo.title,
    status: todo.status,
    projectId: todo.projectId,
    tagIds: todo.tagIds,
    description: todo.description
  };
}
