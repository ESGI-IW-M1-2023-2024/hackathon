interface User {
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  roles: string[];
}

export interface LoggedUser {
  token: string;
  user: User;
}

export interface UserCredentials {
  username: string;
  password: string;
}
