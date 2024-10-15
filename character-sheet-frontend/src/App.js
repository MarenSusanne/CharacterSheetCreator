import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInComponent from './Components/LogIn/LogInComponent';
import RegisterComponent from './Components/LogIn/RegisterComponent';
import ListComponent from './Components/ListComponent';
import CreateComponent from './Components/CreateComponent';
import EditComponent from './Components/EditComponent';
import ShowComponent from './Components/ShowComponent';
import ClassComponent from './/Components/Create/ClassComponent';
import './style.css';

function App() {
  return (
    <Router>
      <div className="fun-border width-pad">
        <h1 className="centre-content">D&D Character Maker</h1>
        <div className="topnav">
          <a href="home">Characters</a>
          <a href="create/class">New Character</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
        <Routes>
          <Route path="/login" element={<LogInComponent />} /> {/* Log in */}
          <Route path="/register" element={<RegisterComponent />} /> {/* Register */}
          <Route path="/home" element={<ListComponent />} /> {/* Homepage lists items */}
          <Route path="/character/:id" element={<ShowComponent />} /> {/* Homepage lists items */}
          <Route path="/create" element={<CreateComponent />} /> {/* Create new item */}
          <Route path="/create/class" element={<ClassComponent />} /> {/* Create new item */}
          <Route path="/edit/:id" element={<EditComponent />} /> {/* Edit item by ID */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;