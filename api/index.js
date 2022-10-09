import rateLimit from "express-rate-limit";
import { MongoDB } from "./utils/mongo";

console.log("Server Initializing...");

// TODO: CORS 적용하기
const cors = require("cors"); //use this
const app = require("express")();
const bodyParser = require("body-parser");

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

const msgLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  delayMs: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  handler(req, res) {
    res.status(this.statusCode).json({
      message: "10분에 3번 요청가능합니다",
    });
  },
});

app.use(notionLimiter);
app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.get("/fetch", async (req, res) => {
  const db = new MongoDB();

  const result = await db.fetch(
    req.query.category,
    parseInt(req.query.pageSize),
    parseInt(req.query.currPage),
    req.query.postId
  );

  res.status(200).json(result);
});

app.get("/posts", async (req, res) => {
  const db = new MongoDB();

  const result = await db.getPosts(
    req.query.category,
    parseInt(req.query.pageSize),
    parseInt(req.query.currPage)
  );

  res.json(result);
});

app.get("/post", async (req, res) => {
  const db = new MongoDB();
  const result = await db.getPost(req.query.id);

  res.json(result);
});

app.get("/categories", async (req, res) => {
  const db = new MongoDB();
  const result = await db.getCategories();

  res.json(result);
});

app.get("/musics", async (req, res) => {
  const db = new MongoDB();
  const result = await db.getMusics();

  res.json(result);
});

app.post("/sendMsg", msgLimiter, async (req, res) => {
  const db = new MongoDB();
  await db.sendMsg(req.body);
  res.status(200).send();
});

app.get("/getMsgs", async (req, res) => {
  const db = new MongoDB();

  const result = await db.getMsgs();
  res.json(result);
});

module.exports = app;
