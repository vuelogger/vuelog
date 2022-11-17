import rateLimit from "express-rate-limit";
import { MongoDB } from "./utils/mongo";
import Twitter from "./utils/twitter";

console.log("Server Initializing...");

const app = require("express")();
// const bodyParser = require("body-parser");

const notionLimiter = rateLimit({
  windowMs: 3 * 1000, // 3초 기다림
  max: 8, // 8번까지만
  delayMs: 500, // 0.5초에 한번 요청
  standardHeaders: true,
  legacyHeaders: false,
  handler(req, res) {
    res.status(this.statusCode).json({
      message: "1분에 15번 0.5초씩 요청가능",
    });
  },
});

app.use(notionLimiter);
// // parse application/json
// app.use(bodyParser.json());

const db = new MongoDB();

app.get("/post", async (req, res) => {
  const db = new MongoDB();
  const result = await db.getPost(req.query.slug);

  res.json(result);
});

app.get("/categories", async (req, res) => {
  const result = await db.getCategories();
  res.json(result);
});

app.get("/posts", async (req, res) => {
  const db = new MongoDB();

  const result = await db.getPosts(
    req.query.category,
    parseInt(req.query.pageSize),
    parseInt(req.query.page)
  );

  res.json(result);
});

app.get("/diary", async (req, res) => {
  const db = new MongoDB();

  const result = await db.getDiary(
    parseInt(req.query.pageSize),
    parseInt(req.query.page)
  );

  res.json(result);
});

app.get("/musics", async (req, res) => {
  const db = new MongoDB();
  const result = await db.getMusics();

  res.json(result);
});

app.get("/tweet/user", async (req, res) => {
  res.json(await Twitter.getUserData());
});

module.exports = app;
