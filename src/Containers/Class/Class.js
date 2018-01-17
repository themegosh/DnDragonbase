import React, {Component} from 'react'
import PrettyObj from '../../Components/PrettyObj'
import Compendium from '../../Helpers/Compendium'

class Class extends Component {
    constructor(props){
        super();
        this.state = {
            theClass: {},
        }
    }

    getClass(name) {
        Compendium
            .Classes
            .forEach(aClass => {
                if (aClass.name === name) {
                    this.setState({theClass: aClass})
                }
            })
    }

    componentWillMount() {
        this.getClass(this.props.match.params.name)
    }

    componentWillReceiveProps(props) {
        this.getClass(props.match.params.name)
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
