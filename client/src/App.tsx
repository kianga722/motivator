import React, { useState }   from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import QuoteBox from './components/QuoteBox';
import VideoBox from './components/VideoBox';
import { quoteCurrentObj, videoCurrentObj } from './utils/interfaces';

function App() {
  const [navQuote, setNavQuote] = useState(false);
  const [navVideo, setNavVideo] = useState(false);
  const [quoteCurrent, setQuoteCurrent] = useState<quoteCurrentObj | null>(null);
  const [videoCurrent, setVideoCurrent] = useState<videoCurrentObj | null>({
    url: 'https://www.youtube.com/embed/ZXsQAXx_ao0',
    title: `Shia LaBeouf "Just Do It" Motivational Speech`,
  });

  // sets current state to quote or video for navbar to use
  const quoteToggle = () => {
    setNavQuote(true)
    setNavVideo(false)
  }

  const videoToggle = () => {
    setNavQuote(false)
    setNavVideo(true)
  }
  
  return (
    <BrowserRouter>
      <Navbar
        navQuote={navQuote}
        navVideo={navVideo}
      />
      
      <div id='content-wrapper'>
        <Routes>
          <Route
            path='/'
            element={
              <QuoteBox 
                quoteToggle={quoteToggle}
                quoteCurrent={quoteCurrent}
                setQuoteCurrent={setQuoteCurrent}
              />
            }
          />

          <Route
            path='/videos'
            element={
              <VideoBox
                videoToggle={videoToggle}
                videoCurrent={videoCurrent}
                setVideoCurrent={setVideoCurrent}
              />
            }
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
