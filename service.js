const url = require("url");
const data = require("./data.js");
exports.sampleRequest = function (req, res) {
  const reqUrl = url.parse(req.url, true);
  var limit = 6;
  if (reqUrl.query.limit) {
    limit = reqUrl.query.limit;
  }

  var response = data.slice(0, limit);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
};
