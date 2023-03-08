import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
    navQuote: boolean,
    navVideo: boolean
}
const Navbar = ({
    navQuote,
    navVideo
}: NavbarProps) => {
    // Highlight current button in navbar
    // Want homepage link to refresh quote but other links to not
    return (
        <nav id='navBar'>
            <a className='logo' href='/'>Motivator</a>

            <div className='navLinks'>
                <Link className={`btn-quotes ${navQuote ? 'quote-active':''}`} to='/'>Quotes</Link>
                <Link className={`btn-videos ${navVideo ? 'video-active':''}`} to='/videos'>Videos</Link>
            </div>
        </nav>
    )
}

export default Navbar;