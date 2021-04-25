import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Shop from "./Shop"
import Cart from "./Cart"
import Favorites from "./Favorites"
import Header from "./Header";
import {Container} from "react-bootstrap";


const App = () => {
    return (
        <Router>
            <Header/>
            <Container className="my-3">
                <Route exact path="/" component={Shop}/>
                <Route exact path="/cart" component={Cart}/>
                <Route exact path="/favorites" component={Favorites}/>
            </Container>
        </Router>
    );
};

export default App;