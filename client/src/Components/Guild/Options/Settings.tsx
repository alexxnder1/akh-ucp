import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useFetcher, useParams } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { UserAuth } from '../../../App';
import GuildLeftPanel from '../GuildLeftPanel';
import { Guild, UserDb } from '../Guilds';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Settings = () => {
    const { index: id } = useParams();

    const [guild, setGuild] = useState<Guild | undefined>(undefined);
    const [user, setUser] = useState<UserAuth | undefined>(undefined);
    // const [auth, setAuth ] = useState<user

    // safety reasons
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true }).then((res: AxiosResponse) => {
            setUser(res.data as UserAuth);
        }).catch(err => {
            setUser(undefined);
            console.error(err)
            window.location.href = 'process.env.REACT_APP_FRONTEND_URL';
        });

        document.title = 'Settings';
    }, []);

    useEffect(() => {
        if(!id)
            alert('no param');

        if(user !== undefined) {
            console.log(user.id);
            axios.get(`${process.env.REACT_APP_API_URL}/guilds/${user?.id}`, { withCredentials: true }).then((res:AxiosResponse) => {
                setGuild((res.data as Array<Guild>).at(parseInt(id!)));
            }).catch(err => {
                console.error(err);
                setGuild(undefined);
            });
        }
        // else window.location.href = 'process.env.REACT_APP_FRONTEND_URL';
    }, [user]);

    useEffect(() => {
        if(guild !== undefined)
        {
            // axios.get(`${process.env.REACT_APP_API_URL}/guilds/${guild?.guildId}/top`, {withCredentials: true}).then((res: AxiosResponse) => {
            //     // setTop(res.data as Array<UserDb>)s
            // }).catch(err => {
            //     console.error(err)
            // });
        }
        // else window.location.href = 'process.env.REACT_APP_FRONTEND_URL';
        
    }, [guild]);

    return (
        <div className="Settings" style={{width: '100%', display:'flex', color: 'white', flexDirection:'row'}}>
            <GuildLeftPanel id={parseInt(id!)} guild={guild} user={user}/>
            <div style={{ marginLeft:"350px", marginTop:'20px', justifyContent:'flex-start', display:'flex', width:'100%'}}>
                <h1>Settings</h1>        
                
            </div>
        </div>
    );
};

export default Settings;
