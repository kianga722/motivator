import React, { Component } from 'react';
import { fadeChange } from '../helpers';

class QuoteBox extends Component {
  // Function to get quote
  quoteGet = async () => {
    // Remove fadeIn class
    fadeChange('.quoteWrapper', 'fadeIn', false);
    // Get new quote
    let quoteGet = await fetch('/api/quote');
    let quoteGetJSON = await quoteGet.json();
    // Make sure different than current quote
    while (this.props.quoteCurrent.quote === quoteGetJSON.quote) {
      quoteGet = await fetch('/api/quote');
      quoteGetJSON = await quoteGet.json();
    }
    // Set current quote state
    this.props.quoteSet(quoteGetJSON);
    // Add fadeIn class again
    fadeChange('.quoteWrapper', 'fadeIn', true);
  }

  // Function to get new quote
  quoteNew = (e) => {
    // Prevent reload
    e.preventDefault();
    this.quoteGet();
  }
  
  // Get random quote before render
  componentDidMount() {
    // set navbar to quote
    this.props.quoteToggle();
    // get quote only if no quote already
    if (Object.keys(this.props.quoteCurrent).length === 0) {
      this.quoteGet();
    }
    // Prevent animation if coming back from video section
    fadeChange('.quoteWrapper', 'fadeIn', false);
  }
  
  render() {
    return (
      <section id='quoteBox'>
        <form className='btn-quote-wrapper' ref='form' onSubmit={this.quoteNew}>
          <button className='btn-quote' type='submit'>
            New Quote
          </button>
        </form>
        <div className='quoteWrapper fadeIn'>
          <div className='quote'>
            <i className="fas fa-quote-left"></i>
            {this.props.quoteCurrent.quote}
            <i className="fas fa-quote-right"></i>
          </div>
          <div className='author'>
            -&nbsp;{this.props.quoteCurrent.author}
          </div>
        </div>
      </section>
    )
  }
}

export default QuoteBox;