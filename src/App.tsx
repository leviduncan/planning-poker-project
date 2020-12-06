import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { CreateOrJoinRoom } from './components/CreateOrJoinRoom';
import { PokerRoom } from './components/PokerRoom';
import { UsernameForm } from './components/UsernameForm';
import { useDeviceData } from './hooks/useDeviceData';

function App() {
  // ----------------------------------------
  // state
  // ----------------------------------------

  // ----------------------------------------
  // effects
  // ----------------------------------------
  const [deviceData, setName, logout] = useDeviceData();

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
              <div className="mb-3">
                <div>hello {deviceData.name}</div>
                <div>username = {deviceData.username}</div>
                <div>
                  <button className="btn btn-danger" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
              <Switch>
                <Route exact path="/">
                  <CreateOrJoinRoom></CreateOrJoinRoom>
                </Route>
                <Route path="/rooms/:id">
                  <PokerRoom></PokerRoom>
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
