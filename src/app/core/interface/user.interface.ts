/* The `User` interface has four properties: `username`, `email`,
`password`, and `favorite_list`. */
export interface User {
  username: string;
  email: string;
  password: string;
  favorite_list?: [];
}
