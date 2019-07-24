import React, { Component } from "react";

class Header extends Component {
  render() {
    let logo =
      process.env.REACT_APP_ORIGIN +
      process.env.REACT_APP_SERVER_PATH +
      process.env.REACT_APP_STATIC_PATH +
      "/img/logo-magnolia.svg";

    return (
      <nav className="navbar navbar-default mgn-train-header">
        {/* <div className="container">
					<div className="navbar-header">
						<button className="navbar-toggle collapsed" type="button" data-target="#menu-main-dropdown-mobile" data-toggle="collapse">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="index.html">
							<img width="120px" className="img-responsive" src={logo} alt=""/>
						</a>
					</div>

				    <div className="collapse navbar-collapse">
				      <ul className="nav navbar-nav">
				          <li><a  href="#tickets">Home</a></li>
				          <li><a href="#tickets">Contact</a></li>
				          <li><a href="#tickets">Sitemap</a></li>
				          <li><a href="#tickets">Login</a></li>
				      </ul>
				    </div>
				</div>	 */}
      </nav>
    );
  }
}

export default Header;
