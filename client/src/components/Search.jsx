import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    console.log(e.target.value);
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div className="searchBox">
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={(e) => this.onChange(e)}/>       
      <button onClick={() => this.search()}> Add Repos </button>
    </div>) 
  }
}

export default Search;