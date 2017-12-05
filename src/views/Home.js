import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTasks } from '../ducks/reducer';

class Home extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this.props.getTasks()
    }
    render() {
        console.log(this.props)
        return (
            <div className="Home">
                {
                    this.props.tasks.map(task => {
                        console.log(task)
                        return (
                            <Link to={`/details/${task.id}`} key={task.id} className="task">
                                {task.title}
                                &nbsp;
                                {task.description}
                                &nbsp;
                                completed: {String(task.completed)}
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}

const outActions = {
    getTasks
}

export default connect(mapStateToProps, outActions)(Home)
