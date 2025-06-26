import {z} from 'zod';
import {getDBInstance} from '../instance';
import {
  createUserSchema,
  createCategorySchema,
  createDebtorSchema,
  createCurrencySchema,
  createExpenseSchema,
  createDebtSchema,
} from '../models';

import Category from '../models/Category';
import Debtor from '../models/Debtor';
import Currency from '../models/Currency';
import Expense from '../models/Expense';
import Debt from '../models/Debt';
import Realm from 'realm';
import User from '../models/User';

export const dbFileSchema = z.object({
  key: z
    .string()
    .length(20)
    .refine(
      key => {
        const prefix = key.slice(0, 4);
        return prefix === 'zero';
      },
      {message: 'Key must start with "zero"'},
    )
    .refine(
      key => {
        const alphanumericPart = key.slice(4);
        return /^[a-zA-Z0-9]+$/.test(alphanumericPart);
      },
      {message: 'Key must contain only alphanumeric characters after "zero"'},
    ),
  data: z.object({
    users: z.array(createUserSchema),
    categories: z.array(createCategorySchema.omit({userId: true})),
    debtors: z.array(createDebtorSchema.omit({userId: true})),
    currencies: z.array(createCurrencySchema.omit({userId: true})),
    expenses: z.array(
      createExpenseSchema.omit({userId: true, categoryId: true}).extend({
        category: z.object({
          name: z.string(),
        }),
      }),
    ),
    debts: z.array(
      createDebtSchema.omit({userId: true, debtorId: true}).extend({
        debtor: z.object({
          title: z.string(),
        }),
      }),
    ),
  }),
});

export type DBFile = z.infer<typeof dbFileSchema>;

// TODO: remove cast and use realm types
export const restoreDatabaseData = async (dbFile: DBFile) => {
  let restoredData: {
    user?: User;
    categories?: Category[];
    debtors?: Debtor[];
    currencies?: Currency[];
    expenses?: Expense[];
    debts?: Debt[];
  } = {};

  const realm = await getDBInstance();
  realm.write(() => {
    const userId = new Realm.BSON.ObjectId();
    const createdUser = realm.create('User', {
      ...dbFile.data.users[0],
      _id: userId,
    });
    restoredData.user = createdUser as unknown as User;

    const createdCategories = dbFile.data.categories.map(category =>
      realm.create('Category', {
        ...category,
        _id: new Realm.BSON.ObjectId(),
        archived: false,
        user: createdUser,
      }),
    );
    restoredData.categories = createdCategories as unknown as Category[];
    const createdDebtors = dbFile.data.debtors.map(debtor =>
      realm.create('Debtor', {
        ...debtor,
        _id: new Realm.BSON.ObjectId(),
        archived: false,
        user: createdUser,
      }),
    );
    restoredData.debtors = createdDebtors as unknown as Debtor[];
    const createdCurrencies = dbFile.data.currencies.map(currency =>
      realm.create('Currency', {
        ...currency,
        _id: new Realm.BSON.ObjectId(),
        user: createdUser,
      }),
    );
    restoredData.currencies = createdCurrencies as unknown as Currency[];

    const createdExpenses = dbFile.data.expenses.map(expense =>
      realm.create('Expense', {
        ...expense,
        _id: new Realm.BSON.ObjectId(),
        user: createdUser,
        category: createdCategories.find(
          category => category.name === expense.category.name,
        ),
      }),
    );
    restoredData.expenses = createdExpenses as unknown as Expense[];

    const createdDebts = dbFile.data.debts.map(debt =>
      realm.create('Debt', {
        ...debt,
        _id: new Realm.BSON.ObjectId(),
        user: createdUser,
        debtor: createdDebtors.find(
          debtor => debtor.title === debt.debtor.title,
        ),
      }),
    );
    restoredData.debts = createdDebts as unknown as Debt[];
  });

  return restoredData;
};

export const deleteAllData = async () => {
  const realm = await getDBInstance();
  realm.write(() => {
    realm.deleteAll();
  });
};
