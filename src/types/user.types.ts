export interface IUser {
  id: string;
  userName: null;
  fullName: null;
  gender: null;
  birthDay: null;
  phoneNumber: null;
  email: string;
  role: IRole;
  createdAt: string;
  updatedAt: string;
}

export type IRole = 'USER' | 'ADMIN';
