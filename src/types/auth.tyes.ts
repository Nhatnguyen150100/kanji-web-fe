import { IRole } from './user.types';

export interface ILogin {
  email: string;
  password: string;
}

export interface IResponseLogin {
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
  accessToken: string;
}
