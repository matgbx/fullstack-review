import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      totalRepos: 0
    }

  }
  componentDidMount() {
    this.fetch();
  }

  search(term) {
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
        this.setState({
          repos: data.slice(0,-1),
          totalRepos: data.slice(-1)
        })
      },
      error: (error) => {
        console.log('ERROR - Could not connect to server: ', error);
      }
    });
  }

  fetch() {
    $.ajax({
      type: "GET",
      url: '/repos',
      success: (data)=> {
        console.log('Data recevied');
        this.setState({
          repos: data.slice(0,-1),
          totalRepos: data.slice(-1)
        })
      },
      error: (error) => {
        console.log('ERROR - Could not connect to server: ', error);
      }
    });
  }

  render () {
    return (<div className="appView">
      <h1 className="title">Github Fetcher</h1>
      <h5 className="totalCount">There are {this.state.totalRepos} total repos in the database.</h5>      
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}
                totalRepos={this.state.totalRepos}
      />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));