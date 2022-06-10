import mongoose from "mongoose";

function DBInit() {
  mongoose.connect(process.env.DB_URL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error : "));
  db.once("open", () => {
    console.log("DB Connected");
  });
}

export default DBInit;
