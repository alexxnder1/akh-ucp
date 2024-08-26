import { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import Home from './Components/Home';
import Stats from './Components/Guild/Options/Stats';
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import ErrorNotFound from './Components/ErrorNotFound';

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
    axios.get('https://localhost:3000/api/user', { withCredentials: true } ).then((res: AxiosResponse) => {
      // console.log(res.data)
      var auth = new UserAuth(res.data.username, res.data.id, res.data.avatar);
      setUser(auth);
    }).catch(() => {
      setUser(null)
      // window.location.href = 'https://localhost:3001/'
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
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/guilds/:owner_id/:index/stats' element={<Stats/>}/>

          <Route path='/404' element={<ErrorNotFound/>}/>
          <Route path='*' element={<ErrorNotFound/>}/>

          {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
