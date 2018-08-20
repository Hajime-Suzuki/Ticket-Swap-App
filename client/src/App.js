import './App.css'

import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Home} />
      </div>
    )
  }
}

export default App
