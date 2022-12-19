import { bgGreen, red } from "colors";
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI || '');
    console.log(bgGreen('Mongo Database successfully connected'));
  } catch (error) {
    console.log(red('Error connecting to MongoDB'));
    process.exit(1);
  }
}

export default connectDatabase;
