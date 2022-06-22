import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import express from "express";
import DBInit from "./database";
import router from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use("/storage", express.static(__dirname + "/storage"));

DBInit();
app.use(express.json({ limit: "10mb" }));
app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
