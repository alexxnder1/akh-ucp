import { useEffect, useState } from "react";
import { UserAuth } from "../App";
import axios, { AxiosResponse } from "axios";

export const INVITE_URL: string = 'https://discord.com/oauth2/authorize?client_id=937011056260313099&scope=bot&permissions=1099511627775';


const Home = () => {
  const [loginHover, setLoginHover] = useState<boolean>(false); 
  const [inviteHover, setInviteHover] = useState<boolean>(false); 
  
  useEffect(() => {
    axios.get('https://localhost:3000/api/user', { withCredentials: true } ).then((res: AxiosResponse) => {
      window.location.href = 'https://localhost:3001/dashboard';
            
    }).catch(() => {
      // window.location.href = 'https://localhost:3001/'
    })
  }, []);

    return (
        <div style={{
            textAlign: "center",
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            height: '100vh', // Ensures the div takes the full height of the parent
            position: 'absolute',  // Allows it to be positioned absolutely
          }}>
            <h1 style={{
              color: 'white',
            }}>You must log in.</h1>

        <div>
          <button onMouseEnter={() => setLoginHover(true)} onMouseLeave={() => setLoginHover(false)} style={{ 
                border: 'none',
                fontSize: "20px",
                padding: "10px",
                paddingLeft: '10px',
                paddingRight: '10px',
                marginRight: "10px",
                borderRadius: '10px',
                backgroundColor: loginHover ? 'green' : 'white',
                color: loginHover ? 'white' : 'green',
                fontFamily: ''
              }}onClick={(e) => {
                window.location.href = INVITE_URL;
              }}>Invite to Server</button>
          <button onMouseEnter={() => setInviteHover(true)} onMouseLeave={() => setInviteHover(false)} style={{ 
                border: 'none',
                fontSize: "20px",
                padding: "10px",
                paddingLeft: '10px',
                paddingRight: '10px',
                borderRadius: '10px',
                backgroundColor: inviteHover ? '#0081fa' : 'white',
                color: inviteHover ? 'white' : '#0081fa',
                fontFamily: ''
              }}onClick={(e) => {
                window.location.href = 'https://localhost:3000/auth/discord';
              }}>Login</button>
        </div>
        </div>
    )
};

export default Home;