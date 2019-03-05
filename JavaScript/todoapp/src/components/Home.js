import React from "react";
import {Link} from "react-router-dom";

const Home = () => (
    <nav>
        <Link className = "linked" to = "/all"> All </Link>
        <Link className = "linked" to = "/active"> Active </Link>
        <Link className = "linked" to = "/completed"> Completed </Link>
    </nav>
)

export default Home;