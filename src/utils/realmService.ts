import Realm from 'realm';
import User from '../db/models/User';
import Category from '../db/models/Category';
import Expense from '../db/models/Expense';
import Currency from '../db/models/Currency';
import Debtor from '../db/models/Debtor';
import Debt from '../db/models/Debt';

export const realmConfig: Realm.Configuration = {
  schema: [User, Category, Expense, Currency, Debtor, Debt],
  schemaVersion: 0,
};

export const getRealm = () => {
  return Realm.open(realmConfig);
};
