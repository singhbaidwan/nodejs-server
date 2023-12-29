const url = require("url");

exports.sampleRequest = function (req, res1) {
  const reqUrl = url.parse(req.url, true);
  var limit = 6;
  if (reqUrl.query.limit) {
    limit = reqUrl.query.limit;
  }
  const turl = "https://time.com";
  fetch(turl)
    .then((response) => response.text())
    .then((data) => {
      var response = [];
      var textData = [],
        linkdata = [];
      var match1;
      const regex1 =
        /<h3\s+class="featured-voices__list-item-headline display-block">(.*?)<\/h3>/g;
      const regex2 =
        /<liclass="featured-voices__list-item"\s*>.*?<a+.*?href="(.*?)".*?>.*?<\/a>.*?<\/li>/g;
      while ((match1 = regex1.exec(data)) !== null) {
        var textContent = match1[1];
        textData.push(textContent);
      }
      var matches = data.replace(/\s/g, "").match(regex2);
      if (matches) {
        var hrefs = matches.map(function (match) {
          return match.replace(regex2, "$1");
        });
        linkdata = hrefs;
      }
      for (let i = 0; i < textData.length; i++) {
        response.push({ title: textData[i], link: linkdata[i] });
      }

      res1.statusCode = 200;
      res1.setHeader("Content-Type", "application/json");
      res1.end(JSON.stringify(response.slice(0, limit)));
    })
    .catch((error) => {
      res1.setHeader("Content-Type", "application/json");
      if (error.response) {
        res1.statusCode = error.response.status;
      } else {
        res1.statusCode = 400;
      }
      res1.end(JSON.stringify(error));
    });
};
