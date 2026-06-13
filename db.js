const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const DB_URL = process.env.DB_URL;

const db = async ()=>{
  if (!DB_URL) {
    console.log("DB_URL is missing !");
    return;
  }
try {
await mongoose.connect(DB_URL);
console.log("Database is connected successfully")
} catch (err) {
console.error('Database connection fails!:', err);
process.exit(1);
}
}

module.exports = db;