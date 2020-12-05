import React, { Component } from "react";

const values = ["?", "0", "0.5", "1", "2", "3", "5", "8", "13", "21"];

export default class PointPickerForm extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedPoints: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.selectedPoints === "") {
      return;
    }
    this.props.onSubmit(this.state.selectedPoints);
  }

  handlePointChange(e) {
    this.setState({ selectedPoints: e.target.value });
  }

  render() {
    return (
      <div className="mb-3">
        <h2>Hello, {this.props.name}!</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-row">
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.props.onExit()}
              >
                Exit
              </button>
            </div>
            <div className="col">
              <select
                id="points"
                className="form-control"
                onChange={e => this.handlePointChange(e)}
              >
                <option value="">Pick your points</option>
                {values.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
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
