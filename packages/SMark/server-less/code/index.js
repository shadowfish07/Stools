/*
To enable the initializer feature (https://help.aliyun.com/document_detail/156876.html)
please implement the initializer function as below：
exports.initializer = (context, callback) => {
  console.log('initializing');
  callback(null, '');
};
*/
let cheerio = require("cheerio");
const superagent = require("superagent");
const { Readability } = require("@mozilla/readability");
const { JSDOM } = require("jsdom");

exports.handler = (req, resp, context) => {
  var params = {
    path: req.path,
    queries: req.queries,
    headers: req.headers,
    method: req.method,
    requestURI: req.url,
    clientIP: req.clientIP,
  };

  router(req, resp);
};

const router = (req, resp) => {
  switch (req.path) {
    case "/getWebsiteMeta": {
      getWebsiteMeta(req.queries.url, resp);
      break;
    }
    case "/readModeContent": {
      getReadModeContent(req.queries.url, resp);
      break;
    }
    default:
      defaultRouter(resp);
  }
};

const defaultRouter = (resp) => {
  resp.send(JSON.stringify({ errorMsg: "不支持的路由" }));
};

const getWebsiteMeta = (url, resp) => {
  if (!url) {
    resp.send(JSON.stringify({ errorMsg: "url不能为空" }));
  }
  superagent.get(url).end((err, res) => {
    if (err) {
      resp.send(JSON.stringify({ errorMsg: err }));
    }

    let $ = cheerio.load(res.text);
    const title = $("head > title").text();
    resp.send(JSON.stringify({ title }));
  });
};

const getReadModeContent = (url, resp) => {
  if (!url) {
    resp.send(JSON.stringify({ errorMsg: "url不能为空" }));
  }
  superagent.get(url).end((err, res) => {
    if (err) {
      resp.send(JSON.stringify({ errorMsg: err }));
    }

    let $ = cheerio.load(res.text);
    const title = $("head > title").text();

    const doc = new JSDOM(res.text, {
      url,
    });
    const reader = new Readability(doc.window.document);

    resp.send(JSON.stringify({ data: reader.parse() }));
  });
};
