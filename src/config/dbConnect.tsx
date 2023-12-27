import mongoose from "mongoose";

// Define the type for the DB_URI environment variable
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_LOCAL: string;
      DB_URI: string;
    }
  }
}

const dbConnect = async () => {
  try {
    // if (mongoose.connection.readyState >= 1) return;
    mongoose.connect(process.env.DB_LOCAL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
};
export default dbConnect;
