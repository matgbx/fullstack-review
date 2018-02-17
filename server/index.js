const express = require('express');
const parser = require('body-parser');
const ghHelper = require('../helpers/github.js');
const mongoHelper = require('../database/index.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());

app.post('/repos', function (req, res) {
  ghHelper.getReposByUsername(req.body.name, (error, response, body) => {
    mongoHelper.save(JSON.parse(body), (saveResp) => {
      if (saveResp) {
        mongoHelper.find((data) => {
          res.send(data);
        })
      }
    });  
  });
});

app.get('/repos', function (req, res) {
  mongoHelper.find((data) => {
    res.send(data);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

