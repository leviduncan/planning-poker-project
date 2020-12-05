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
  const [deviceData, setName] = useDeviceData();

  // ----------------------------------------
  // helper functions
  // ----------------------------------------

  // ----------------------------------------
  // render
  // ----------------------------------------
  return (
    <div className="container">
      <div className="mt-3 mb-3">
        <UsernameForm onSubmit={setName} />
        {deviceData && (
          <div>
            hello {deviceData.name} | username = {deviceData.username}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
