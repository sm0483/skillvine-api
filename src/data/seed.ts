import connectDB from '@/api/config/db.config';
import Category from '@/api/models/category.models';
import data from './collection';

const seedData = async () => {
  await connectDB();
  try {
    await Category.deleteMany({});
    await Category.create(data);
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedData();
