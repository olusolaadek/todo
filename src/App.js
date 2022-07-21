import React, { Component } from "react";
import { TodoBanner } from "./TodoBanner";
import { TodoCreator } from "./TodoCreator";
import { TodoRow } from "./TodoRow";
import { VisibilityControl } from "./VisibilityControl";
// import logo from './logo.svg';
// import './App.css';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Olusola',
      todoItems: [
        { action: 'Buy flowers', done: false },
        { action: 'Get Shoes', done: false },
        { action: 'Collect Tickets', done: true },
        { action: 'Call Joe', done: false },
      ],
      showCompleted: true
      // newItemText: ''
    }
  }
  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }
  createNewTodo = (task) => {
    if (!this.state.todoItems.find(d => d.action === task)) {
      this.setState({
        todoItems: [...this.state.todoItems,
        { action: task, done: false }],
        // newItemText: ""
      }, () => localStorage.setItem("todos", JSON.stringify(this.state)));
    }
  }
  toggleTodo = (todo) => this.setState({
    todoItems:
      this.state.todoItems.map(item => item.action === todo.action ?
        { ...item, done: !item.done } : item)
  });

  todoTableRows = (doneValue) =>
    this.state.todoItems.filter(item => item.done === doneValue).map(item =>
      <TodoRow key={item.action} item={item} callback={this.toggleTodo}></TodoRow>);
  //  <tr key={item.action} >
  //     <td>{item.action}</td>
  //     <td><input type="checkbox" checked={item.done} onChange={() => this.toggleTodo(item)} /> </td>
  //   </tr>);


  changeStateData = () => {
    this.setState({
      userName: this.state.userName === 'Olusola' ? 'Festus' : 'Olusola'
    })
  }
  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null ? JSON.parse(data) : {
      userName: 'Olusola', todoItems: [
        { action: 'Buy flowers', done: false },
        { action: 'Get Shoes', done: false },
        { action: 'Collect Tickets', done: true },
        { action: 'Call Joe', done: false },
      ],
      showCompleted: true
    });
  }

  render = () => {
    return (
      <div>
        <TodoBanner name={this.state.userName} tasks={this.state.todoItems}></TodoBanner>
        <div className="container-fluid">
          <TodoCreator callback={this.createNewTodo}></TodoCreator>

        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
          </thead>
          <tbody>
            {this.todoTableRows(false)}
          </tbody>
        </table>
        {/* <button className="btn btn-primary m-2" onClick={this.changeStateData}>Change</button> */}
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl description="Completed Tasks" isChecked={this.state.showCompleted}
            callback={(checked) => this.setState({ showCompleted: checked })} />
        </div>
        {this.state.showCompleted &&
          <table className="table table-striped table-bordered">
            <thead>
              <tr><th>Description</th><th>Done</th></tr>
            </thead>
            <tbody>
              {this.todoTableRows(true)}
            </tbody>
          </table>}
        <div>

        </div>
      </div>
    ) // end return
  }
} // end class
