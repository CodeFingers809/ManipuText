import "./App.css";
import Navbar from "./components/Navbar";
import TextUtil from "./components/TextUtil";
import Credits from "./components/Credits"

function App() {
  return (
    <div className="App">
      <Navbar />
      <TextUtil />
      <Credits />
    </div>
  );
}

export default App;
