import React, { Component } from "react";
import PrettyObj from "../../Components/PrettyObj";
import Compendium from "../../Helpers/Compendium";

class Class extends Component {
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
        for (let lvlIndex = 1; lvlIndex <= 20; lvlIndex++) {
            var features = this.state.theClass.levels[lvlIndex].features.map(
                (aFeature, key) => {
                    return <span>{aFeature.name} | </span>;
                }
            );
            var slots = [];
            for (var slotIndex = 1; slotIndex <= this.state.theClass.levels[maxClassLvl].slots.length; slotIndex++) {
                if (this.state.theClass.levels[lvlIndex].slots[slotIndex]) {
                    slots.push(
                        <td key={slotIndex}>
                            {this.state.theClass.levels[lvlIndex].slots[slotIndex]}
                        </td>
                    );
                } else {
                    slots.push(<td key={slotIndex}>-</td>);
                }
            }
            console.log(features);
            rows.push(
                <tr key={lvlIndex}>
                    <td>
                        <h2>{lvlIndex}</h2>
                    </td>
                    <td>{features}</td>
                    {slots}
                </tr>
            );
        }
        return (
            <table className="table table-striped">
            <thead>
                <tr>
                    <td>Level</td>
                    <td>Features</td>
                    
                </tr>
            </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="Class">
                <h1>{this.state.theClass.name}</h1>
                {this.getClassChart()}
                <PrettyObj {...this.state.theClass} />
            </div>
        );
    }
}

export default Class;
