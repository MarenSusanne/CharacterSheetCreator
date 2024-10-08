import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInComponent from './Components/LogInComponent';
import ListComponent from './Components/ListComponent';
import CreateComponent from './Components/CreateComponent';
import EditComponent from './Components/EditComponent';
import ShowComponent from './Components/ShowComponent';
import ClassComponent from './/Components/Create/ClassComponent';
import './style.css';

function App() {
  return (
    <Router>
      <div class="fun-border width-pad">
        <h1 class="centre-content">D&D Character Maker</h1>
        <Routes>
          <Route path="/" element={<LogInComponent />} /> {/* Log in */}
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