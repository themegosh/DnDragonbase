import React, {Component} from 'react'
import PrettyObj from '../../Components/PrettyObj'
import Compendium from '../../Helpers/Compendium'

class Class extends Component {
    constructor(props){
        super();
        this.state = {
            theClass: {},
            foundClass: false
        }

        Compendium.Classes.forEach(aClass => {
            if (aClass.name === props.match.params.name){
                this.state.theClass = aClass;
                this.state.foundClass = true;
            }
        })

    }

    render() {

        return ( 
            <div className="Class">
                <h1>{this.state.theClass.name}</h1>
                <PrettyObj {...this.state.theClass}></PrettyObj>
            </div>
        );
    }
}

export default Class;
