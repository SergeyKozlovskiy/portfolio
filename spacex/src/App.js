import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Main from "./components/Main/Main";
import Calendar from "./components/Calendar/Calendar";
import Details from "./components/Details/Details";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import './style.css';
import FetchData from "./service/FetchData";
import { findDOMNode } from 'react-dom';

class App extends React.Component {

  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
    company: null,
  };

  componentDidMount(){
    this.upDateRocket();
    this.upDateCompany();
  }

  upDateRocket(){
    this.fetchData.getRocket()
    .then(data => { 
      this.setState({rockets: data.map(item => item.name)})
      return data})
    .then(data => data.find(item => item.name === this.state.rocket))
    .then(rocketFeatures => this.setState({rocketFeatures}));
  }

  upDateCompany = () => {
    this.fetchData.getCompany()
    .then(data => this.setState({company: data}))
  }

changeRocket = rocket => {
  this.setState({
      rocket
  }, this.upDateRocket)
}

  render() {
    return(
      <BrowserRouter >
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/>

        <Route exact path='/'>
          {this.state.company ? <Home company={this.state.company}/> :  null}
        </Route>
        
        <Route path='/rocket'>
          <Main rocket={this.state.rocket}/>
          {this.state.rocketFeatures ? <Features {...this.state.rocketFeatures}/> :  null}
        </Route>

        <Route path='/calendar'>
          
          <Calendar />
        </Route>

        <Route path='/details'>
          
          <Details />
        </Route>

        {this.state.company ? <Footer {...this.state.company.links}/> : null}
      </BrowserRouter>
    );
  }
}

export default App;
