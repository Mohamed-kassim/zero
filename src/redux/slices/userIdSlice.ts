import {RootState} from '../rootReducer';

export const selectUserId = (state: RootState) => state.user?._id.toString();
