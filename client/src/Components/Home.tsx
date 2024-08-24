import { useState } from "react";

const Home = () => {
    const [loginHover, setLoginHover] = useState<boolean>(false); 

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
  
        <button onMouseEnter={() => setLoginHover(true)} onMouseLeave={() => setLoginHover(false)} style={{ 
              border: 'none',
              fontSize: "20px",
              padding: "10px",
              paddingLeft: '10px',
              paddingRight: '10px',
              borderRadius: '10px',
              backgroundColor: loginHover ? 'green' : 'white',
              color: loginHover ? 'white' : 'green',
              fontFamily: ''
            }}onClick={(e) => {
              window.location.href = 'https://localhost:3000/auth/discord';
            }}>Login</button>
        </div>
    )
};

export default Home;