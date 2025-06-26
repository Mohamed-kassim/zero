import {getRealm} from '../../utils/realmService';
import Currency, {
  createCurrencySchema,
  CreateCurrencySchema,
} from '../models/Currency';
import User from '../models/User';
import Realm from 'realm';

export const createCurrency = async (currencyData: CreateCurrencySchema) => {
  let createdCurrency: Currency | undefined;
  try {
    const parsedData = await createCurrencySchema.parseAsync(currencyData);
    const realm = await getRealm();

    const user = realm.objectForPrimaryKey<User>('User', parsedData.userId);
    if (!user) {
      throw new Error('User not found');
    }
    realm.write(() => {
      const uniqueId = new Realm.BSON.ObjectId();

      createdCurrency = realm.create('Currency', {
        _id: uniqueId,
        code: parsedData.code,
        symbol: parsedData.symbol,
        name: parsedData.name,
        user: user,
      }) as unknown as Currency;
    });
    return createdCurrency!;
  } catch (error) {
    throw error;
  }
};
