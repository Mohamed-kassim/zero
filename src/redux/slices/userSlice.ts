import {createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {useSelector} from 'react-redux';
import {UserSchema} from '../../db/models/User';

const initialState: UserSchema | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('action', action.payload);
      return {
        _id: action.payload._id.toString(),
        username: action.payload.username,
        email: action.payload.email,
      };
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const selectUserId = createSelector(
  [selectUser],
  (user: UserSchema | null) => user?._id,
);
export const {setUser} = userSlice.actions;

export const useUser = () => {
  const user = useSelector(selectUser);
  return user;
};
export const useUserId = () => {
  const userId = useSelector(selectUserId);
  return userId;
};

// Helper function to create a plain user object from Realm object
export const createPlainUserObject = (realmUser: any): UserSchema => {
  if (!realmUser) return null;
  return {
    _id: String(realmUser._id), // Convert ObjectId to string
    username: realmUser.username,
    email: realmUser.email,
  };
};

export default userSlice.reducer;
