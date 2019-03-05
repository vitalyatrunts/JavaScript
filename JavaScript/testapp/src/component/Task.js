import React, { Component } from 'react';


class Task extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            edit: false
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    render(){
       if(this.state.edit)
       {
           return this.editRender();
       }
       else {
           return this.noEditRender();
       }
    }

    noEditRender()
    {
        return(
            <div className = 'box'>
                <div className = 'text'>{this.props.title}</div>
                <button onClick = {this.handleEdit} className = 'btn light'>Редактировать</button>
                <button onClick = {this.handleDelete} className = 'btn red'>Удалить</button>
            </div>
        ); 
    }

    editRender()
    {
        return(
            <div className = 'box'>
                <textarea ref ='newTask' defaultValue = {this.props.title}></textarea>
                <button onClick = {this.handleSave} className = 'btn save'>Сохранить</button>
            </div>
        ); 
    }

    handleEdit()
    {
        this.setState({edit: true});
    }

    handleSave()
    {
   
        this.props.updateTask(this.refs.newTask.value, this.props.index);
        this.setState({edit: false});
    }

    handleDelete()
    {
        this.props.deleteTask(this.props.index)
    }
}


export default Task;