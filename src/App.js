import React, { Component } from 'react'
import './App.css';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link 
} from 'react-router-dom';
import Add from './component/Add'
import Home from './component/Home'

export default class App extends Component { 
  render() { 
    return (
      <div className="App">
        <Home />
      </div>
      //  <Router>
      //   <div className="App"> 
      //     <ul>
      //       <li> 
      //         <Link to="/">Home</Link> 
      //       </li> 
      //       <li> 
      //         <Link to="/Add">Add</Link> 
      //       </li>
      //     </ul>
      //     <Routes>
      //       <Route exact path='/' element={< Home />}></Route>
      //       <Route exact path='/Add' element={< Add />}></Route>
      //     </Routes>
      //   </div>
      //  </Router>
   ); 
  } 
}