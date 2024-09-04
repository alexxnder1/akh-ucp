import { UserAuth } from "../../App";

interface Props {
    user: UserAuth;
}

const ProfileCard = (props: Props) => {
    return (
        <div className="ProfileCard" style={{
            display:'flex',
            position:'absolute',
            backgroundColor:'rgba(0,0,0,0.5)',
            borderRadius:'5px',
            fontSize:'8px',
            padding:'10px',
            boxShadow: '0px 0px 5px black',
            alignItems:'start',
            flexDirection:'column'
        }}>
            <h1>👋 Hello, {props.user.username}.</h1>
            <h1 style={{ cursor:'pointer' }} onClick={() => {window.location.href = `${process.env.REACT_APP_FRONTEND_URL!}/dashboard`}}>Guilds</h1>
            <h1 style={{ cursor:'pointer', color: 'red' }} onClick={() => {window.location.href = `${process.env.REACT_APP_API_URL!}/logout`}}>Logout</h1>
        </div>
    )
};

export default ProfileCard;