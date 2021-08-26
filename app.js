const express = require("express");
const path = require("path"); // react build 파일에 접근하기 위해 필요함
const port = process.env.PORT || 5000;
const db = require("./config/db.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const axios = require("axios");
const cheerio = require("cheerio");





  console.log(dataList);
  return dataList;
}
// express 객체 생성
const app = express();
const connection = mysql.createConnection({
  host: "54.180.80.224",
  port: "3306",
  user: "datahive",
  password: "mobile1!",
  database: "tomo",
});

connection.connect();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/api/main_tap_data", (req, res) => {
  db.query("SELECT * FROM tomo.TB_SUPPORT_BUSINESS;", (err, data) => {
    if (!err) res.send({ data });
    else res.send(err);
  });
});

app.get("/api/news_data", async (req, res) => {
  db.query("SELECT * FROM tomo.TB_NEWS;", async (err, data) => {
    if (!err) {
      res.send({ data });
    } else res.send(err);
  });
});

app.get("/api/stage_data", (req, res) => {
  db.query("SELECT * FROM tomo.TB_STAGE;", (err, data) => {
    if (!err) res.send({ data });
    else res.send(err);
  });
});

app.get("/api/image", (req, res) => {
  db.query("SELECT * FROM tomo.TB_FILE;", (err, data) => {
    if (!err) res.send({ data });
    else res.send(err);
  });
});

app.get("/api/member", (req, res) => {
  db.query("SELECT * FROM tomo.TB_MEMBER;", (err, data) => {
    if (!err) res.send({ data });
    else res.send(err);
  });
});

app.post("/api/member", (req, res) => {
  const user_id = req.body;
  const sql = `INSERT INTO TB_MEMBER VALUES (?)`;
  const textbox = {
    email: req.body.email,
    pwd: req.body.pwd,
    phone_no: req.body.phone_no,
    name: req.body.name,
    company_name: req.body.company_name,
    position: req.body.position,
    ceo_name: req.body.ceo_name,
    ceo_birth: req.body.ceo_birth,
    ceo_gender: req.body.ceo_gender,
    business_type: req.body.business_type,
    business_no: req.body.business_no,
    business_area: req.body.business_area,
    interested_area: req.body.interested_area,
    main_work: req.body.main_work,
    int_work1: req.body.int_work1,
    int_work2: req.body.int_work2,
    birthday: req.body.birthday,
    company_birth: req.body.company_birth,
    att_work: req.body.att_work,
    reg_date: req.body.reg_date,
    udp_date: req.body.udp_date,
    auth: req.body.auth,
    use_yn: req.body.use_yn,
    idx: req.body.idx,
    push_yn: req.body.push_yn,
    email_yn: req.body.email_yn,
    udp_id: req.body.udp_id,
  };
  connection.query(
    "INSERT INTO TB_MEMBER (email, pwd, phone_no, name, company_name, position, ceo_name, ceo_birth, ceo_gender, business_type, business_no, business_area, interested_area, main_work, int_work1, int_work2, birthday, company_birth, att_work, reg_date, udp_date, auth, use_yn, idx, push_yn, email_yn, udp_id ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.email,
      req.body.pwd,
      req.body.phone_no,
      req.body.name,
      req.body.company_name,
      req.body.position,
      req.body.ceo_name,
      req.body.ceo_birth,
      req.body.ceo_gender,
      req.body.business_type,
      req.body.business_no,
      req.body.business_area,
      req.body.interested_area,
      req.body.main_work,
      req.body.int_work1,
      req.body.int_work2,
      req.body.birthday,
      req.body.company_birth,
      req.body.att_work,
      req.body.reg_date,
      req.body.udp_date,
      req.body.auth,
      req.body.use_yn,
      req.body.idx,
      req.body.push_yn,
      req.body.email_yn,
      req.body.udp_id,
    ]
  ),
    function (err, rows, fields) {
      if (err) {
        console.log("DB저장 실패", err);
      } else {
        console.log("DB저장 성공");
      }
    };
});

app.listen(port, function () {
  console.log("server works on port :" + `http://localhost:${port}`);
});
