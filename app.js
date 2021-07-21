const express = require("express");
const path = require("path"); // react build 파일에 접근하기 위해 필요함
const port = process.env.PORT || 5000;
const db = require("./config/db.js");

// express 객체 생성
const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

// app.use("/", function (req, res, next) {
//   res.sendFile(path.join(__dirname + "/client/build", "index.html"));
// });

app.get("/api/main_tap", (req, res) => {
  db.query("SELECT * FROM tomo.TB_SUPPORT_BUSINESS;", (err, data) => {
    if (!err) res.send({ data });
    else res.send(err);
  });
});

app.get("/api/news", (req, res) => {
  db.query("SELECT * FROM tomo.TB_NEWS;", (err, data) => {
    if (!err) res.send({ data });
    else res.send(err);
  });
});

app.listen(port, function () {
  console.log("server works on port :" + `http://localhost:${port}`);
});