import Realm, {ObjectSchema} from 'realm';
import User, {userSchema} from './User';
import Category, {categorySchema} from './Category';
import {z} from 'zod';
import {objectIdSchema} from '../utils';

export const expenseSchema = z.object({
  _id: objectIdSchema,
  title: z.string().min(1),
  amount: z.number().positive(),
  description: z.string().optional(),
  category: categorySchema,
  user: userSchema,
  date: z.string(),
});

export type ExpenseSchema = z.infer<typeof expenseSchema>;

export const createExpenseSchema = expenseSchema
  .omit({_id: true, user: true})
  .extend({
    userId: objectIdSchema,
    categoryId: objectIdSchema,
  });
export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;

export const updateExpenseSchema = expenseSchema.partial();
export type UpdateExpenseSchema = z.infer<typeof updateExpenseSchema>;

export const deleteExpenseSchema = expenseSchema.pick({_id: true});
export type DeleteExpenseSchema = z.infer<typeof deleteExpenseSchema>;

class Expense extends Realm.Object<Expense> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  amount!: number;
  description?: string;
  category!: Category;
  user!: User;
  date!: string;

  static schema: ObjectSchema = {
    name: 'Expense',
    properties: {
      _id: 'objectId',
      title: 'string',
      amount: 'double',
      description: 'string',
      category: 'Category',
      user: 'User',
      date: 'string',
    },
    primaryKey: '_id',
  };
}

export default Expense;
