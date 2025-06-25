import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {useDispatch} from 'react-redux';

const initialState = {
  isOnboarded: false,
};

const isOnboardedSlice = createSlice({
  name: 'userOnboarding',
  initialState,
  reducers: {
    setIsOnboarded: (state, action) => {
      console.log(action.payload);
      state.isOnboarded = action.payload;
    },
  },
});

export const selectIsOnboarded = (state: RootState) =>
  state.userOnboarding.isOnboarded;

export const {setIsOnboarded} = isOnboardedSlice.actions;

export const useSetIsOnboarded = () => {
  const dispatch = useDispatch();
  return (isOnboarded: boolean) => {
    dispatch(setIsOnboarded(isOnboarded));
  };
};
export default isOnboardedSlice.reducer;
