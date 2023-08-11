
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Home from './Components/Home';
import AddEdit from './Components/AddEdit';
import ViewContact from './Components/ViewContact';
function App() {
  return (
    <Router>
    <div className="App">
      <ToastContainer position='top-center' />
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/AddEdit' element={<AddEdit />} />
          <Route path='/update/:id' element={<AddEdit />} />
          <Route path='/view/:id' element={<ViewContact />} />
        </Routes>
    
      
    </div>
    </Router>
  );
}

export default App;
