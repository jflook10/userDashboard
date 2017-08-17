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
      <div>
        <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
      </div>

    );
  }
}

const User = ({users}) => {
  // Each User
  return (
    <tr>
      <td>{users.userFN}</td>
      <td>{users.userLN}</td>
      <td>{users.region}</td>
      <td>{users.city}</td>
      <td><a href="#" className="">{users.group}</a></td>
    </tr>
    );
}

// const UserList = ({userList, filterText}) => {
//   var filterText = this.props.filterText;
//   // Map through the userList
//   const usersNode = userList.map((users) => {
//     if (usersNode.userFN.indexOf(filterText) === -1) {
//       return;
//     }
//     return (<User users={users} key={users.id}/>)
//   });
//   return (<table className="">
//             <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Region</th>
//               <th>City</th>
//               <th>Group</th>
//             </tr>
//             </thead>
//             <tbody>
//             {usersNode}
//             </tbody>
//           </table>);
// }


class UserList extends React.Component {
  render(){
    var filterText = this.props.filterText;
    var userList = this.props.userList;
    // Map through the userList
    const usersNode = userList.map((users) => {
      if (users.userLN.indexOf(filterText) === -1) {
        return;
      }
      return (<User users={users} key={users.id}/>)
    });
    return (
      <table className="">
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Region</th>
          <th>City</th>
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

  render(){
    // Render JSX
    return (
      <div>
        <Title usersCount={this.state.data.length}/>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
        <UserList userList={this.state.data} filterText={this.state.filterText} />
      </div>
    );
  }
}
render(<UserApp />, document.getElementById('root'));

export default UserApp;