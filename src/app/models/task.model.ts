import { ResponseProject } from "./project.model";
import { Tag } from "./tag.model";
import { ToDo, ToDoRequest } from "./todo.model";

export interface Task {
  id: number;
  name: string;
  status: string;
  project: ResponseProject;
  description?: string;
  tagIds: number[];
}

export interface ResponseTask {
  id: number;
  title: string;
  status: string;
  project: ResponseProject;
  description?: string;
  tagIds: number[];
}


// Mapea Task a ToDo
export function mapTaskToToDo(task: Task): ToDo {
  return {
    id: task.id,
    title: task.name,
    status: task.status,
    projectId: task.project.id,
    tagIds: task.tagIds,
    description: task.description
  };
}


// Mapea ToDo a Task
export function mapResponseTaskToTask(responseTask: ResponseTask): Task {
  return {
    id: responseTask.id,
    name: responseTask.title,
    status: responseTask.status,
    project: responseTask.project,
    tagIds: responseTask.tagIds,
    description: responseTask.description
  };
}
