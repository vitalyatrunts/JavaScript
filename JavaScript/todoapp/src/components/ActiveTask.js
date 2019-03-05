import React from "react";
import {Link} from "react-router-dom";

const ActiveTask = () => {
    return (
       <nav>
           <Link className = "linked" to="/all"> All </Link>
           <Link className = "linked" to="/completed"> Completed </Link>
           <Link className = "linked" to = "/"> Home </Link>
       </nav>
    );
}

export default ActiveTask;