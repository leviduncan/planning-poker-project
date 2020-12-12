import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { CreateOrJoinRoom } from './components/CreateOrJoinRoom';
import { Nav } from './components/Nav';
import { UsernameForm } from './components/UsernameForm';
import { useDeviceData } from './hooks/useDeviceData';
import { PokerRoomPage } from './pages/PokerRoomPage';

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
      <Nav deviceData={deviceData}></Nav>
      <div className="container mt-3 mb-3">
        {deviceData ? (
          <Switch>
            <Route exact path="/">
              <CreateOrJoinRoom></CreateOrJoinRoom>
            </Route>
            <Route path="/rooms/:roomId">
              <PokerRoomPage deviceData={deviceData}></PokerRoomPage>
            </Route>
          </Switch>
        ) : (
          <UsernameForm onSubmit={setName} />
        )}
      </div>
    </Router>
  );
}

export default App;
