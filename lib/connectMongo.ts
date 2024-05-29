import mongoose from "mongoose";

// Define the type of global object
declare var global: {
  mongoose?: { conn: any; promise: any };
};

let cached = global?.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached && cached.conn) {
    console.log("Cached mongodb is called!");
    return cached.conn;
  }

  if (!cached) {
    console.error("Cached object is undefined");
    return null; // Handle the case where cached is undefined
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = await mongoose.connect(process.env.MONGO_URI || '');
    console.log("connected to mongoDB!");
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;
