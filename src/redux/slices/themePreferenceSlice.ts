import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

type ThemePreference = 'system' | 'dark' | 'light';
interface ThemePreferenceState {
  theme: ThemePreference;
}
const initialState: ThemePreferenceState = {
  theme: 'system',
};

const themePreferenceSlice = createSlice({
  name: 'themePreference',
  initialState,
  reducers: {
    setThemePreference: (state, action) => {
      console.log('in slice', action.payload);
      state.theme = action.payload;
    },
  },
});

export const selectThemePreference = (state: RootState) =>
  state.themePreference.theme;

export const {setThemePreference} = themePreferenceSlice.actions;

export default themePreferenceSlice.reducer;
