import React, { useEffect, useState } from "react";
import { UserAuth } from "../App";
import axios, { AxiosResponse } from "axios";
import DiscordUser from "./DiscordUser";
import GuildBar from "./Guild/GuildBar";

class Props {
    public user: UserAuth | undefined;
}

const Dashboard = (props: any)  => {
    const [user, setUser] = useState<UserAuth | null>(null);
    useEffect(() => {
        axios.get('https://localhost:3000/api/user', { withCredentials: true } ).then((res: AxiosResponse) => {
            setUser(res.data as UserAuth);
        }).catch((err) => {
            console.log(err);
            setUser(null);
            console.log('da');
          window.location.href = 'https://localhost:3001/';
        })
    }, []);

    if(user === null)
        return <></>;

    return (
        <div className='Dashboard' style={{
            display: 'flex',
            width: '100%',
            // backgroundColor:'red',
            position: 'relative'
        }}>
            <GuildBar user={user}/> 
      {/* <OptionsContent options={options} optionHover={optionHover}/> */}

            <DiscordUser user={user}/>
        </div>
    )
}

export default Dashboard;