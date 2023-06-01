const express = require("express");
const { default: axios } = require("axios");
const cheerio = require("cheerio");

const app = express();
app.set("trust proxy", true);
app.use(express.static("public"));
app.use("/js", express.static("public"));
app.use("/static", express.static("public"));
app.use("/themes/biquge/js", express.static("public"));
app.use("/themes/biquge/css", express.static("public"));

app.get("/favicon.ico", (req, res) => {
  res.redirect(301, "https://www.xbiquge.tw" + req.path);
});
app.get("/themes/biquge/images/status.gif", (req, res) => {
  res.redirect(301, "https://www.xbiquge.tw" + req.path);
});

app.get("/files/article/image/:bookId/:imgId/:imgName", (req, res) => {
  res.redirect(301, "https://www.xbiquge.tw" + req.path);
});

app.get("*", async (req, res) => {
  const userAgent = req.headers["user-agent"];

  let url = "https://www.xbiquge.tw";
  // 在这里进行判断是手机还是PC的逻辑
  if (isMobile(userAgent)) {
    console.log("请求来源是手机");
    url = "https://m.xbiquge.tw";
  } else {
    console.log("请求来源是PC");
  }

  url = url + req.path;
  const data = await fetch(url);

  //   请求文件类型
  const acceptType = req.headers["accept"];
  if (acceptType.includes("text/html")) {
    const $ = cheerio.load(data);
    $("head")
      .append(`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8017281843233576"
     crossorigin="anonymous"></script>`);
    const html = $.html()
      .replace(/https\:\/\/www\.xbiquge\.tw/g, "http://localhost:8000")
      .replace(/https\:\/\/m\.xbiquge\.tw/g, "http://localhost:8000");
    res.send(html);
  } else {
    res.send(data);
  }
});
app.listen(8080, () => {
  console.log("服务器启动成功!");
});

async function fetch(url) {
  try {   
    let { data } = await axios({
      method: "get",
      url: url,
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Cookie:
          "Hm_lvt_252f9a986eb5a291cc4f56bcecd88721=1681969936,1682070415; Hm_lpvt_252f9a986eb5a291cc4f56bcecd88721=1682070415; Hm_lvt_0d7065c34be8c97f3de4182b7481a4c6=1681969936,1682070415; Hm_lpvt_0d7065c34be8c97f3de4182b7481a4c6=1682070415; jieqiVisitId=article_articleviews%3D630",
        Host: "www.xbiquge.tw",
        Pragma: "no-cache",
        Referer: "https://www.xbiquge.tw/top/allvisit/1.html",
        "sec-ch-ua": `"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"`,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "macOS",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 }",
      },
      responseType: "arraybuffer", // 关键步骤
      responseEncoding: "utf8",
    });
    let utf8decoder = new TextDecoder("GBK"); // 关键步骤
    let html = utf8decoder.decode(data);
    return html;
  } catch (error) {
    throw error;
  }
}

function isMobile(userAgent) {
  const mobileKeywords = [
    "android",
    "iphone",
    "ipod",
    "blackberry",
    "windows phone",
  ];

  for (let keyword of mobileKeywords) {
    if (userAgent.toLowerCase().indexOf(keyword) !== -1) {
      return true;
    }
  }

  return false;
}
