const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
    user_id: Number,
    username: String,
    repo_id: {type: Number, index: {unique: true}},
    repo_url: String,
    watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  data.forEach(repo => {
    let aRepo = new Repo({
      user_id: repo.owner.id,
      username: repo.owner.login,
      repo_id:  repo.id,
      repo_url: repo.html_url,
      watchers_count: repo.watchers_count
    });

    aRepo.save(function(err) {
      if (err) {console.log(err);}      
      console.log('repo successfully saved.');
    });
  });
};


let find = (callback) => {
  Repo.$where('this.watchers_count >= 0').exec((err, docs) => {
    docs.sort((a,b) => a.watchers_count - b.watchers_count)
    callback(docs);
  })
} 

module.exports.save = save;
module.exports.find = find;