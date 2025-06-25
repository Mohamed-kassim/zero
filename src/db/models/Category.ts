import Realm, {ObjectSchema} from 'realm';
import User, {userSchema} from './User';
import z from 'zod';
import {objectIdSchema} from '../utils';

export const categorySchema = z.object({
  _id: objectIdSchema,
  name: z.string().min(1),
  archived: z.boolean(),
  user: userSchema.nullable(),
  icon: z.string().optional().nullable(),
  color: z.string().nullable().optional(),
});
export type CategorySchema = z.infer<typeof categorySchema>;

export const createCategorySchema = categorySchema
  .omit({_id: true, user: true, archived: true})
  .extend({
    userId: objectIdSchema,
  });
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = categorySchema.partial();
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;

export const deleteCategorySchema = categorySchema.pick({_id: true});
export type DeleteCategorySchema = z.infer<typeof deleteCategorySchema>;

class Category extends Realm.Object<CategorySchema> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  archived!: boolean;
  user!: User | null;
  icon?: string | null;
  color!: string | null;

  static schema: ObjectSchema = {
    name: 'Category',
    properties: {
      _id: 'objectId',
      name: 'string',
      archived: 'bool',
      user: 'User',
      icon: {type: 'string', optional: true},
      color: 'string',
    },
    primaryKey: '_id',
  };
}

export default Category;
