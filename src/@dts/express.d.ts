interface User {
  id: string;
  email: string;
  roleName: 'admin' | 'client';
}

declare namespace Express {
  interface Request {
    user?: User;
  }
}
