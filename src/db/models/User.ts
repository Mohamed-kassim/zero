import Realm, {ObjectSchema} from 'realm';
import {z} from 'zod';
import {objectIdSchema} from '../utils';

export const userSchema = z.object({
  _id: objectIdSchema,
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .max(50, 'Username cannot exceed 50 characters.')
    .refine(value => /^[A-Za-z\s]+$/.test(value), {
      message: 'Username can only contain letters and spaces.',
    }),
  email: z.string().email('Invalid email address.'),
});

export const createUserSchema = userSchema.omit({_id: true});
export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = userSchema.partial();
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const deleteUserSchema = userSchema.pick({_id: true});
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;

export type UserSchema = z.infer<typeof userSchema>;

class User extends Realm.Object<UserSchema> {
  _id!: Realm.BSON.ObjectId;
  username!: string;
  email!: string;

  static schema: ObjectSchema = {
    name: 'User',
    properties: {
      _id: 'objectId',
      username: 'string',
      email: 'string',
    },
    primaryKey: '_id',
  };
}

export default User;
