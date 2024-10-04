import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/user.types';

const initialState: IUser = {
  id: '',
  username: null,
  fullName: null,
  gender: null,
  birthday: null,
  phoneNumber: null,
  email: '',
  role: '',
  createdAt: '',
  updatedAt: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state = { ...action.payload };
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
