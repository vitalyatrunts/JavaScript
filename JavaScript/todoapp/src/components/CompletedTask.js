import React from "react";
import {Link} from "react-router-dom";

const CompletedTask = () => {
    return (
       <nav>
           <Link className = "linked" to="/all"> All </Link>
           <Link className = "linked" to="/active"> Active </Link>
           <Link className = "linked" to = "/"> Home </Link>
       </nav>
    );
}
export default CompletedTask;