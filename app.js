const express = require("express");
const path = require("path"); // react build 파일에 접근하기 위해 필요함
const port = process.env.PORT || 5000;
const db = require("./config/db.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const axios = require("axios");
const cheerio = require("cheerio");





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

app.get("/nael/api/main_tap_data", (req, res) => {
  db.query("SELECT * FROM tomo.TB_SUPPORT_BUSINESS;", (err, data) => {
    if (!err) res.send({ data });
    else res.send(err);
  });
});

app.get("/nael/api/news_data", async (req, res) => {
  db.query("SELECT * FROM tomo.TB_NEWS;", async (err, data) => {
    if (!err) {
      res.send({ data });
    } else res.send(err);
  });
});

app.get("/nael/api/stage_data", (req, res) => {
  db.query("SELECT * FROM tomo.TB_STAGE;", (err, data) => {
    if (!err) res.send({ data });
    else res.send(err);
  });
});

app.get("/nael/api/image", (req, res) => {
  db.query("SELECT * FROM tomo.TB_FILE;", (err, data) => {
    if (!err) res.send({ data });
    else res.send(err);
  });
});

app.get("/nael/api/member", (req, res) => {
  db.query("SELECT * FROM tomo.TB_MEMBER;", (err, data) => {
    if (!err) res.send({ data });
    else res.send(err);
  });
});
app.post("/nael/api/main_tap_data2", (req, res) => {
  console.log("전달")

  for (let i = 0; i < req.body.length; i++) {
    connection.query(
      "INSERT INTO TB_SUPPORT_BUSINESS (idx, title, content, status, gubun, area, work, sup_type, sup_pay, sup_condition, start_day, end_day, time, all_day_yn, homepage, recommend, tag, reg_id, reg_date, udp_date, use_yn, view_cnt, udp_id, att_cnt ) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.body[i].idx,
        req.body[i].title,
        req.body[i].content,
        req.body[i].status,
        req.body[i].gubun,
        req.body[i].area,
        req.body[i].work,
        req.body[i].sup_type,
        req.body[i].sup_pay,
        req.body[i].sup_condition,
        req.body[i].start_day,
        req.body[i].end_day,
        req.body[i].time,
        req.body[i].all_day_yn,
        req.body[i].homepage,
        req.body[i].recommend,
        req.body[i].tag,
        req.body[i].reg_id,
        req.body[i].reg_date,
        req.body[i].udp_date,
        req.body[i].use_yn,
        req.body[i].view_cnt,
        req.body[i].udp_id,
        req.body[i].att_cnt
      ]
    )
  }
});
app.post("/nael/api/member", (req, res) => {
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
