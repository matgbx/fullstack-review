import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // send post request to server
    $.ajax({
      type: "POST",
      url: '/repos',
      data: JSON.stringify({name: term}),
      contentType: 'application/json',
      success: (data)=> {
        console.log('Successfully connected to server!!');
        console.log(data);
      },
      error: (error) => {
        console.log('ERROR - Could not connect to server: ', error);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));