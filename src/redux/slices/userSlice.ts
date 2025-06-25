import {createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import User from '../../db/models/User';

const initialState: User | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('action', action.payload);
      return action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const selectUserId = createSelector([selectUser], user => user?._id);
export const {setUser} = userSlice.actions;

export default userSlice.reducer;
