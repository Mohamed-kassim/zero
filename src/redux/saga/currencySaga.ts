import {call, put, select, takeLatest} from 'redux-saga/effects';
import {setCurrencyData} from '../slices/currencyDataSlice';
import {FETCH_CURRENCY_DATA} from '../actionTypes';
import {selectUserId} from '../slices/userSlice';
import {getCurrencyByUserId} from '../../db/services/CurrencyService';

function* fetchCurrency(): Generator<any, void, any> {
  try {
    const userId = yield select(selectUserId);
    const currencies = yield call(getCurrencyByUserId, userId);
    const currencyId = String(currencies[0]?._id);
    const currencyName = currencies[0]?.name;
    const currencySymbol = currencies[0]?.symbol;
    const currencyCode = currencies[0]?.code;
    const currencyData = {
      currencyId,
      currencyName,
      currencySymbol,
      currencyCode,
    };
    yield put(setCurrencyData(currencyData));
  } catch (error) {
    console.error('Error fetching currency:', error);
  }
}

export function* watchFetchCurrency() {
  yield takeLatest(FETCH_CURRENCY_DATA, fetchCurrency);
}
