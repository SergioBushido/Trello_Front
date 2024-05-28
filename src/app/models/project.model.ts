import { UserResponse } from "./user.model";

export interface Project {
  id: string;
  name: string;

}

export interface ResponseProject { 
  id: number;
  name: string;
  user: UserResponse;
}
