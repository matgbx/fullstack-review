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
      res.send(saveResp);
    });  
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  mongoHelper.find((data) => {
    console.log(typeof data);
    res.send(data);
  });
  // console.log(req.method);
  // res.send(JSON.stringify([{goat: 'animal'}]));
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

