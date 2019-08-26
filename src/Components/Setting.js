import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginForm from 'D:/REACT-APP/chatting/src/Components/LoginForm.js';
class Setting extends Component {
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {

    } 
    render() {
       
        return ( 
            <div>
                <Router>
            <Link to="/LoginForm">login</Link>
            <div>
                        <Route path="/LoginForm" render={() => (<LoginForm Check={this.props.Check} onClickSubmit={this.props.onClickSubmit}/>)}/>
            </div>
            </Router>
            </div>
        );
    }
}

export default Setting;