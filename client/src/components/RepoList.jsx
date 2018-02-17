import React from 'react';

const RepoList = (props) => {
  return (
  <div>
    <div className="top25title">
      Here are the Top 25 repos by size:
    </div>
    <div className="top25box">
      <div className="top25list">
      {
        props.repos.map((repo) => {
          return <div>
                    <a href={repo.repo_url}>{repo.username + ' - ' + repo.name}</a>
                  </div>
        }) 
      }
      </div>
    </div>
    
  </div>
  )
}

export default RepoList;