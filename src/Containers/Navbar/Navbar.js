import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

class Navbar extends Component {
    constructor(props) {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="nav">
                <div className="nav-buttons">
                    <div className="nav-button">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="nav-button">
                        <Link to="/Classes">Classes</Link>
                    </div>
                    <div className="nav-button">
                        <Link to="/Backgrounds">Backgrounds</Link>
                    </div>
                    <div className="nav-button">
                        <Link to="/Races">Races</Link>
                    </div>
                    <div className="nav-button">
                        <Link to="/setup">Setup</Link>
                    </div>
                    <hr />
                </div>
            </div>
        );
    }
}

export default Navbar;
