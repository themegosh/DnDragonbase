import React, { Component } from "react";
import { Link } from "react-router-dom";

import Compendium from "../../Helpers/Compendium";

import "./Background.List.css";

class BackgroundList extends Component {
    constructor(props) {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <div className="background-list">
                    {Compendium.Backgrounds.map(aBackground => {
                        return (
                            <div>
                                <Link
                                    to={{
                                        pathname: "/Background/" + aBackground.name
                                    }}>
                                    <span>{aBackground.name}</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default BackgroundList;
