import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Alert, Label } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import BootstrapTable from 'react-bootstrap-table-next';

const {
  isInstagramHandle,
} = require('../../helpers/validateHandle.js')

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      value: null,
      errorMessage: null,
      showInsights: false,

      name: null,
      description: null,
      followerCount: null,
      followingCount: null,
      posts: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createHeadingLevelTable = this.createHeadingLevelTable.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();    
    console.log(`A handle was submitted: ${this.state.value}`);
    if (!isInstagramHandle(this.state.value)) {
      this.setState({
        showError: true,
        errorMessage: 'Seems like your URL is in invalid format',
      })
    } else {
      this.setState({
        showError: false,
        errorMessage: null,
        showInsights: false
      })
      this.state.value = 'https://www.instagram.com/' + this.state.value + '/'
      this.setState({ 
        showError: true,
        errorMessage: 'Fetching',
        showInsights: false
      })
      fetch(`http://localhost:8000/fetch-html?pageURL=${this.state.value}`, {
        method: 'GET',
        headers: {
          "Content-Type": "text/plain",
          'Access-Control-Allow-Origin': 'http://localhost:8000',
          'Access-Control-Allow-Credentials': 'true'
        },
      })
        .then((data) => data.json())
        .then((response) => {
          if (response.code !== 200) {
            this.setState({ 
              showError: true,
              errorMessage: response.message += response.code ? ` Code: ${response.code} ` : null,
              showInsights: false
            })
          } else {
            console.log(response);
            this.setState({
              showInsights: true,
              showError: false,
              description: response.data.description,
              name: response.data.name,
              followerCount: response.data.followerCount,
              followingCount: response.data.followingCount,
              posts: response.data.posts,
            })
          }
          
        })
        .catch((err) => {
          console.error(err)
          this.setState({ 
            showError: true,
            errorMessage: err.message,
            showInsights: false
          })
        })
    }
  }

  createHeadingLevelTable () {
    let table = []
    for (let i = 0; i < this.state.headingsLevels.length; i++) {
      const row = this.state.headingsLevels[i];
      table.push(<tr><td>{row.level}</td><td>{row.count}</td></tr>)
    }
    return table
  }  

  render() {
    const columns = [{
      dataField: 'id',
      text: 'Post ID',
      sort: true
    }, {
      dataField: 'caption',
      text: 'Post Caption',
      sort: true
    }, {
      dataField: 'img_url',
      text: 'Post Link',
      sort: true
    }];

    return (
      <form className='web-analyzer'>
        <FormGroup controlId="formBasicText">
          <FormControl
            type="text"
            value={this.state.value}
            placeholder='Enter your Web URL'
            onChange={this.handleChange}
            require={true}
          />
          <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>
        { this.state.showError && (
          <Alert bsStyle="warning">
            {this.state.errorMessage}
          </Alert>
        )}
        { this.state.showInsights && (
          <div>
            Name <Label>{this.state.name}</Label><br/>
            Description <Label>{this.state.description}</Label><br/>
            Follower Count <Label>{this.state.followerCount}</Label><br/>
            Following Count <Label>{this.state.followingCount}</Label><br/>
              <BootstrapTable keyField='id' columns={ columns } data={ this.state.posts } />
            <br/>
          </div>
        )}
      </form>
    )
  }
}

export default Home;
