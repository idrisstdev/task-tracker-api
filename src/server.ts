import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config({ path: "src/.env" });
connectDB(process.env.MONGODB_URI!)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
