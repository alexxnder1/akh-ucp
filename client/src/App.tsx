import { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import Home from './Components/Home';
import Overview from './Components/Guild/Options/Overview/Overview';
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import ErrorNotFound from './Components/ErrorNotFound';
import Users from './Components/Guild/Options/Users';
import Logs from './Components/Guild/Options/Logs';
import User from './Components/User/User';
import { NotificationProvider } from './Components/Notification/Notification';
import Top from './Components/Guild/Options/Top';
import LandingPage from './Components/LandingPage/LandingPage';
import Commands from './Components/Commands/Commands';

export class UserAuth {
  public username: string | undefined;
  public id: string | undefined;
  public avatar: string | undefined;

  constructor(username: string, id: string, avatar: string) {
    this.username = username;
    this.id = id;
    this.avatar = avatar;
  }
}

function App() {
  const [user, setUser] = useState<UserAuth | undefined | null>(undefined);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true } ).then((res: AxiosResponse) => {
      // console.log(res.data)
      var auth = new UserAuth(res.data.username, res.data.id, res.data.avatar);
      setUser(auth);
    }).catch(() => {
      setUser(null)
      // window.location.href = 'process.env.REACT_APP_FRONTEND_URL'
    })
  }, []);



  return (
    <div className="App" style={{
      display:'flex',
      // position: 'relative',
      height:'100vh',
      // backgroundColor: 
      // padding: 

    }}>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/login' element={<Home/>}/>
          <Route path='/commands' element={<Commands/>}/>
          <Route path='/guilds/:owner_id/:index/overview' element={<Overview/>}/>
          <Route path='/guilds/:owner_id/:index/users' element={<Users/>}/>
          <Route path='/guilds/:owner_id/:index/logs' element={<Logs/>}/>
          <Route path='/guilds/:owner_id/:index/user/:user_id' element={<User/>}/>
          <Route path='/guilds/:owner_id/:index/top' element={<Top/>}/>

          <Route path='/404' element={<ErrorNotFound/>}/>
          <Route path='*' element={<ErrorNotFound/>}/>

          {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
