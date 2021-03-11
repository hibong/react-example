import React, { Component } from "react";

class Controller extends Component {
  render() {
    console.log("Controller render");
    return (
      <div>
        <ul>
          <li>
            <a
              href="/create"
              onClick={function (e) {
                e.preventDefault();
                this.props.onChangeMode("create");
              }.bind(this)}
            >
              Create
            </a>
          </li>
          <li>
            <a
              href="/update"
              onClick={function (e) {
                e.preventDefault();
                this.props.onChangeMode("update");
              }.bind(this)}
            >
              Update
            </a>
          </li>
          <li>
            <input
              type="button"
              value="Delete"
              onClick={function (e) {
                e.preventDefault();
                this.props.onChangeMode("delete");
              }.bind(this)}
            />
          </li>
        </ul>
      </div>
    );
  }
}

export default Controller;
