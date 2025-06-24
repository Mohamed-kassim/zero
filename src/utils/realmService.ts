import Realm from 'realm';
import User from '../db/schemas/UserSchema';
import Category from '../db/schemas/CategorySchema';
import Expense from '../db/schemas/ExpenseSchema';
import Currency from '../db/schemas/CurrencySchema';
import Debtor from '../db/schemas/DebtorSchema';
import Debt from '../db/schemas/DebtSchema';

export const realmConfig: Realm.Configuration = {
  schema: [User, Category, Expense, Currency, Debtor, Debt],
  schemaVersion: 0,
};

export const getRealm = () => {
  return Realm.open(realmConfig);
};
