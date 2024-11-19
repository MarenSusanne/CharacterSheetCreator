import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInComponent from './Components/LogIn/LogInComponent';
import RegisterComponent from './Components/LogIn/RegisterComponent';
import ListComponent from './Components/ListComponent';
import EditComponent from './Components/EditComponent';
import ShowComponent from './Components/ShowComponent';
import Races from './/Components/Create/RaceComponent';
import Classes from './/Components/Create/Classes';
import Background from './/Components/Create/BackgroundComponent'
import Abilities from './/Components/Create/Abilities'
import StoredNewCharacter from './/Components/Create/StoredNewCharacter';
import './style.css';

function App() {
  return (
    <Router>
      <div className="fun-border width-pad">
        <h1 className="centre-content">D&D Character Maker</h1>
        <div className="topnav">
          <a href="/home">Characters</a>
          <a href="/create/class">New Character</a>
          <a href="/login">Log in</a>
        </div>
        <Routes>
          <Route path="/login" element={<LogInComponent />} /> {/* Log in */}
          <Route path="/register" element={<RegisterComponent />} /> {/* Register */}
          <Route path="/home" element={<ListComponent />} /> {/* Homepage lists items */}
          <Route path="/character/:id" element={<ShowComponent />} /> {/* Homepage lists items */}
          <Route path="/create" element={<StoredNewCharacter />} /> {/* Create new item */}
          <Route path="/create/class" element={<Classes />} /> {/* Create new item */}
          <Route path="/create/race" element={<Races />} /> {/* Create new item */}
          <Route path="/create/background" element={<Background />} /> {/* Create new item */}
          <Route path="/create/abilities" element={<Abilities />} /> {/* Create new item */}
          <Route path="/edit/:id" element={<EditComponent />} /> {/* Edit item by ID */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;