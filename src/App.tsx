import './App.css';
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
    <div className="container">
      <div className="mt-3 mb-3">
        <h1>Planning Poker</h1>
        {deviceData ? (
          <div>
            <div>
              hello {deviceData.name} | username = {deviceData.username}
            </div>
            <div>
              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <UsernameForm onSubmit={setName} />
        )}
      </div>
    </div>
  );
}

export default App;
