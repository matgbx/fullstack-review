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
          repos: data
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
      contentType: 'application/json',
      success: (data)=> {
        console.log('Data recevied');
        this.setState({
          repos: data
        })
      },
      error: (error) => {
        console.log('ERROR - Could not connect to server: ', error);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>      
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));