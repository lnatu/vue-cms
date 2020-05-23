const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserModel = require('./../server/models/UserModel');
const SupplierModel = require('./../server/models/SupplierModel');
const CategoryModel = require('./../server/models/CategoryModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// Read json file
const categories = JSON.parse(fs.readFileSync(`${__dirname}/categories.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const suppliers = JSON.parse(fs.readFileSync(`${__dirname}/suppliers.json`, 'utf-8'));

// Import data
const importData = async () => {
  try {
    await CategoryModel.create(categories);
    await UserModel.create(users);
    await SupplierModel.create(suppliers);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    // await CategoryModel.deleteMany();
    await UserModel.deleteMany();
    // await SupplierModel.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
