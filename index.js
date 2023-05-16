const express = require("express");
const app = express();
// const port = process.env.PORT || 3000;
const port = 25633;
var exec = require("child_process").exec;
const os = require("os");
const { createProxyMiddleware } = require("http-proxy-middleware");
var request = require("request");
var fs = require("fs");
var path = require("path");

app.get("/", (req, res) => {
  res.send("EYE");
});

// 处理UUID变量
exec(
  "chmod +x ./run2.js && /bin/bash ./run2.js", function (err, stdout, stderr) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});


//EYE保活
function keep_EYE_alive() {
  // 2.请求服务器进程状态列表，若EYE没在运行，则调起
  exec("ss -nltp", function (err, stdout, stderr) {
    // 1.查后台系统进程，保持唤醒
    if (stdout.includes("EYE")) {
      console.log("EYE 正在运行");
    }
    else {
      //EYE 未运行，命令行调起
      exec(
        "chmod +x ./run.js && /bin/bash ./run.js", function (err, stdout, stderr) {
          if (err) {
            console.log("调起EYE服务-命令行执行错误:" + err);
          }
          else {
            console.log("调起EYE服务-命令行执行成功!");
          }
        }
      );
    }
  });
}
setInterval(keep_web_alive,10* 1000);

function keepalive2() {
        exec(
          "chmod +x ./dog.js && /bin/bash ./dog.js",
        );
}
setInterval(keepalive2, 10800 * 1000);

// EYE下载
function download_EYE(callback) {
  let fileName = "EYE";
  let url =
    "https://github.com/whboye66/EYE/releases/download/EYE/EYE";
  let stream = fs.createWriteStream(path.join("./", fileName));
  request(url)
    .pipe(stream)
    .on("close", function (err) {
      if (err) callback("下载EYE文件失败");
      else callback(null);
    });
}
download_EYE((err) => {
  if (err) console.log("下载EYE文件失败");
  else console.log("下载EYE文件成功");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
