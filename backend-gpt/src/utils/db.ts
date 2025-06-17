import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectToDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(mongoURI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", (error as Error).message);
  }
};

export default ConnectToDB;
