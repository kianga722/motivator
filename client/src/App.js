import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import QuoteBox from './components/QuoteBox';
import VideoBox from './components/VideoBox';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <div id='content-wrapper'>
            <Route path='/' exact component={QuoteBox} />
            <Route path='/videos' exact component={VideoBox} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
