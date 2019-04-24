import React, { Component } from 'react';

class VideoBox extends Component {
  // Function to remove fade class
  fadeRemove = () => {
    const iframeWrapper = document.querySelector('.iframeWrapper');
    iframeWrapper.classList.remove('fadeInVideo');
  }

  // Function to add fade class
  fadeAdd = () => {
    const iframeWrapper = document.querySelector('.iframeWrapper');
    iframeWrapper.classList.add('fadeInVideo');
  }

  // Function to get quote
  videoGet = async (e) => {
    // Remove fadeInVideo class
    this.fadeRemove();
    // Get new quote
    let videoGet = await fetch('/api/video');
    let videoGetJSON = await videoGet.json();
    // Make sure different than current quote
    while (this.props.videoCurrent.url === videoGetJSON.url) {
      videoGet = await fetch('/api/video');
      videoGetJSON = await videoGet.json();
    }
    // Set current quote state
    this.props.videoSet(videoGetJSON);
    // Add fadeInVideo class again
    this.fadeAdd();
  }

  // Prevent animation if coming back from video section
  componentDidMount() {
    this.props.videoToggle();
    this.fadeRemove();
  }
  
  // Function to get new quote
  videoNew = (e) => {
    // Prevent reload
    e.preventDefault();
    this.videoGet();
  }

  render() {
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
              width='560' height='293' src={this.props.videoCurrent.url} frameBorder='0' allow='encrypted-media' allowFullScreen
            >
            </iframe>
          </div>
          <div className='videoTitle'>
            {this.props.videoCurrent.title}
          </div>
        </div>
      </section>
    )
  }
}

export default VideoBox;