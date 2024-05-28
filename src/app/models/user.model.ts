export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface UserResponse {
  id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  avatar?: string;
}
