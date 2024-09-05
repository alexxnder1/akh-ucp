import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import { useEffect, useState } from "react";
import { BluePrimary } from "./LandingPage";
import { UserAuth } from "../../App";
import ProfileCard from "./ProfileCard";
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import LoadingBar from '../LoadingBar/LoadingBar';

const ButtonStyle: React.CSSProperties = { 
    border: 'none',
    fontSize: "20px",
    height: '50px',
    padding: "10px",
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '10px',
    fontFamily: ''
};

interface Props {
    user: UserAuth;
}

const Header = (props: Props) => {
    
    const [inviteHover, setInviteHover] = useState<number>(-1);
    const [profileClick, setProfileClick] = useState<boolean>(false);
    


    return (
        <div className='Header' style={{
            backgroundColor: 'rgba(1, 16, 33, 0.5)',
            // marginTop:'500px',
            display: 'flex',
            position: 'fixed',
            // alignContent:'center',
            
            top :0,
            width:'100%',
            // 
            left: 0,
            // marginBottom: '150px',
            // bottom: 0,
            opacity: 0.9,
            // marginBottom:'100px'
        }}>

            <div style={{
                // marginLeft:'20%',
                justifyContent:'center',
                gap: '700px',
                flex:1,
                color:'white',
                alignItems:'center',
                flexDirection:'row',
                display:'flex',
            }}>
                <div style={{
                    display:'flex',
                    alignItems:'center',
                    gap:'50px'
                }}>
                    <h1 onClick={() => { window.location.href = process.env.REACT_APP_FRONTEND_URL! }} style={{cursor:'pointer'}}>Akh</h1>
                    <KeyboardCommandKeyIcon style={{ cursor:'pointer' }} onClick={() => { window.location.href = `${process.env.REACT_APP_FRONTEND_URL!}/commands` }}/>
                </div>
                {
                    props.user === null
                    ?
                    <button
                    onMouseEnter={() => setInviteHover(1)}
                    onMouseLeave={() => setInviteHover(-1)}
                    style={{
                        ...ButtonStyle,
                        backgroundColor: !(inviteHover === 1) ? BluePrimary : 'white',
                        color: !(inviteHover === 1) ? 'white' : BluePrimary
                    }}
                    onClick={() => {
                        window.location.href = `${process.env.REACT_APP_API_URL}/auth/discord`;
                    }}>
                    Login
                    </button>
                    :
                    <div>
                    <img onClick={() => setProfileClick(!profileClick)} style={{
                        borderRadius:'20px',
                        width:'50px',
                        cursor:'pointer'
                    }} src={`https://cdn.discordapp.com/avatars/${props.user?.id}/${props.user?.avatar}.webp`}/>          

                    { profileClick && <ProfileCard user={props.user}/> }
                    </div>
                }
            </div>
            <LoadingBar/>
        </div>
    )
};

export default Header;