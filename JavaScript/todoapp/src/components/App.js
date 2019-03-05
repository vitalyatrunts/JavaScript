import React, { Component } from 'react';
import TaskToDo from './TaskToDo';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : [
            
            ],
            filter: 'all'
        }
       
        this.onSubmit = this.onSubmit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
    }

  componentWillMount() {
      window.localStorage.getItem('tasks') && this.setState(
          {
              tasks: JSON.parse(window.localStorage.getItem('tasks'))
              
          }
      )
    }
    componentWillUpdate(nextProps, nextState) {
        window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks));
        
    }

    deleteTask(index) {
        const array = [...this.state.tasks.slice(0,index),...this.state.tasks.slice(index+1)];
        this.setState({tasks: array});
    }

    updateTask(text, index) {
        const task = this.state.tasks[index];
        const array = [
                        ...this.state.tasks.slice(0,index),
                        {
                            ...task, title: text
                        },
                        ...this.state.tasks.slice(index + 1)
                    ];
        this.setState({tasks: array})
        
    }

    onSubmit(e)
    {
        if( this._inputElement !== "")
        {
            var newTask = {
                title: this._inputElement.value,
                id: Date.now(),
                isCompleted: false
            };
        
        this.setState((pervState) => {
            return {
                tasks: pervState.tasks.concat(newTask)
            };
        })
        e.preventDefault();
        this._inputElement.value = '';
        
        }
    }

   handleFilter(filter) {
       this.setState({filter});
   }

   handleComplete(index) {
        const task = this.state.tasks[index];
       
        const newTasks = [
            ...this.state.tasks.slice(0,index),
            {
                ...task, isCompleted: !task.isCompleted
            }
            ,...this.state.tasks.slice(index+1)
        ]
        this.setState({tasks: newTasks});
   }

   render() {
        const validTasks = this.state.filter === 'completed' ? this.state.tasks.filter(task =>
            task.isCompleted) : this.state.filter === 'active' ? this.state.tasks.filter(task =>
            !task.isCompleted) : this.state.tasks;
            console.log(this.props);
        return (  
            <div className = 'field'>
                <h2> List of tasks </h2>
                <ul>{
                        validTasks.map((task,i) => 
                        <li key={task.id}>
                            <TaskToDo task={task} 
                            index = {i}
                            deleteTask = {() => this.deleteTask(i)}
                            updateTask = {this.updateTask}
                            onComplete={() => this.handleComplete(i)}/>
                        </li>)
                    }
                </ul>
                <form onSubmit = {this.onSubmit}>
                    <input type = 'text' placeholder = 'Your task' ref={(a) => this._inputElement = a}/>
                    <button type = 'submit' className = 'btn new'>Add</button>
                </form>
               <div>
                   <button onClick = {() => this.handleFilter("all")} >All</button>
                   <button onClick = {() => this.handleFilter("active")}>Active</button>
                   <button onClick = {() => this.handleFilter("completed")}>Completed</button>
               </div>
              
            </div>
        );
    }
    
}

export default App;