import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import NotFound from './NotFound';
import Home from './Home';
import Setup from './Setup';
import Class from './Class/Class';
import Item from './Item/Item';
import Background from './Background/Background';
import Spell from './Spell/Spell';
import Monster from './Monster/Monster';

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
                        <Route exact path={process.env.PUBLIC_URL + '/'} component={Home}/>
                        <Route path={process.env.PUBLIC_URL + '/setup'} component={Setup}/>
                        <Route path={process.env.PUBLIC_URL + '/Class/:name'} component={Class}/>
                        <Route path={process.env.PUBLIC_URL + '/Item/:name'} component={Item}/>
                        <Route path={process.env.PUBLIC_URL + '/Background/:name'} component={Background}/>
                        <Route path={process.env.PUBLIC_URL + '/Spell/:name'} component={Spell}/>
                        <Route path={process.env.PUBLIC_URL + '/Monster/:name'} component={Monster}/>
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
