import {getRealm} from '../../utils/realmService';
import Realm from 'realm';
import {createUserSchema, CreateUserSchema} from '../models/User';

export const createUser = async (userData: CreateUserSchema) => {
  const parsedData = await createUserSchema.parseAsync(userData);
  const realm = await getRealm();

  realm.write(() => {
    const uniqueId = new Realm.BSON.ObjectId();
    realm.create('User', {
      _id: uniqueId,
      username: parsedData.username,
      email: parsedData.email,
    });
  });
};
