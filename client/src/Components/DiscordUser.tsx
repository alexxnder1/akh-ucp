import { useState } from "react";
import { UserAuth } from "../App";
import { Blue, BluePrimary } from "./LandingPage/LandingPage";

class Props {
    public user: UserAuth | undefined;
}

const DiscordUser = (props: Props) => {
    const [hover, setHover] = useState<boolean>(false);
    const [hoverButton, setHoverButton] = useState<boolean>(false);

    if(props.user === undefined)
        return <></>;

    return (
        <div id="discord-user" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
            backgroundColor: Blue,
            position: 'fixed',
            top: 5,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            paddingLeft:'10px',
            paddingRight:'10px',
            // borderRadius:'10px',
            gap :'10px',
            flexDirection:'row',
            right: 5,
            fontSize: "12px",
            color:'white',
        }}>
            <img onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} src={`https://cdn.discordapp.com/avatars/${props.user?.id}/${props.user?.avatar}.webp`} style={{
                borderRadius: "5px",
                width: '40px',
                opacity: hover ? 0.5 : 1,
            }}/>
            <h2 style={{ opacity: hoverButton ? 0.6 : 1, pointerEvents:'none'}}>{props.user.username}</h2>
            {
                hover &&
                <button onMouseEnter={() => {setHover(true); setHoverButton(true)}} onMouseLeave={() => {setHover(false) ; setHoverButton(false)}} style={{
                    position: 'absolute',   
                    top: '50%',
                    left: '50%',
                    cursor:'',
                    margin: 0,
                    transform: 'translate(-50%, -50%)', // Offset by 50% of its own size
                 
                    color: hoverButton ? 'white' : 'black',
                    border: "none",
                    backgroundColor: hoverButton ? 'red' : 'white',
                    fontFamily: "Inter",
                    fontSize: "15px",
                    height: '30px'
                    
                }} onClick={(e) => {
                    window.location.href = `${process.env.REACT_APP_API_URL}/logout`;
                }}>Logout</button>
                 }
 
        </div>
    )
};

export default DiscordUser;