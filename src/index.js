import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import db from "./db";
import { getDeviceData, setDeviceData, resetDeviceData } from "./deviceData";
import * as stats from "stats-lite";

// components
import UsernameForm from "./UsernameForm";
import PointPickerForm from "./PointPickerForm";
import PlayerCard from "./PlayerCard";

class Player {
  constructor({ name }) {
    this.name = name;
    this.value = null;
    this.flipped = false;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      deviceData: getDeviceData(),
      flipped: false, // common
      players: {} // common
    };
  }

  componentDidMount() {
    db.child("players").on("value", snapshot => {
      const players = snapshot.val() || {};
      this.setState({ players: players });
    });
    db.child("flipped").on("value", snapshot => {
      this.setState({ flipped: !!snapshot.val() });
    });
  }

  handleUsernameSubmit(name) {
    const newDeviceData = setDeviceData({
      name: name,
      username: `${uuidv4()}_${name}`
    });

    const updatedPlayers = { ...this.state.players };
    updatedPlayers[newDeviceData.username] = new Player({ name: name });
    db.child("players").update(updatedPlayers);

    this.setState({ deviceData: newDeviceData });
  }

  handlePointSelection(value) {
    const updatedPlayers = { ...this.state.players };
    if (!updatedPlayers[this.state.deviceData.username]) {
      this.handleExit();
      return;
    }
    updatedPlayers[this.state.deviceData.username].value = value;
    db.child("players").update(updatedPlayers);
  }

  handleFlip() {
    const updatedPlayers = { ...this.state.players };
    Object.entries(updatedPlayers).forEach(([username, player]) => {
      if (player.value) {
        player.flipped = true;
      }
    });

    db.update({ flipped: true, players: updatedPlayers });
  }

  handleReset() {
    const updatedPlayers = { ...this.state.players };
    Object.entries(updatedPlayers).forEach(([key, value]) => {
      value.flipped = false;
      value.value = null;
    });

    db.update({ flipped: false, players: updatedPlayers });
  }

  handleRemovePlayer(username) {
    const updatedPlayers = { ...this.state.players };
    delete updatedPlayers[username];

    db.child("players").set(updatedPlayers);
  }

  handleExit() {
    const updatedPlayers = { ...this.state.players };
    delete updatedPlayers[this.state.deviceData.username];

    this.resetDeviceData();
    db.child("players").set(updatedPlayers);
  }

  resetDeviceData() {
    this.setState({
      deviceData: resetDeviceData()
    });
  }

  // Render Helpers
  getUsername() {
    return this.state.deviceData.username;
  }

  getName() {
    return this.state.deviceData.name;
  }

  getValues() {
    return Object.entries(this.state.players)
      .filter(([username, player]) => !!player.value && player.flipped)
      .map(([username, player]) => Number(player.value));
  }

  getMode() {
    const mode = stats.mode(this.getValues());
    console.log('mode =', mode)
    return JSON.stringify(mode);
  }

  getMean() {
    const mean = stats.mean(this.getValues());
    return (mean && mean.toFixed(2)) || "n/a";
  }

  getPlayers() {
    return Object.entries(this.state.players).sort(([a], [b]) => {
      if (a === this.state.deviceData.username) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  render() {
    // console.log("rendering");
    // console.log("render > this.getValues() = ", Object.values(this.state.players).map(players => players.value));
    // console.log(stats.mode(this.getValues()))
    return (
      <div className="container">
        <div className="mt-3 mb-3">
          {!this.getUsername() ? (
            <UsernameForm onSubmit={e => this.handleUsernameSubmit(e)} />
          ) : (
            <div>
              <PointPickerForm
                name={this.getName()}
                onSubmit={e => this.handlePointSelection(e)}
                onExit={() => this.handleExit()}
              />

              <div className="mb-3 text-center">
                <button
                  type="button"
                  className="btn btn-success mr-3"
                  onClick={() => this.handleFlip()}
                >
                  Flip all cards
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.handleReset()}
                  disabled={!this.state.flipped}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {!this.state.flipped ? (
          ""
        ) : (
          <div className="text-center mb-3">
            Mode: {this.getMode()} | Mean : {this.getMean()}
          </div>
        )}

        <div className="row">
          {this.getPlayers().map(([username, player]) => {
            return (
              <PlayerCard
                key={username}
                username={username}
                player={player}
                onRemovePlayer={username => this.handleRemovePlayer(username)}
                currentUser={this.getUsername()}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
