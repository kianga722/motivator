import React, { Component } from 'react';
import { fadeChange } from '../helpers';

import { connect } from 'react-redux';
import { getQuote } from '../actions/quoteActions';
import { setNavQuote } from '../actions/navActions';
import PropTypes from 'prop-types';
import { createVerify } from 'crypto';

class QuoteBox extends Component {
  // Function to get new quote
  quoteNew = (e) => {
    // Prevent reload
    e.preventDefault();
    // Need setTimeout or else animation will not restart
    setTimeout(function () {
      fadeChange('.quoteWrapper', 'fadeIn', true);
    }, 1)
    this.props.getQuote();
    // Remove fadeIn class
    fadeChange('.quoteWrapper', 'fadeIn', false);
  }
  
  // Get random quote before render
  componentDidMount() {
    // set navbar to quote
    this.props.setNavQuote();
    // Do not fadeIn if coming from video section
    if (this.props.quote.quoteCurrent.quote !== null && !this.props.nav.nav.quote) {
      fadeChange('.quoteWrapper', 'fadeIn', false);
    }
    // get quote only if no quote already
    if (this.props.quote.quoteCurrent.quote === null) {
      this.props.getQuote();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Always get new quote when first loading page
    if (this.props.quote.quoteCurrent.quote === null) {
      return true;
    }
    // Get new quote only if on quote section already and if the new quote is the same as the old quote
    const isQuote = this.props.nav.nav.quote;
    if (isQuote && this.props.quote.quoteCurrent.quote === nextProps.quote.quoteCurrent.quote) {
      this.props.getQuote();
      return false;
    }
    return true;
  }
  
  render() {
    const { quoteCurrent } = this.props.quote;
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
            {quoteCurrent.quote}
            <i className="fas fa-quote-right"></i>
          </div>
          <div className='author'>
            -&nbsp;{quoteCurrent.author}
          </div>
        </div>
      </section>
    )
  }
}

QuoteBox.propTypes = {
  getQuote: PropTypes.func.isRequired,
  quote: PropTypes.object.isRequired,
  setNavQuote: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  quote: state.quote,
  nav: state.nav
});
  
export default connect(mapStateToProps, { getQuote, setNavQuote })(QuoteBox);