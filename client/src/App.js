import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import QuoteBox from './components/QuoteBox';
import VideoBox from './components/VideoBox';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteCurrent: {},
    };
  }

  quoteSet = (quoteGetJSON) => {
    this.setState({
      quoteCurrent: {
        quote: quoteGetJSON.quote,
        author: quoteGetJSON.author
      }
    })
  }
  
  render() {
    return (
      <Router>
        <Navbar />
        <div id='content-wrapper'>
          <Route
            path='/' exact
            render={(props) =>
              <QuoteBox {...props}
              quoteCurrent={this.state.quoteCurrent}
              quoteSet={this.quoteSet}
            />}
          />
          <Route path='/videos' component={VideoBox} />
        </div>
      </Router>
    );
  }
}

export default App;
