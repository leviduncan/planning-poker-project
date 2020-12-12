import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { CreateOrJoinRoom } from './components/CreateOrJoinRoom';
import { Nav } from './components/Nav';
import { PokerRoom } from './components/PokerRoom';
import { PokerRoomPage } from './components/PokerRoomPage';
import { UsernameForm } from './components/UsernameForm';
import { useDeviceData } from './hooks/useDeviceData';

function App() {
  // ----------------------------------------
  // state
  // ----------------------------------------

  // ----------------------------------------
  // effects
  // ----------------------------------------
  const [deviceData, setName] = useDeviceData();

  // ----------------------------------------
  // helper functions
  // ----------------------------------------

  // ----------------------------------------
  // render
  // ----------------------------------------
  return (
    <Router>
      <div className="container">
        <div className="mt-3 mb-3">
          <h1>Planning Poker</h1>
          {deviceData ? (
            <div>
              <Nav deviceData={deviceData}></Nav>
              <Switch>
                <Route exact path="/">
                  <CreateOrJoinRoom></CreateOrJoinRoom>
                </Route>
                <Route path="/rooms/:roomId">
                  <PokerRoomPage deviceData={deviceData}></PokerRoomPage>
                </Route>
              </Switch>
            </div>
          ) : (
            <UsernameForm onSubmit={setName} />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
