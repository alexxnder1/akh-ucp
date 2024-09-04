import { useState } from "react";
import { UserAuth } from "../App";

class Props {
    public user: UserAuth | undefined;
}

const DiscordUser = (props: Props) => {
    const [hover, setHover] = useState<boolean>(false);
    const [hoverButton, setHoverButton] = useState<boolean>(false);

    if(props.user === undefined)
        return <></>;

    return (
        <div id="discord-user" style={{
            // backgroundColor: 'orange',
            position: 'fixed',
            bottom: 0,
            right: 0,
            fontSize: "10px",
            color:'white',
        }}>
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
                    top: '50%',
                    
                    margin: 0,
                    transform: 'translate(-50%, -50%)', // Offset by 50% of its own size
                 
                    color: hoverButton ? 'white' : 'black',
                    border: "none",
                    backgroundColor: hoverButton ? 'red' : 'white',
                    fontFamily: "Inter",
                    fontSize: "15px",
                    
                }} onClick={(e) => {
                    window.location.href = `${process.env.REACT_APP_API_URL}/logout`;
                }}>Logout</button>
                 }
 
        </div>
    )
};

export default DiscordUser;