import Realm from 'realm';
import User from './schemas/UserSchema';
import Category from './schemas/CategorySchema';
import Expense from './schemas/ExpenseSchema';
import Currency from './schemas/CurrencySchema';
import Debtor from './schemas/DebtorSchema';
import Debt from './schemas/DebtSchema';

export const realmConfig: Realm.Configuration = {
  schema: [User, Category, Expense, Currency, Debtor, Debt],
  schemaVersion: 0,
};

export let dbInstance: Realm | null = null;

export const getDBInstance = async () => {
  if (!dbInstance) {
    try {
      dbInstance = await Realm.open(realmConfig);
    } catch (error) {
      console.error('Error opening realm:', error);
      throw error;
    }
  }
  return dbInstance;
};

export const closeDBInstance = async () => {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
  }
};
