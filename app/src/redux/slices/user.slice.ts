import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoggedUser } from '../../features/auth/types/logged-user.type';

type UserState = LoggedUser | null;
export const initialState = null as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoggedUser>) => {
      document.cookie = `loggedUser=${JSON.stringify(action.payload)}; path=/;`;
      return state ?? action.payload;
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeUser: () => initialState,
  },
});

export const { setUser, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
