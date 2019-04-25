import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Navbar extends Component {
  // Highlight current button in navbar
  componentDidUpdate() {
    const btnQuote = document.querySelector('.btn-quotes');
    const btnVideo = document.querySelector('.btn-videos');
    this.props.navQuote ? btnQuote.classList.add('quote-active') : btnQuote.classList.remove('quote-active');
    this.props.navVideo ? btnVideo.classList.add('video-active') : btnVideo.classList.remove('video-active'); 
  }

  // Want homepage link to refresh quote but other links to not
  render() {
    return (
      <nav id='navBar'>
        <a className='logo' href='/'>
          Motivator
        </a>
        <div className='navLinks'>
          <Link className='btn-quotes' to='/'>
            Quotes
          </Link>
          <Link className='btn-videos' to='/videos'>
            Videos
          </Link>
        </div>
      </nav>
    )
  }
}

export default Navbar;