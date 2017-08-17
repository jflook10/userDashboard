// import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

console.clear();

const Title = ({usersCount}) => {
  return (
    <div>
        <header className="App-header">
          <h1>Virtual Users Dashboard</h1>
        </header>
       <div>
          <h2>Total Users ({usersCount})</h2>
       </div>
    </div>
  );
}

class SearchBar extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
    //console.log(this.refs.filterTextInput.value);
  }
  render() {
    return (
      <div className="search-bar">
        <input type="text" placeholder="Search by last name..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
      </div>

    );
  }
}

//<input value={users.region}></input>

class EditableCell extends React.Component {
  render() {
    return (
      <td>
        <input type="text" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );
  }
}

class NormCell extends React.Component {
  render() {
    return (
      <td>{this.props.cellData.value}</td>
    );
  }
}

class User extends React.Component{
  render(){
  // Each User
  return (
    <tr>
      <NormCell cellData={{
          value: this.props.users.userFN
        }}/>
      <NormCell cellData={{
          value: this.props.users.userLN
        }}/>
      <NormCell cellData={{
          value: this.props.users.city
        }}/>
      <NormCell cellData={{
          value: this.props.users.region
        }}/>
      <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
        type: "group",
        value: this.props.users.group,
        id: this.props.users.id
      }}/>
    </tr>
    );
  }
}

class UserList extends React.Component {
  render(){
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var filterText = this.props.filterText;
    var userList = this.props.userList;
    // Map through the userList
    const usersNode = userList.map((users) => {
      if (users.userLN.indexOf(filterText) === -1) {
        return;
      }
      return (<User onProductTableUpdate={onProductTableUpdate} users={users} key={users.id}/>)
    });
    return (
      <table className="">
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Region</th>
          <th>Group</th>
        </tr>
        </thead>
        <tbody>
        {usersNode}
        </tbody>
      </table>);  
  }
}


// Contaner Component
// User Id
window.id = 0;
class UserApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
    this.state.filterText = "";
    this.apiUrl = 'https://59947c5fd297ba0011da1b34.mockapi.io/api/toDo/users'
  }
  // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({data:res.data});
      });
  }
  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };

  handleProductTable(evt) {
  var item = {
    id: evt.target.id,
    name: evt.target.name,
    value: evt.target.value
    };
    var users = this.state.data.slice();
    var newUsers = users.map(function(users) {

      for (var key in users) {
        if (key == item.name && users.id == item.id) {
          users[key] = item.value;

        }
      }
      return users;
    });
      this.setState({users:newUsers});
      console.log(this.state.products);
  };

  render(){
    // Render JSX
    return (
      <div>
        <Title usersCount={this.state.data.length}/>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
        <UserList onProductTableUpdate={this.handleProductTable.bind(this)} userList={this.state.data} filterText={this.state.filterText} />
      </div>
    );
  }
}
render(<UserApp />, document.getElementById('root'));

export default UserApp;