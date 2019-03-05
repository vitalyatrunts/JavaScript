import React, { Component } from 'react';
import Task from './Task';

class ListTask extends Component{
    constructor(props){
        super(props);

        this.state = {
            tasks: [
            ],
            task: ''
        }
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    deleteTask(i)
    {
        let array = this.state.tasks;
        array.splice(i,1);
        this.setState({tasks: array});
    }

    updateTask(text,i)
    {
        let array = this.state.tasks;
        array[i].title = text;
        this.setState({tasks: array})
    }

    handleAdd()
    {
        const tasks = [...this.state.tasks,{title: this.state.task, id: Date.now()}];
        this.setState({tasks, task: ''});
        
    }

    handleChange(e)
    {
        this.setState({task: e.target.value});

    }

    render(){
        return(
            <div className = 'field'>
                {
                    this.state.tasks.map((task,i) => 
                       <Task key = {task.id} title = {task.title}
                        index = {i} updateTask = {this.updateTask} deleteTask = {this.deleteTask}
                        />)
                }
                    <input type = 'text' placeholder = 'Ваша задача' value = {this.state.task} onChange={this.handleChange}></input>
                 <button onClick = {this.handleAdd} className = 'btn new'>Новое задание</button>
            </div>
        );
    }
}

export default ListTask;