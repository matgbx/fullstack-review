const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
    user_id: Number,
    username: String,
    name: String,
    repo_id: {type: Number, index: {unique: true}},
    repo_url: String,
    size: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  let count = 0;
  data.forEach(repo => {
    let aRepo = new Repo({
      user_id: repo.owner.id,
      username: repo.owner.login,
      name: repo.name,
      repo_id:  repo.id,
      repo_url: repo.html_url,
      size: repo.size
    });

    aRepo.save(function(err) {
      if (err) {console.log(err);}
      count++;
      if (count === data.length) {
        callback('done');
      }      
      console.log('repo successfully saved.');

    });
  });
};


let find = (callback) => {
  Repo.$where('this.size >= 0').exec((err, docs) => {
    let topRepos = docs.sort((a,b) => b.size - a.size);
    if (docs.length >= 25) {
      topRepos = topRepos.slice(0, 25);
    }
    callback(topRepos);
  })
} 

module.exports.save = save;
module.exports.find = find;