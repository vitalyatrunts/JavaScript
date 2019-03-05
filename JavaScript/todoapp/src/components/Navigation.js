import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import AllTask from "./AllTask";
import CompletedTask from "./CompletedTask";
import ActiveTask from "./ActiveTask";
import Home from "./Home"

const Navigation = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component ={Home}/>
                <Route path="/all" component = {AllTask}/>
                <Route path="/completed" component = {CompletedTask}/>
                <Route path="/active" component = {ActiveTask}/>
            </div>
        </BrowserRouter>
    );
}

export default Navigation;