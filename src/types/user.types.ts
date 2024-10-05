export interface IUser {
  id: string;
  username: null;
  fullName: null;
  gender: null;
  birthday: null;
  phoneNumber: null;
  email: string;
  role: IRole;
  createdAt: string;
  updatedAt: string;
}

export type IRole = 'USER' | 'ADMIN';
