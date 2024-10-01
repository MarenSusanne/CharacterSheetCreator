import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListComponent from './Components/ListComponent';
import CreateComponent from './Components/CreateComponent';
import EditComponent from './Components/EditComponent';

function App() {
  return (
    <Router>
      <div>
        <h1>D&D Character Maker</h1>
        <Routes>
          <Route path="/" element={<ListComponent />} /> {/* Homepage lists items */}
          <Route path="/create" element={<CreateComponent />} /> {/* Create new item */}
          <Route path="/edit/:id" element={<EditComponent />} /> {/* Edit item by ID */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;