let cheerio = require("cheerio");
const superagent = require("superagent");
const { Readability } = require("@mozilla/readability");
const { JSDOM } = require("jsdom");
const URL = require("url");

exports.handler = (req, resp, context) => {
  var params = {
    path: req.path,
    queries: req.queries,
    headers: req.headers,
    method: req.method,
    requestURI: req.url,
    clientIP: req.clientIP,
  };

  console.log("got request: " + JSON.stringify(params));

  try {
    router(req, resp);
  } catch (error) {
    console.log("internal error", error);
    sendJson(resp, { errorMsg: "内部服务器异常" }, 500);
  }
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
    case "/getWebsiteIcon": {
      getWebsiteIcon(req.queries.url, resp);
      break;
    }
    default:
      defaultRouter(resp);
  }
};

const defaultRouter = (resp) => {
  sendJson(resp, { errorMsg: "不支持的路由" }, 400);
};

const getWebsiteIcon = async (url, resp) => {
  if (!url) {
    sendJson(resp, { errorMsg: "url不能为空" }, 400);
  }
  const res = await superagent.get(url);
  const $ = cheerio.load(res.text);
  const host = URL.parse(url).host;

  const getIconURL = (iconHref) => {
    if (iconHref.startsWith("http")) {
      return iconHref;
    }
    if (iconHref.startsWith("//")) {
      return `http:${iconHref}`;
    }
    if (iconHref.startsWith("/")) {
      return `http://${host}${iconHref}`;
    }
    return `http://${host}/${iconHref}`;
  };

  // 自动式
  const getFavicon = async () => {
    try {
      const icon = await superagent.get(host + "/favicon.ico");
      if (icon.status === 200 && icon.type.startsWith("image"))
        return icon.body;
      return null;
    } catch (error) {
      return null;
    }
  };

  // 手动式
  const getLinkIcon = async () => {
    try {
      const iconSrc = $("link[rel='icon']").attr("href");
      if (!iconSrc) return null;
      const icon = await superagent.get(getIconURL(iconSrc));
      if (icon.status === 200 && icon.type.startsWith("image"))
        return icon.body;
      return null;
    } catch (error) {
      return null;
    }
  };

  const getLinkShortCutIcon = async () => {
    try {
      const iconSrc = $("link[rel='shortcut icon']").attr("href");
      if (!iconSrc) return null;
      const icon = await superagent.get(getIconURL(iconSrc));
      if (icon.status === 200 && icon.type.startsWith("image"))
        return icon.body;
      return null;
    } catch (error) {
      return null;
    }
  };

  let resultIcon = null;

  console.log("try getFavicon...");

  resultIcon = await getFavicon();
  if (resultIcon) {
    resp.setHeader("content-type", "image/x-icon");
    resp.send(resultIcon);
    return;
  }

  console.log("try getLinkShortCutIcon...");

  resultIcon = await getLinkShortCutIcon();
  if (resultIcon) {
    resp.setHeader("content-type", "image/x-icon");
    resp.send(resultIcon);
    return;
  }

  console.log("try getLinkIcon...");

  resultIcon = await getLinkIcon();
  if (resultIcon) {
    resp.setHeader("content-type", "image/x-icon");
    resp.send(resultIcon);
    return;
  }

  console.log("fail to load");

  sendJson(resp, { errorMsg: "获取图标失败" });
};

const getWebsiteMeta = (url, resp) => {
  if (!url) {
    sendJson(resp, { errorMsg: "url不能为空" }, 400);
  }
  superagent.get(url).end((err, res) => {
    if (err) {
      sendJson(resp, { errorMsg: err });
    }

    let $ = cheerio.load(res.text);
    const title = $("head > title").text();
    const description = $("head > meta[name='description']").attr("content");
    sendJson(resp, { title, description });
  });
};

const getReadModeContent = (url, resp) => {
  if (!url) {
    sendJson(resp, { errorMsg: "url不能为空" }, 400);
  }
  superagent.get(url).end((err, res) => {
    if (err) {
      resp.send(JSON.stringify({ errorMsg: err }));
    }

    const doc = new JSDOM(res.text, {
      url,
    });
    const reader = new Readability(doc.window.document);

    sendJson(resp, reader.parse());
  });
};

const sendJson = (resp, data, statusCode = 200) => {
  resp.statusCode = statusCode;
  resp.setHeader("content-type", "application/json");
  resp.send(JSON.stringify(data));
};
