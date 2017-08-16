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

// const UserForm = ({changeGroup}) => {
//   // Input Tracker
//   let input;
//   // Return JSX
//   return (
//     <form onSubmit={(e) => {
//         e.preventDefault();
//         changeGroup(input.value);
//         input.value = '';
//       }}>
//       <input className="" ref={node => {
//         input = node;
//       }} />
//       <br />
//     </form>
//   );
// };

const User = ({users, remove}) => {
  // Each User
  return (
    <tr>
      <td>{users.userFN}</td>
      <td>{users.userLN}</td>
      <td>{users.region}</td>
      <td>{users.city}</td>
      <td><a href="#" className="" onClick={() => {remove(users.id)}}>{users.group}</a></td>
    </tr>
    );
}

const UserList = ({userList, remove}) => {
  // Map through the userList
  const usersNode = userList.map((users) => {
    return (<User users={users} key={users.id} remove={remove}/>)
  });
  return (<table className="">
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
  // Add users handler
  // changeGroup(val){
  //   // Assemble data
  //   const users = {text: val}
  //   // Update data
  //   axios.post(this.apiUrl, users)
  //      .then((res) => {
  //         this.state.data.push(res.data);
  //         this.setState({data: this.state.data});
  //      });
  // }

  // Handle remove
  handleRemove(id){
    // Filter all userList except the one to be removed
    const remainder = this.state.data.filter((users) => {
      if(users.id !== id) return users;
    });
    // Update state with filter
    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});
      })
  }

  render(){
    // Render JSX
    return (
      <div>
        <Title usersCount={this.state.data.length}/>
        <UserList
          userList={this.state.data}
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}
render(<UserApp />, document.getElementById('root'));

export default UserApp;