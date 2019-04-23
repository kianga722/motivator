import React, { Component } from 'react';

class VideoBox extends Component {
  render() {
    return (
      <section id='videoBox'>
        <iframe
          title='video'
          width='560' height='315' src='https://www.youtube.com/embed/ZXsQAXx_ao0' frameBorder='0' allow='encrypted-media' allowFullScreen
        >
        </iframe>
      </section>
    )
  }
}

export default VideoBox;