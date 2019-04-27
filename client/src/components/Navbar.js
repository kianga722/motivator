import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Navbar extends Component {
  // Highlight current button in navbar
  componentDidUpdate() {
    const { nav } = this.props.nav;
    const btnQuote = document.querySelector('.btn-quotes');
    const btnVideo = document.querySelector('.btn-videos');
    nav.quote ? btnQuote.classList.add('quote-active') : btnQuote.classList.remove('quote-active');
    nav.video ? btnVideo.classList.add('video-active') : btnVideo.classList.remove('video-active'); 
  }

  // Want homepage link to refresh quote but other links to not
  render() {
    // Prevent clicking currently active category to do anything
    const { nav } = this.props.nav;
    return (
      <nav id='navBar'>
        <a className='logo' href='/'>
          Motivator
        </a>
        <div className='navLinks'>
          {nav.quote ?
            <div className='btn-quotes'>
              Quotes
            </div> :
            <Link className='btn-quotes' to='/'>
              Quotes
            </Link>
          }
          {nav.video ?
            <div className='btn-videos'>
              Videos
            </div> :
            <Link className='btn-videos' to='/videos'>
              Videos
            </Link>
          }
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  nav: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  nav: state.nav,
});

export default connect(mapStateToProps, {})(Navbar);