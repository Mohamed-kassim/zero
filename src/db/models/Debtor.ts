import Realm, {ObjectSchema} from 'realm';
import User, {userSchema} from './User';
import {z} from 'zod';
import {objectIdSchema} from '../utils';

export const debtorSchema = z.object({
  _id: objectIdSchema,
  title: z.string().min(1),
  type: z.string(),
  debtorStatus: z.boolean(),
  user: userSchema.nullable(),
  icon: z.string().optional().nullable(),
  color: z.string().nullable(),
});

export type DebtorSchema = z.infer<typeof debtorSchema>;

export const createDebtorSchema = debtorSchema
  .omit({_id: true, user: true, debtorStatus: true})
  .extend({
    userId: objectIdSchema,
  });
export type CreateDebtorSchema = z.infer<typeof createDebtorSchema>;

export const updateDebtorSchema = debtorSchema.partial();
export type UpdateDebtorSchema = z.infer<typeof updateDebtorSchema>;

export const deleteDebtorSchema = debtorSchema.pick({_id: true});
export type DeleteDebtorSchema = z.infer<typeof deleteDebtorSchema>;

class Debtor extends Realm.Object<Debtor> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  type!: string;
  debtorStatus!: boolean;
  user!: User | null;
  icon?: string | null;
  color!: string | null;

  static schema: ObjectSchema = {
    name: 'Debtor',
    properties: {
      _id: 'objectId',
      title: 'string',
      type: 'string',
      debtorStatus: 'bool',
      user: 'User',
      icon: {type: 'string', optional: true},
      color: 'string',
    },
    primaryKey: '_id',
  };
}

export default Debtor;
