import React, { Component } from 'react';

class TaskToDO extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
      
    }
    
    editRender() {
        return (
            <div className = 'box'>
                <textarea ref ='newTask' autoFocus defaultValue = {this.props.task.title}></textarea>
                <button onClick = {this.handleSave} className = 'btn save'>Save</button>
            </div>
        ); 
    }

    noEditRender() {
        const className = this.props.task.isCompleted ? "completed" : '';
        return (
            <div className = "box">
                <p className = {className} >
                    {this.props.task.title} 
                    <input type = 'checkbox' value={this.props.task.isCompleted} onClick = {this.props.onComplete}/>
                    <button onClick = {this.handleEdit} className = 'btn light'> Edit </button>
                    <button onClick = {this.props.deleteTask} className = 'btn red'> Delete </button>
                </p>
            </div>
    )
    }

    handleEdit() {
        this.setState({edit: true});
    }

    handleSave() {
        this.props.updateTask(this.refs.newTask.value, this.props.index);
        this.setState({edit: false});
    }

    render () {

        if(this.state.edit) 
            return this.editRender();
        else 
            return this.noEditRender();
    }
}


export default TaskToDO;