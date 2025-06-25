import {getRealm} from '../../utils/realmService';
import Realm from 'realm';
import Category, {
  createCategorySchema,
  CreateCategorySchema,
} from '../models/Category';
import User from '../models/User';
import z from 'zod';

export const createCategory = async (categoryData: CreateCategorySchema) => {
  let createdCategory: Category | undefined;
  try {
    const parsedData = await createCategorySchema.parseAsync(categoryData);
    const realm = await getRealm();

    const user = realm.objectForPrimaryKey<User>('User', parsedData.userId);
    if (!user) {
      throw new Error('User not found');
    }
    realm.write(() => {
      const uniqueId = new Realm.BSON.ObjectId();

      createdCategory = realm.create('Category', {
        _id: uniqueId,
        name: parsedData.name,
        archived: false,
        user: user,
        icon: parsedData.icon,
        color: parsedData.color,
      }) as unknown as Category;
    });
    return createdCategory!;
  } catch (error) {
    throw error;
  }
};

export const createBulkCategories = async (
  categoryData: CreateCategorySchema[],
) => {
  const realm = await getRealm();
  const parsedData = await z
    .array(createCategorySchema)
    .parseAsync(categoryData);
  let createdCategories: Category[] = [];
  realm.write(() => {
    parsedData.forEach(async category => {
      const uniqueId = new Realm.BSON.ObjectId();
      const user = realm.objectForPrimaryKey<User>('User', category.userId);
      if (!user) {
        throw new Error('User not found');
      }
      const createdCategory = realm.create('Category', {
        _id: uniqueId,
        name: category.name,
        user: user,
        archived: false,
        icon: category.icon,
        color: category.color,
      }) as unknown as Category;
      createdCategories.push(createdCategory);
    });
  });
  return createdCategories;
};
