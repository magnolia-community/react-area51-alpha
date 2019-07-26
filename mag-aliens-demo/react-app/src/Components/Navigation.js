import React, { Component } from "react";

import axios from "axios";

import { dlog, getRelativePath, getLink, inPageEditor } from "../AppHelpers";

class Navigation extends Component {
  constructor(props) {
    super(props);

    dlog("***");
    dlog("Navigation: ");

    this.loadNavContent = this.loadNavContent.bind(this);

    // Initialize state object.
    this.state = {
      init: false,
      nav: {}
    };

    this.USE_SAMPLE_DATA = false;
  }

  handleClick = path => {
    const event = new Event("pushState");

    window.history.pushState({}, null, path);
    window.dispatchEvent(event);
  };

  componentWillMount() {
    this.loadNavContent();
  }

  loadNavContent() {
    if (this.USE_SAMPLE_DATA) {
      this.useSampleData();
    } else {
      const url =
        process.env.REACT_APP_ORIGIN +
        process.env.REACT_APP_SERVER_PATH +
        process.env.REACT_APP_REST_NAV +
        process.env.REACT_APP_BASE;
      axios
        .get(url)
        .then(response => {
          dlog("***");
          dlog("Navigation: got nav content.");

          this.setState({
            init: true,
            nav: response.data
          });
        })
        .catch(error => {
          dlog(error);
        });
    }
  }

  getPathOfPageFromURL() {
    var pathOfPage = window.location.pathname;
    //Remove any extension.
    if (pathOfPage.lastIndexOf(".") > 0) {
      pathOfPage = pathOfPage.substr(0, pathOfPage.lastIndexOf("."));
    }
    //Remove trailing slash
    if (pathOfPage[pathOfPage.length - 1] === "/") {
      pathOfPage = pathOfPage.substr(0, pathOfPage.length - 1);
    }
    return pathOfPage;
  }

  render() {
    if (!this.state.init) {
      return null;
    }

    //Which is this pages ancestor?
    var subNavOfThisPage;
    var pathOfPage = this.getPathOfPageFromURL();

    var a = this.state.nav;

    this.state.nav["@nodes"].map(function(nodeName) {
      var item = this.state.nav[nodeName];
      var path = item["@path"];
      var pathOfItem = getRelativePath(
        path,
        process.env.REACT_APP_SERVER_PATH,
        process.env.REACT_APP_BASE,
        inPageEditor()
      );
      //dlog("page:"+ pathOfPage + " & item:" + pathOfItem)
      if (pathOfPage.indexOf(pathOfItem) > -1) {
        subNavOfThisPage = item;
      }
      return null;
    }, this);

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a
          href={getLink(
            process.env.REACT_APP_BASE,
            process.env.REACT_APP_SERVER_PATH,
            process.env.REACT_APP_BASE,
            inPageEditor()
          )}
          className="navbar-brand"
        >
          {this.state.nav.title}
        </a>

        <div className="navbar-collapse">
          <div className="nav-stack">
            <ul className="navbar-nav">
              <MenuItems
                spec={this.state.nav}
                context={this.context}
                class1="nav-item"
                class2="nav-link"
              />
            </ul>
            <ul className="navbar-nav">
              <MenuItems
                spec={subNavOfThisPage}
                context={this.context}
                class1="nav-item"
                class2="nav-link"
              />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const MenuItems = props => {
  const handleClick = path => {
    const event = new Event("pushState");

    window.history.pushState({}, null, path);
    window.dispatchEvent(event);
  };

  if (!props.spec) {
    dlog("SubNav. No spec.");
    return null;
  }

  var items = [];
  props.spec["@nodes"].map(function(nodeName) {
    items.push(props.spec[nodeName]);
    return null;
  }, this);

  return items.map(item => {
    const link = getLink(
      item["@path"],
      process.env.REACT_APP_SERVER_PATH,
      process.env.REACT_APP_BASE,
      inPageEditor()
    );
    return (
      <li key={item["@path"]}>
        <span onClick={() => handleClick(link)} className={props.class2}>
          {item.title}
        </span>
      </li>
    );
  });
};
// <li key={item["@path"]} onClick={() => handleClick(link)} className={props.class1} >
//   <a href=""
//   {item.title}
// </li>

export default Navigation;
