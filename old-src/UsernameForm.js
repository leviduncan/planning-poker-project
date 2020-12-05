import React, { useState, Component } from "react";

export default class UsernameForm extends Component {
  constructor(props) {
    super();
    this.state = {
      name: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.name === "") {
      return;
    }
    this.props.onSubmit(this.state.name);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div>
        <div>Please enter your name:</div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                placeholder="Name"
                id="name"
                className="form-control"
                value={this.state.name}
                onChange={this.handleNameChange.bind(this)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
