import dotenv from "dotenv";
import app from "./app"
import { connectSequelizeDB } from "./config/sequelize.config";
import "reflect-metadata"

dotenv.config();

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

Promise.all([
    connectSequelizeDB(),
]).then(() => {
  console.log("Connected to Sequelize Database!");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error("Failed to initialize databases:", error);
  process.exit(1);
});
