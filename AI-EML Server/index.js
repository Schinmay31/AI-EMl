import express from "express";
import { getEmail } from "./controller/index.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin === "https://mail.google.com") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.post("/getEmail", getEmail);

app.listen(3032, () => {
  console.log("server is running...");
});
