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
    // Add fadeInVideo class again
    // Need setTimeout or else animation will not restart
    setTimeout(function () {
      fadeChange('.iframeWrapper', 'fadeInVideo', true);
    }, 1)
    this.props.getVideo();
    // Remove fadeInVideo class
    fadeChange('.iframeWrapper', 'fadeInVideo', false); 
  }

  componentDidMount() {
    // set navbar to video
    this.props.setNavVideo();
    // Prevent animation if coming back from quote section
    fadeChange('.iframeWrapper', 'fadeInVideo', false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only get new video if already in video section and if the new video would be the same as the old video
    const isVideo = this.props.nav.nav.video;
    while (isVideo && this.props.video.videoCurrent.url === nextProps.video.videoCurrent.url) {
      this.props.getVideo();
    }
    return true;
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
          <div className='iframeWrapper fadeInVideo'>
            <iframe
              title='video'
              width='560' height='293' src={videoCurrent.url} frameBorder='0' allow='encrypted-media' allowFullScreen
            >
            </iframe>
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
  nav: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  video: state.video,
  nav: state.nav,
});

export default connect(mapStateToProps, { getVideo, setNavVideo })(VideoBox);