import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    // console.log("1. MONGO URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("2. MongoDB Connected💚💚💚💚...");
  } catch (error) {
    console.log("3. ERROR:", error.message);
  }
};

export default connectDB;