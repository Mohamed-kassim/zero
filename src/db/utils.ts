import {z} from 'zod';
import Realm from 'realm';

export const objectIdSchema = z.instanceof(Realm.BSON.ObjectId);
