import Realm, {ObjectSchema} from 'realm';
import User from './User';
import Category from './Category';

class Expense extends Realm.Object<Expense> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  amount!: number;
  description?: string;
  category!: Category;
  user!: User;
  date!: string;

  static schema: ObjectSchema = {
    name: 'Expense',
    properties: {
      _id: 'objectId',
      title: 'string',
      amount: 'double',
      description: 'string',
      category: 'Category',
      user: 'User',
      date: 'string',
    },
    primaryKey: '_id',
  };
}

export default Expense;
