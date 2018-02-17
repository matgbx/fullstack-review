import React from 'react';

const RepoList = (props) => {
  return (
  <div>
    These are the Top {props.repos.length} repos by size.
    {
      props.repos.map((repo) => {
        return <div>
                  <a href={repo.repo_url}>{repo.username + ' - ' + repo.name}</a>
                </div>
      })
      
    }
    
  </div>
  )
}

export default RepoList;