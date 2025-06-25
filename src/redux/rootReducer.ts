import {combineReducers} from 'redux';
import userOnboardingReducer from './slices/isOnboardedSlice';
import currencyDataReducer from './slices/currencyDataSlice';
import themePreferenceReducer from './slices/themePreferenceSlice';
import userNameReducer from './slices/userNameSlice';
import userEmailReducer from './slices/userEmailSlice';
import userReducer from './slices/userSlice';
import categoryReducer from './slices/categoryDataSlice';
import expenseReducer from './slices/expenseDataSlice';
import debtorReducer from './slices/debtorDataSlice';
import debtReducer from './slices/debtDataSlice';
import allDebtReducer from './slices/allDebtDataSlice';
import everydayExpenseReducer from './slices/everydayExpenseDataSlice';
import allDataReducer from './slices/allDataSlice';
import individualDebtorReducer from './slices/IndividualDebtorSlice';

const rootReducer = combineReducers({
  userOnboarding: userOnboardingReducer,
  currencyData: currencyDataReducer,
  themePreference: themePreferenceReducer,
  userName: userNameReducer,
  userEmail: userEmailReducer,
  user: userReducer,
  category: categoryReducer,
  expense: expenseReducer,
  debtor: debtorReducer,
  debt: debtReducer,
  allDebt: allDebtReducer,
  everydayExpense: everydayExpenseReducer,
  allData: allDataReducer,
  individualDebtor: individualDebtorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
