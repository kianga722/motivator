import React, { Component } from 'react';

class QuoteBox extends Component {

  // Function to toggle fade
  fadeToggle = () => {
    const quoteWrapper = document.querySelector('.quoteWrapper');
    quoteWrapper.classList.toggle('fadeIn');
  }

  // Function to get quote
  quoteGet = async (e) => {
    // Remove fadeIn class
    this.fadeToggle();
    // Get new quote
    let quoteGet = await fetch('/api/');
    let quoteGetJSON = await quoteGet.json();
    // Make sure different than current quote
    while (this.props.quoteCurrent.quote === quoteGetJSON.quote) {
      quoteGet = await fetch('/api/');
      quoteGetJSON = await quoteGet.json();
    }
    // Set current quote state
    this.props.quoteSet(quoteGetJSON);
    // Add fadeIn class again
    this.fadeToggle();
  }
  

  // Get random quote before render
  componentDidMount() {
    if (Object.keys(this.props.quoteCurrent).length === 0) {
      this.quoteGet();
    }
  }

  // Function to get new quote
  quoteNew = (e) => {
    // Prevent reload
    e.preventDefault();
    this.quoteGet();
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
            <i class="fas fa-quote-left"></i>
            {this.props.quoteCurrent.quote}
            <i class="fas fa-quote-right"></i>
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