import React, { useEffect, useState } from "react";
import { UserAuth } from "../App";
import axios, { AxiosResponse } from "axios";
import DiscordUser from "./DiscordUser";
import Guilds from "./Guild/Guilds";
import Header from "./LandingPage/Header";

class Props {
    public user: UserAuth | undefined;
}

const Dashboard = (props: any)  => {
    const [user, setUser] = useState<UserAuth | null>(null);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true } ).then((res: AxiosResponse) => {
            setUser(res.data as UserAuth);
        }).catch((err) => {
            setUser(null);
            alert(process.env.REACT_APP_FRONTEND_URL);
          window.location.href = `${process.env.REACT_APP_FRONTEND_URL}`;
        })
    }, []);

    if(user === null)
        return <></>;

    return (
        <div className='Dashboard' style={{
            // display: 'flex',
            width: '100%',
            // position: 'relative'
        }}>
            <Header user={user}/>
            <div style={{
                display:'flex',
                justifyContent: 'center',
                alignContent:'center',
                // alignSelf:'center'
            }}>
                <Guilds user={user}/> 
            </div>
            {/* <DiscordUser user={user}/> */}
        </div>
    )
}

export default Dashboard;