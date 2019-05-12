import React, { Component } from 'react';
import { fadeChange } from '../helpers';

import { connect } from 'react-redux';
import { getVideo } from '../actions/videoActions';
import { setNavVideo } from '../actions/navActions';
import PropTypes from 'prop-types';

class VideoBox extends Component {
  // Function to get new video
  videoNew = (e) => {
    // Prevent reload
    e.preventDefault();
    // Need setTimeout or else animation will not restart
    setTimeout(function () {
      fadeChange('.youtube', 'fadeInVideo', true);
    }, 1)
    this.props.getVideo();
    // Remove fadeInVideo class
    fadeChange('.youtube', 'fadeInVideo', false); 
  }

  // Only want to load video if user clicks on the cover image
  videoPlay = () => {
    const youtube = document.querySelector('.youtube');
    // Only edit content if iFrame is not already present
    const iframe = document.querySelector('iframe');
    if (!youtube.contains(iframe)) {
      // Remove any previous image
      youtube.innerHTML = '';
      // Place iFrame
      const { videoCurrent } = this.props.video;
      youtube.innerHTML = `
        <iframe
          title='video'
          width='560'
          height='293'
          src='https://www.youtube.com/embed/${videoCurrent.url}?rel=0&showinfo=0&autoplay=1' frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
        >
        </iframe>
      `
    }
  };

  // Setup Youtube Lazy Loading
  ytLazyLoad = () => {
    const youtube = document.querySelector('.youtube');
    // Remove previous images
    youtube.innerHTML = '';
    // create arrow element
    const arrow = document.createElement('div');
    arrow.classList.add('play-button')
    // append arrow
    youtube.appendChild(arrow);
    // create image element
    const image = document.createElement('img');
    // thumbnail image source
    image.src = `https://img.youtube.com/vi/${youtube.dataset.embed}/mqdefault.jpg`;
    // append image 
    youtube.appendChild(image);
  }

  componentDidMount() {
    // set navbar to video
    this.props.setNavVideo();
    // Prevent animation if coming back from quote section
    if (!this.props.nav.nav.video) {
      fadeChange('.youtube', 'fadeInVideo', false);
    }
    // Setup Youtube Lazy Loading
    this.ytLazyLoad();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Get new video only if on video section already and if the new video is the same as the old video
    const isVideo = this.props.nav.nav.video;
    if (isVideo && this.props.video.videoCurrent.url === nextProps.video.videoCurrent.url) {
      this.props.getVideo();
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    // Setup Youtube Lazy Loading
    this.ytLazyLoad();
  }
  
  render() {
    const { videoCurrent } = this.props.video;
    return (
      <section id='videoBox'>
        <form className='btn-video-wrapper' ref='form' onSubmit={this.videoNew}>
          <button className='btn-video' type='submit'>
            New Video
          </button>
        </form>
        <div className='videoWrapper'>
          <div
            className='youtube fadeInVideo'
            data-embed={`${videoCurrent.url}`}
            onClick={this.videoPlay}
          >
          </div>
          <div className='videoTitle'>
            {videoCurrent.title}
          </div>
        </div>
      </section>
    )
  }
}

VideoBox.propTypes = {
  getVideo: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired,
  setNavVideo: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  video: state.video,
  nav: state.nav
});

export default connect(mapStateToProps, { getVideo, setNavVideo })(VideoBox);