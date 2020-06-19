import React from 'react';

const Header = (props) => {
  return(
    <header className="dark-accent light-shades w-100 ph3 pv3 pv3-ns ph3-m ph5-l">
      <nav className="f6 fw6 ttu tracked">
        <a className="link dim white dib mr3" href="#" title="Home">Home</a>
        <a className="link dim white dib mr3" href="#" title="About">About</a>
        <a className="link dim white dib" href="#" title="Contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;