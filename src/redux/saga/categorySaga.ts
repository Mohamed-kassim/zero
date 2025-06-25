import {call, put, select, takeEvery} from 'redux-saga/effects';
import {selectUserId} from '../slices/userSlice';
import {FETCH_ALL_CATEGORY_DATA} from '../actionTypes';
import {getAllCategoriesByUserId} from '../../db/services/CategoryService';
import {setCategoryData} from '../slices/categoryDataSlice';

function* fetchAllCategories(): Generator<any, void, any> {
  try {
    console.log('in categories');
    const userId = yield select(selectUserId);
    const categories = yield call(getAllCategoriesByUserId, userId);
    yield put(setCategoryData(categories));
    console.log('all categories in saga', categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

export function* watchFetchAllCategories() {
  yield takeEvery(FETCH_ALL_CATEGORY_DATA, fetchAllCategories);
}
