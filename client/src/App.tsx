import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import GuildInfo from './Components/Guild/GuildInfo';
import DiscordUser from './Components/DiscordUser';
import Home from './Components/Home';
import GuildBar, { Guild, UserDb } from './Components/Guild/GuildBar';

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
  const [guilds, setGuilds] = useState<Array<Guild> | null>(null);
  const [guild, setGuild] = useState<number>(-1);
  const [users, setUsers] = useState<Array<UserDb>>([]);

  useEffect(() => {
    axios.get('https://localhost:3000/api/user', { withCredentials: true } ).then((res: AxiosResponse) => {
      // console.log(res.data)
      var auth = new UserAuth(res.data.username, res.data.id, res.data.avatar);
      setUser(auth);
      console.log(user);
    }).catch(() => setUser(null))
  }, []);

  useEffect(() => {
    if(user) {
      axios.get('https://localhost:3000/guilds/' + user?.id).then((res: AxiosResponse) => {
        setGuilds(res.data as unknown as Array<Guild>)
      })
    }
  }, [user]);

  useEffect(() => {
    axios.get('https://localhost:3000/users/' + guilds?.at(guild)?.guildId).then((res: AxiosResponse) => {
      setUsers(res.data as unknown as Array<UserDb>)
      // setGuild(guilds?.at(0));
    });
  }, [guilds])


  return (
    <div className="App" style={{
      display:'flex',
      height:'100vh',
      backgroundColor: user === null ? 'brown' : ''
      // padding: 

    }}>
      {
        user !== null
        ?
        <GuildBar guilds={guilds} setGuild={setGuild} guild={guild}/>
        :  
        <Home/>
      }
      <GuildInfo guild={guilds?.at(guild)} users={users}/> 
      <DiscordUser user={user !== null ? user : undefined}/>
    </div>
  );
}

export default App;
