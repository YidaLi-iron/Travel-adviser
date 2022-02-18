import UserInput from "./UserInput";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src="https://cdn3.vectorstock.com/i/1000x1000/50/52/travel-agent-makes-out-purchase-of-tickets-vector-14795052.jpg" className="logo" alt="logo" />
        <div className="title">Travel Adviser</div>
        <div className="subtitle">online</div>
      </header>
      <UserInput></UserInput>
    </div>
  );
}

export default App;
