import React, { useState, useEffect } from 'react';
import { videoCurrentObj } from '../utils/interfaces';

interface VideoBoxProps {
    videoToggle: () => void;
    videoCurrent: videoCurrentObj | null;
    setVideoCurrent: React.Dispatch<React.SetStateAction<videoCurrentObj | null>>;
}

const VideoBox = ({
    videoToggle,
    videoCurrent,
    setVideoCurrent,
}: VideoBoxProps) => {   
    const [fadeIn, setFadeIn] = useState(true)

    // Function to get quote
    const videoGet = async () => {
        // Remove fadeIn class
        setFadeIn(false)

        // Get new quote
        try {
            let videoGet = await fetch('/api/video');
            let videoGetJSON = await videoGet.json();
          
           if (videoCurrent !== null) {
                // Make sure different than current quote
                while (videoCurrent.url === videoGetJSON.url) {
                    videoGet = await fetch('/api/video');
                    videoGetJSON = await videoGet.json();
                }
            }

            // Set current quote state
            setVideoCurrent({
                url: videoGetJSON.url,
                title: videoGetJSON.title
            })
            // Add fadeIn class again
            setFadeIn(true)
        } catch (err) {
            console.log('error while fetching quote', err)
        }
    }


    // Function to get new quote
    const videoNew = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent reload
        e.preventDefault();
        videoGet();
    }

    // Get random quote before render
    useEffect(() => {
        // set navbar to quote
        videoToggle();
        // get quote only if no quote already
        if (videoCurrent === null) {
            videoGet();
        }
        // Prevent animation if coming back from video section
        setFadeIn(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    return (
        <section id='videoBox'>
            <form className='btn-video-wrapper' onSubmit={videoNew}>
                <button className='btn-video' type='submit'>New Video</button>
            </form>

            <div className='videoWrapper'>
                <div className={`iframeWrapper ${fadeIn ? 'fadeInVideo' : ''}`}>
                    {
                        videoCurrent &&
                        <iframe
                            title='video'
                            width='560' 
                            height='293' 
                            src={`https://www.youtube.com/embed/${videoCurrent.url}`} 
                            frameBorder='0' 
                            allow='encrypted-media' 
                            allowFullScreen
                        ></iframe>
                    }
                </div>

                {
                    videoCurrent &&
                    <div className='videoTitle'>{videoCurrent.title}</div>
                }
            </div>
        </section>
    )
}

export default VideoBox;