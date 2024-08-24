import { useState } from "react";
import { UserAuth } from "../App";

class Props {
    public user: UserAuth | undefined;
}

const DiscordUser = (props: Props) => {
    const [hover, setHover] = useState<boolean>(false);
    const [hoverButton, setHoverButton] = useState<boolean>(false);

    return (
        <div id="discord-user" style={{
            // backgroundColor: 'orange',
            display: 'flex',
            fontSize: "10px",
            alignItems:'flex-end',
            color:'white',
            justifyContent:'flex-end',
            // backgroundColor: "orange",
            alignSelf: 'flex-end',
            position: 'relative',
            flexDirection:"column",
            paddingRight: "15px",
            width: "100%",
        }}>
            {
                props.user 
                ?
                <>
                    <h1 style={{
                        opacity: 0.5
                    }}>Logged in as: </h1>
                    <img onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} src={`https://cdn.discordapp.com/avatars/${props.user?.id}/${props.user?.avatar}.webp`} style={{
                        borderRadius: "100px",
                        width: '80px',
                        opacity: hover ? 0.5 : 1,
                    }}/>
                    <h2>{props.user.username}</h2>
                    {
                        hover &&
                        <button onMouseEnter={() => {setHover(true); setHoverButton(true)}} onMouseLeave={() => {setHover(false) ; setHoverButton(false)}} style={{
                            position: 'absolute',   
                            top: '52%', // Center vertically
                            right:"-1%",
                            margin: 0,
                            transform: 'translate(-50%, -50%)', // Offset by 50% of its own size
                         
                            color: hoverButton ? 'white' : 'black',
                            border: "none",
                            backgroundColor: hoverButton ? 'red' : 'white',
                            fontFamily: "Inter",
                            fontSize: "15px",
                            
                            // transform: 'translate(-50%,50%)'
                        }} onClick={(e) => {
                            window.location.href = 'https://localhost:3000/logout';
                        }}>Logout</button>
                    }
                </>

                : <h1>Loading...</h1>
            }
        </div>
    )
};

export default DiscordUser;