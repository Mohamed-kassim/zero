import {getRealm} from '../../utils/realmService';
import Realm from 'realm';
import User, {createUserSchema, CreateUserSchema} from '../models/User';

export const createUser = async (userData: CreateUserSchema) => {
  let createdUser: User | undefined;
  try {
    const parsedData = await createUserSchema.parseAsync(userData);
    const realm = await getRealm();

    realm.write(() => {
      const uniqueId = new Realm.BSON.ObjectId();
      createdUser = realm.create('User', {
        _id: uniqueId,
        username: parsedData.username,
        email: parsedData.email,
      });
    });
    return createdUser!;
  } catch (error) {
    throw error;
  }
};
