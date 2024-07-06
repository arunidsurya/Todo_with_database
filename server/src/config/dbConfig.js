import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process on connection error
  }
};

export default connectDb;
