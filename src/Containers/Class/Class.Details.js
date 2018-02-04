import React, { Component } from "react";
import PrettyObj from "../../Components/PrettyObj";
import Compendium from "../../Helpers/Compendium";
import ThingText from "../../Components/ThingText";
import OrdinalSuffix from "../../Components/OrdinalSuffix";

import "./Class.Details.css";

class ClassDetails extends Component {
    constructor(props) {
        super();
        this.state = {
            theClass: {}
        };
    }

    getClass(name) {
        Compendium.Classes.forEach(aClass => {
            if (aClass.name === name) {
                console.log(aClass);
                this.setState({ theClass: aClass });
            }
        });
    }

    componentWillMount() {
        this.getClass(this.props.match.params.name);
    }

    componentWillReceiveProps(props) {
        this.getClass(props.match.params.name);
    }

    getClassChart() {
        var rows = [];
        var maxClassLvl = Object.keys(this.state.theClass.levels).length;
        for (let lvlIndex = 1; lvlIndex <= maxClassLvl; lvlIndex++) {
            if (this.state.theClass.levels[lvlIndex]){
                var primaryFeatures = this.state.theClass.levels[lvlIndex].features.map(aFeature => {
                    if (aFeature.optional === true) return null;
                    else return aFeature;
                });
                var features = primaryFeatures.map((aFeature, key) => {
                    if (aFeature === null) return null;
                    if (aFeature.optional === true) return null;
                    else {
                        var comma = key < primaryFeatures.length - 1 ? ", " : "";
                        return (
                            <span>
                                {aFeature.name}
                                {comma}
                            </span>
                        );
                    }
                });
    
                var slots = [];
                if (this.state.theClass.levels[maxClassLvl] && this.state.theClass.levels[maxClassLvl].slots){
                    for (var slotIndex = 1; slotIndex <= this.state.theClass.levels[maxClassLvl].slots.length; slotIndex++) {
                        if (this.state.theClass.levels[lvlIndex].slots && this.state.theClass.levels[lvlIndex].slots[slotIndex]) {
                            slots.push(<td key={slotIndex}>{this.state.theClass.levels[lvlIndex].slots[slotIndex]}</td>);
                        } else {
                            slots.push(<td key={slotIndex}>-</td>);
                        }
                    }
                }
                rows.push(
                    <tr key={lvlIndex}>
                        <td>
                            <OrdinalSuffix num={lvlIndex} />
                        </td>
                        <td>{features}</td>
                        {slots}
                    </tr>
                );
            }
            
        }
        var slotHeaders = [];
        if (this.state.theClass.levels[maxClassLvl] && this.state.theClass.levels[maxClassLvl].slots){
            for (var index = 1; index <= this.state.theClass.levels[maxClassLvl].slots.length; index++) {
                slotHeaders.push(
                    <th>
                        <OrdinalSuffix num={index} />
                    </th>
                );
            }
        }

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Features</th>
                        {slotHeaders}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    render() {
        return (
            <div className=" container">
                <div className="class-details">
                    <h1>{this.state.theClass.name}</h1>
                    {this.getClassChart()}
                    <hr />
                    <div>
                        <h2>{this.state.theClass.levels[1].features[0].name}</h2>
                        <ThingText text={this.state.theClass.levels[1].features[0].text} />
                    </div>
                    <PrettyObj {...this.state.theClass} />
                </div>
            </div>
        );
    }
}

export default ClassDetails;
