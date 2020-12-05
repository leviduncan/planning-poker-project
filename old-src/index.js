import React, { Component } from 'react';
import { render } from 'react-dom';
import * as stats from 'stats-lite';
import { v4 as uuidv4 } from 'uuid';
import { getDeviceData, resetDeviceData, setDeviceData } from './deviceData';
import PlayerCard from './PlayerCard';
import PointPickerForm from './PointPickerForm';
import { PokerRoomService } from './PokerRoomService';
import './style.css';
import UsernameForm from './UsernameForm';

class Player {
  constructor({ name }) {
    this.name = name;
    this.value = null;
    this.flipped = false;
  }
}

class App extends Component {
  roomService;

  constructor() {
    super();
  }

  handleUsernameSubmit(name) {
    const newDeviceData = setDeviceData({
      name: name,
      username: `${uuidv4()}_${name}`,
    });

    const updatedPlayers = { ...this.state.players };
    updatedPlayers[newDeviceData.username] = new Player({ name: name });
    this.roomService.players.update(updatedPlayers);

    this.setState({ deviceData: newDeviceData });
  }

  render() {
    return (
      <div className="container">
        <div className="mt-3 mb-3">
          <UsernameForm onSubmit={(e) => this.handleUsernameSubmit(e)} />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
