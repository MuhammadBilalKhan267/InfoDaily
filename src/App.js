import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress:0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {
    var pageSize= 8;
    return (
      <>
      
        <LoadingBar
          color='#f11946'
          height = {3}
          progress={this.state.progress}
          onLoaderFinished={() => this.setProgress(0)}
        />
        {  console.log(this.apiKey)}
      <Router>
        <Navbar/>
        <Routes>
          <Route path = "/" element={<News apiKey={this.apiKey}setProgress={this.setProgress} pageSize={pageSize} country="us" category = "general"/>}/>
          <Route exact path = "/business" element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="business" pageSize={pageSize} country="us" category = "business"/>}/>
          <Route exact path = "/entertainment" element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="entertainment" pageSize={pageSize} country="us" category = "entertainment"/>}/>
          <Route exact path = "/general" element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="general" pageSize={pageSize} country="us" category = "general"/>}/>
          <Route exact path = "/health" element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="health" pageSize={pageSize} country="us" category = "health"/>}/>
          <Route exact path = "/science" element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="science" pageSize={pageSize} country="us" category = "science"/>}/>
          <Route exact path = "/sports" element={<News apiKey={this.apiKey}setProgress={this.setProgress} kepageSizey="sports" pageSize={pageSize} country="us" category = "sports"/>}/>
          <Route exact path = "/technology" element={<News apiKey={this.apiKey}setProgress={this.setProgress} key="technology" pageSize={pageSize} country="us" category = "technology"/>}/>
        </Routes>
      </Router>
      </>
      
    )
  }
}

