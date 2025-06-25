import {z} from 'zod';
import Realm from 'realm';

export const objectIdSchema = z
  .string()
  .refine(value => Realm.BSON.ObjectId.isValid(value), {
    message: 'Invalid ObjectId',
  });
