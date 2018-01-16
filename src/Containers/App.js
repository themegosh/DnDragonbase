import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import NotFound from './NotFound';
import Home from './Home';
import Setup from './Setup';
import Class from './Class/Class';
import Item from './Item/Item';
import Background from './Background/Background';
import Spell from './Spell/Spell';

import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
        };

    }

    render() {
        return (
            <Router>
                <div>
                    <div className='nav-buttons'>
                        <div className='nav-button'>
                            <Link to="/">Home</Link>
                        </div>
                        <div className='nav-button'>
                            <Link to="/setup">Setup</Link>
                        </div>
                        <hr/>

                    </div>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/setup" component={Setup}/>
                        <Route path="/Class/:name" component={Class}/>
                        <Route path="/Item/:name" component={Item}/>
                        <Route path="/Background/:name" component={Background}/>
                        <Route path="/Spell/:name" component={Spell}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

/*const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        render={props => (fakeAuth.isAuthenticated
        ? (<Component {...props}/>)
        : (<Redirect
            to={{
            pathname: '/login',
            state: {
                from: props.location
            }
        }}/>))}/>
)*/

export default App;
