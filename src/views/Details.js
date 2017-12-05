import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDetails, handleChange, submit, complete, deleteTask } from '../ducks/reducer';

class Details extends Component {
    constructor() {
        super()
    }
    componentDidMount = () => {
        if (!this.props.details.id) {
            this.props.getDetails(this.props.match.params.id)
        }
    }
    render() {
        let task = this.props.details
        
        console.log(task.completed)
        return (
            <div className="Details">
                <button onClick={() => this.props.history.push(`/home`)} >BACK</button>
                Title: {task.title}
                <input value={task.title} onChange={e => this.props.handleChange('title', e.target.value)} />
                &nbsp;
                Description: {task.description}
                <input value={task.description} onChange={e => this.props.handleChange('description', e.target.value)} />
                &nbsp;
                Completed: {String(task.completed)}
                {<input type='checkbox' value={task.completed} onChange={e => this.props.handleChange('completed', !task.completed)} />}
                <button onClick={() => this.props.submit(task).then(() => this.props.history.push(`/home`))} >SAVE</button>
                <button onClick={this.componentDidMount} >CANCEL</button>
                <button onClick={() => this.props.deleteTask(task).then(() => this.props.history.push(`/home`))} >DELETE</button>
                <button onClick={() => {this.props.complete(task); this.props.history.push(`/home`)}} >COMPLETE</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        details: state.details
    }
}

const outActions = {
    getDetails,
    handleChange,
    submit,
    deleteTask,
    complete
}

export default connect(mapStateToProps, outActions)(Details)
