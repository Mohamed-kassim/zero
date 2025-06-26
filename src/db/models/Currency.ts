import Realm, {ObjectSchema} from 'realm';
import User, {userSchema} from './User';
import {z} from 'zod';
import {objectIdSchema} from '../utils';

const currencySchema = z.object({
  _id: objectIdSchema,
  code: z.string(),
  symbol: z.string(),
  name: z.string(),
  user: userSchema.nullable(),
});

export type CurrencyType = z.infer<typeof currencySchema>;
export const createCurrencySchema = currencySchema
  .omit({_id: true, user: true})
  .extend({
    userId: objectIdSchema,
  });
export type CreateCurrencySchema = z.infer<typeof createCurrencySchema>;

export const updateCurrencySchema = createCurrencySchema.partial();
export type UpdateCurrencySchema = z.infer<typeof updateCurrencySchema>;

export const deleteCurrencySchema = currencySchema.pick({_id: true});
export type DeleteCurrencySchema = z.infer<typeof deleteCurrencySchema>;

class Currency extends Realm.Object<Currency> {
  _id!: Realm.BSON.ObjectId;
  code!: string;
  symbol!: string;
  name!: string;
  user!: User | null;

  static schema: ObjectSchema = {
    name: 'Currency',
    properties: {
      _id: 'objectId',
      code: 'string',
      symbol: 'string',
      name: 'string',
      user: 'User',
    },
    primaryKey: '_id',
  };
}

export default Currency;
