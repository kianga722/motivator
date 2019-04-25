import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import QuoteBox from './components/QuoteBox';
import VideoBox from './components/VideoBox';

class App extends Component {
  constructor(props) {
    super(props);

    // quote always random
    // initial video always just do it
    this.state = {
      navQuote: false,
      navVideo: false,
      quoteCurrent: {},
      videoCurrent: {
        url: 'https://www.youtube.com/embed/ZXsQAXx_ao0',
        title: `Shia LaBeouf "Just Do It" Motivational Speech`,
      },
    };
  }

  // sets current state to quote or video for navbar to use
  quoteToggle = () => {
    this.setState({
      navQuote: true,
      navVideo: false,
    })
  }

  videoToggle = () => {
    this.setState({
      navQuote: false,
      navVideo: true,
    })
  }

  // sets the quote or video content for rendering
  quoteSet = (quoteGetJSON) => {
    this.setState({
      quoteCurrent: {
        quote: quoteGetJSON.quote,
        author: quoteGetJSON.author
      }
    })
  }

  videoSet = (videoGetJSON) => {
    this.setState({
      videoCurrent: {
        url: videoGetJSON.url,
        title: videoGetJSON.title
      }
    })
  }
  
  render() {
    return (
      <Router>
        <Navbar
          navQuote={this.state.navQuote}
          navVideo={this.state.navVideo}
        />
        <div id='content-wrapper'>
          <Route
            path='/' exact
            render={(props) =>
              <QuoteBox {...props}
              quoteToggle={this.quoteToggle}
              videoToggle={this.videoToggle}  
              quoteCurrent={this.state.quoteCurrent}
              quoteSet={this.quoteSet}
            />}
          />
          <Route
            path='/videos' exact
            render={(props) =>
              <VideoBox {...props}
              quoteToggle={this.quoteToggle}
              videoToggle={this.videoToggle} 
              videoCurrent={this.state.videoCurrent}
              videoSet={this.videoSet}
            />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
