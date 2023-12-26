import express, { Express, request, response } from "express";
import { connectDataBase, connection } from "./dbConfig/connection";
import setModelRelations from "./src/models/relations";
import bodyParser from "body-parser";
import Routes from "./src";
import cron from "node-cron";
import cleanUp from "./src/controllers/croncleanUp";

const app: Express = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(bodyParser.json())

// Cron schedule will delete all data from model every Sunday At 00:00 
cron.schedule("* 3 1 * *)", cleanUp);

app.use("/api/", Routes);

app.listen(3000, async () => {
  console.log("🚀Server started Successfully");
  await connectDataBase();
  await setModelRelations();
  connection.sync().then(() => {
    console.log("✅Synced database successfully...");
  });
});
