import './App.css';
import Credits from './components/Credits';
import Navbar from './components/Navbar';
import TextUtil from './components/TextUtil';

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
