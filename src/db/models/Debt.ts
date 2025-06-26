import Realm, {ObjectSchema} from 'realm';
import User, {userSchema} from './User';
import Debtor, {debtorSchema} from './Debtor';
import {z} from 'zod';
import {objectIdSchema} from '../utils';

export const debtSchema = z.object({
  _id: objectIdSchema,
  description: z.string().min(1),
  amount: z.number().positive(),
  debtor: debtorSchema,
  user: userSchema,
  date: z.string(),
  type: z.enum(['Borrow', 'Lend']),
});

export type DebtSchema = z.infer<typeof debtSchema>;

export const createDebtSchema = debtSchema
  .omit({_id: true, user: true})
  .extend({
    userId: objectIdSchema,
    debtorId: objectIdSchema,
  });
export type CreateDebtSchema = z.infer<typeof createDebtSchema>;

export const updateDebtSchema = debtSchema.partial();
export type UpdateDebtSchema = z.infer<typeof updateDebtSchema>;

export const deleteDebtSchema = debtSchema.pick({_id: true});
export type DeleteDebtSchema = z.infer<typeof deleteDebtSchema>;

class Debt extends Realm.Object<Debt> {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  amount!: number;
  debtor!: Debtor;
  user!: User;
  date!: string;
  type!: string;

  static schema: ObjectSchema = {
    name: 'Debt',
    properties: {
      _id: 'objectId',
      description: 'string',
      amount: 'double',
      debtor: 'Debtor',
      user: 'User',
      date: 'string',
      type: 'string',
    },
    primaryKey: '_id',
  };
}

export default Debt;
