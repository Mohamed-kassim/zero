import Realm from 'realm';
import User from '../db/models/User';
import Category from '../db/models/Category';
import Expense from '../db/models/Expense';
import Currency from '../db/models/Currency';
import Debtor from '../db/models/Debtor';
import Debt from '../db/models/Debt';

export const realmConfig: Realm.Configuration = {
  schema: [User, Category, Expense, Currency, Debtor, Debt],
  schemaVersion: 2,
  onMigration: (oldRealm: Realm, newRealm: Realm) => {
    if (oldRealm.schemaVersion < 1) {
      const oldCategories = oldRealm.objects('Category');
      const newCategories = newRealm.objects('Category');

      for (let index = 0; index < oldCategories.length; index++) {
        const oldCategory = oldCategories[index];
        const newCategory = newCategories[index];

        newCategory.archived = oldCategory.categoryStatus;
      }
    }
    if (oldRealm.schemaVersion < 2) {
      const oldDebtors = oldRealm.objects('Debtor');
      const newDebtors = newRealm.objects('Debtor');

      for (let index = 0; index < oldDebtors.length; index++) {
        const oldDebtor = oldDebtors[index];
        const newDebtor = newDebtors[index];

        newDebtor.archived = oldDebtor.debtorStatus;
      }
    }
  },
};

export const getRealm = () => {
  return Realm.open(realmConfig);
};
