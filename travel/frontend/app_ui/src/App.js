import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './components/Main';
import Account from './components/Account';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Jobs from './components/Jobs';
import styles from './App.module.css';
import New_job from './components/New_Job';
import Layout from './components/Layout';
import ApplyJob from './components/ApplyJob';
import Profile from './components/Profile';

function App() {
 
  return (
    <div className={styles.App}>
     
      <div className={styles.centered}>
      <Router>
        <Routes>
          {/* public pages */}
          <Route path='/' element={<Main />}></Route>
          <Route path='/Login' element={
            <Login>
              <Main.Block1 />
              </Login>
            }></Route>
          <Route path='/Account' element= { 
            <Account>
              <Main.Block1></Main.Block1>
            </Account>
              }></Route>
           {/* protected pages */}
          <Route path='/Jobs' element={
                <ProtectedRoute>
                  <Layout>
                  <Jobs />
                  </Layout>
                </ProtectedRoute>
                }>
          </Route>
  
          <Route path="/Home"  element={
            <ProtectedRoute>
              <Layout>
              <Home />
              </Layout>
            </ProtectedRoute>
          }/>
         <Route  path="/New_job" element={
              <ProtectedRoute>
                <Layout>
                <New_job />
                </Layout> 
              </ProtectedRoute>
              }
              />

          <Route path='/ApplyJob' element={<ApplyJob />}>

          </Route>
          <Route path="/Profile"  element = {
            <ProtectedRoute>
               <Layout>
              <Profile />  
              </Layout>
            </ProtectedRoute>}>
           
          </Route>
         </Routes>
       
      </Router>
     </div>
   
    </div>
  );
}

export default App;
