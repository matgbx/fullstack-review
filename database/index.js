const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
    user_id: Number,
    username: String,
    repo_id: Number,
    repo_url: String,
    watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // callback(typeof data);
  data.forEach(repo => {
    callback(repo.owner.login)
    let aRepo = new Repo({
      user_id: repo.owner.id,
      username: repo.owner.login,
      repo_id: repo.id,
      repo_url: repo.html_url,
      watchers_count: repo.watchers_count
    })

    aRepo.save(function(err) {
    if (err) throw err;      
    console.log('repo successfully saved.');
    })
  })

} 

module.exports.save = save;