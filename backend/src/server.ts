import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import { dbConnect } from "./config/database";
// connect to database
dbConnect();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
