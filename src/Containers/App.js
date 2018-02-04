import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import NotFound from "./NotFound";
import SearchBox from "./Search/SearchBox";
import Home from "./Home/Home";
import Setup from "./Setup";
import Navbar from "./Navbar/Navbar";

import ClassList from "./Class/Class.List";
import ClassDetails from "./Class/Class.Details";
import ItemDetails from "./Item/Item.Details";
import BackgroundList from "./Background/Background.List";
import BackgroundDetails from "./Background/Background.Details";
import SpellDetails from "./Spell/Spell.Details";
import MonsterDetails from "./Monster/Monster.Details";
import FeatDetails from "./Feat/Feat.Details";
import RaceList from "./Race/Race.List";
import RaceDetails from "./Race/Race.Details";

import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div>
                    <Navbar />
                    <SearchBox />

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/setup" component={Setup} />
                        <Route path="/Classes" component={ClassList} />
                        <Route path="/Class/:name" component={ClassDetails} />
                        <Route path="/Item/:name" component={ItemDetails} />
                        <Route path="/Backgrounds" component={BackgroundList} />
                        <Route path="/Background/:name" component={BackgroundDetails} />
                        <Route path="/Spell/:name" component={SpellDetails} />
                        <Route path="/Monster/:name" component={MonsterDetails} />
                        <Route path="/Feat/:name" component={FeatDetails} />
                        <Route path="/Races" component={RaceList} />
                        <Route path="/Race/:name" component={RaceDetails} />
                        <Route component={NotFound} />
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
