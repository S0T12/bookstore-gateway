export type User = {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role?: string;
  assignedBy?: string;
};
