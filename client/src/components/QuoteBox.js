import React, { Component } from 'react';

class QuoteBox extends Component {

  // Function to set quoteSet to true
  quoteSet = () => {
    if (!this.state.quoteSet) {
      this.setState({
        quoteSet: true,
      })
    }
  }

  // Function to remove fade class
  fadeRemove = () => {
    const quoteWrapper = document.querySelector('.quoteWrapper');
    quoteWrapper.classList.remove('fadeIn');
  }

  // Function to add fade class
  fadeAdd = () => {
    const quoteWrapper = document.querySelector('.quoteWrapper');
     quoteWrapper.classList.add('fadeIn');
  }

  // Function to get quote
  quoteGet = async (e) => {
    // Remove fadeIn class
    this.fadeRemove();
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
    this.fadeAdd();
  }
  
  // Get random quote before render
  componentDidMount() {
    this.props.quoteToggle();
    if (Object.keys(this.props.quoteCurrent).length === 0) {
      this.quoteGet();
    }
    // Prevent animation if coming back from video section
    this.fadeRemove();
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