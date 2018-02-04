import React, { Component } from "react";
import { Link } from "react-router-dom";

import Compendium from "../../Helpers/Compendium";

import "./Class.List.css";

class ClassList extends Component {
    constructor(props) {
        super();
        this.state = {
            theClass: {}
        };
    }

    render() {
        return (
            <div className="container">
                <div className="class-list">
                    {Compendium.Classes.map((aClass, key) => {
                        return (
                            <div key={key}>
                                <Link
                                    to={{
                                        pathname: "/Class/" + aClass.name
                                    }}>
                                    <span>{aClass.name}</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default ClassList;
