import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './components/Main';
import Account from './components/Account';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Jobs from './components/Jobs';
import styles from './App.module.css';
import New_job from './components/New_job';
import Logout from './components/Logout';


function App() {
 
  return (
    <div className={styles.App}>
     
      <div className={styles.centered}>
      <Router>
        <Routes>
          {/* public pages */}
          <Route path='/' element={<Main />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Account' element= { <Account />}></Route>
           {/* protected pages */}
          <Route path='/Jobs' element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
                }>
          </Route>
          <Route path='/Logout' element={<Logout />}></Route>
          <Route path="/Home"  element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
         <Route  path="/New_job" element={
              <ProtectedRoute>
                <New_job />
              </ProtectedRoute>
              }
              />
         </Routes>
       
      </Router>
     </div>
   
    </div>
  );
}

export default App;
