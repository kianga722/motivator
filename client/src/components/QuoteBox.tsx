import React, { useState, useEffect } from 'react';
import { quoteCurrentObj } from '../utils/interfaces';

interface QuoteBoxProps {
    quoteToggle: () => void;
    quoteCurrent: quoteCurrentObj | null;
    setQuoteCurrent: React.Dispatch<React.SetStateAction<quoteCurrentObj | null>>;
}

const QuoteBox = ({
    quoteToggle,
    quoteCurrent,
    setQuoteCurrent,
}: QuoteBoxProps) => {   
    const [fadeIn, setFadeIn] = useState(true)

    // Function to get quote
    const quoteGet = async () => {
        // Remove fadeIn class
        setFadeIn(false)

        // Get new quote
        try {
            let quoteGet = await fetch('/api/quote');
            let quoteGetJSON = await quoteGet.json();
          
           if (quoteCurrent !== null) {
                // Make sure different than current quote
                while (quoteCurrent.quote === quoteGetJSON.quote) {
                    quoteGet = await fetch('/api/quote');
                    quoteGetJSON = await quoteGet.json();
                }
            }

            // Set current quote state
            setQuoteCurrent({
                quote: quoteGetJSON.quote,
                author: quoteGetJSON.author
            })
            // Add fadeIn class again
            setFadeIn(true)
        } catch (err) {
            console.log('error while fetching quote', err)
        }
    }


    // Function to get new quote
    const quoteNew = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent reload
        e.preventDefault();
        quoteGet();
    }

    // Get random quote before render
    useEffect(() => {
        // set navbar to quote
        quoteToggle();
        // get quote only if no quote already
        if (quoteCurrent === null) {
            quoteGet();
        }
        // Prevent animation if coming back from video section
        setFadeIn(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    return (
        <section id='quoteBox'>
            <form className='btn-quote-wrapper' onSubmit={quoteNew}>
                <button className='btn-quote' type='submit'>New Quote</button>
            </form>

            <div className={`quoteWrapper ${fadeIn ? 'fadeIn' : ''}`}>
                <div className='quote'>
                    <i className="fas fa-quote-left"></i>{quoteCurrent !== null && quoteCurrent.quote}<i className="fas fa-quote-right"></i>
                </div>
                <div className='author'>-&nbsp;{quoteCurrent !== null && quoteCurrent.author}</div>
            </div>
        </section>
    )
}

export default QuoteBox;