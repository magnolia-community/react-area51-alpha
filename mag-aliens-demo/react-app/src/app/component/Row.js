import React, { Component } from "react";

import Column from "./Column";

class Row extends Component {
  /**
   * Render
   */
  render() {
    return (
      <div className="row mgn-train-section">
        {this.props.columns.map((column, index) => (
          <Column key={index} column={column} />
        ))}
      </div>
    );
  }
}

export default Row;
