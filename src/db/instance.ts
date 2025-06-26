import Realm from 'realm';
import User from './models/User';
import Category from './models/Category';
import Expense from './models/Expense';
import Currency from './models/Currency';
import Debtor from './models/Debtor';
import Debt from './models/Debt';

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
