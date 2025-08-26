import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './components/Main';
import Account from './components/Account';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/Account' element={<Account />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        </Routes>
       
      </Router>
     
   
    </div>
  );
}

export default App;
