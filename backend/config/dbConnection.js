const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URI);
    console.log('Mongo Database successfully connected'.bgGreen);
  } catch (error) {
    console.log('Error connecting to MongoDB'.red);
    process.exit(1);
  }
}

module.exports = connectDatabase;