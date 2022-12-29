export {};

declare global {
  namespace Express {
    interface User {
      id?: string;
      username: string;
      password: string;
      role: string;
      service: string;
      admin: boolean;
    }
  }
}
