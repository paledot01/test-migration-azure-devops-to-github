import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const testENV = import.meta.env.VITE_TEST_ENV;

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Test Migration</h1>
      <div className="card">
        <p>
          ENV: <code>{testENV}</code>
        </p>
      </div>
    </>
  );
}

export default App;
