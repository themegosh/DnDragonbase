import React, { Component } from "react";
import { Link } from "react-router-dom";

import Compendium from "../../Helpers/Compendium";

import './Race.List.css';

class RaceList extends Component {
    constructor(props) {
        super();
        this.state = {
        };
    }

    render() {

        return (
            <div className="container">
                <div className="race-list">
                    {Compendium.Races.map((aRace, key) => {
                        return (
                            <div key={key}>
                                <Link
                                    to={{
                                        pathname: "/Race/" + aRace.name
                                    }}>
                                    <span>{aRace.name}</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default RaceList;
