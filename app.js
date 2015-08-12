"use strict";

var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    route   = express.Router(),
    app     = express(),
    port    = process.env.PORT || 3002;

route.get('/scraper', function (req, res) {
    request("http://www.echojs.com/", function (err, resp, body) {
        if (!err && resp.statusCode === 200) {
            var $        = cheerio.load(body),
                pageURLs = [];

            $('article h2 a').map(function (i, links) {
                var articleText = $(links).text(),
                    articleLink = $(links).attr('href');

                pageURLs.push({
                    link: articleLink,
                    desc: articleText
                });
            });

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(pageURLs));
        }
    });
});

app.use('/', route);

app.listen(port);

console.log('Your server goes on localhost:' + port);
