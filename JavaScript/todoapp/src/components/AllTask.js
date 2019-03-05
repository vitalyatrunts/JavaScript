import React from "react";
import {Link} from "react-router-dom";


const AllTask = () => {
    return (
        <nav>
            <Link className = "linked" to="/active"> Active </Link> 
            <Link className = "linked" to="/completed"> Completed </Link>
            <Link className = "linked" to = "/"> Home </Link>
       </nav>
    );
}

export default AllTask;