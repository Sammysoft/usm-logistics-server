import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGOURI = process.env.MONGOURI;

const dbInit = () => {
  console.log(`Database connecting...`);
  try {
    mongoose
      .connect(MONGOURI)
      .then((res) => {
        console.log(`Database connection established...`);
      })
      .catch((error) => console.log(`Error in database connection ${error}`));
  } catch (error) {
    return console.log(`Database connection error ${error}`);
  }
};

export default dbInit;
