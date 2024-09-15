import PeopleIcon from '@mui/icons-material/People';

import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { UserAuth } from '../../../../App';
import GuildLeftPanel from '../../GuildLeftPanel';
import { Guild, UserDb } from '../../Guilds';
import { GetDateByTimestamp } from '../../../../Utils/Date';
import { Blue, BluePrimary } from '../../../LandingPage/LandingPage';
import { ChartDiv } from './Chart';

interface UserChart {
    players: number;
    date: string;
}

const Overview = () => {
    const { owner_id, index } = useParams();
    const [guild, setGuild] = useState<Guild | undefined>(undefined);
    const [user, setUser] = useState<UserAuth | undefined>(undefined);
    const [users, setUsers] = useState<Array<UserDb>>([]);
    const [data, setData] = useState<Array<UserChart>>([]);

    useEffect(() => {
        document.title = `Overview`;

        axios.get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true }).then((res: AxiosResponse) => {
            setUser(res.data as UserAuth);
        }).catch(() => {
            window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/404`;
        });
    }, []);

    useEffect(() => {
        if (user !== undefined && owner_id !== undefined && index !== undefined) {
            console.log(`${process.env.REACT_APP_API_URL}/guilds/${owner_id}`)
            axios.get(`${process.env.REACT_APP_API_URL}/guilds/${owner_id}`, {withCredentials:true}).then((res: AxiosResponse) => {
                if (owner_id !== user.id) throw new Error('Not found');
                
                const guilds = res.data as Array<Guild>;
                if (parseInt(index) >= 0 && parseInt(index) < guilds.length) {
                    setGuild(guilds[parseInt(index)]);
                } else {
                    throw new Error('Not found');
                }
            }).catch(() => {
                window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/404`;
            });
        }
    }, [user, owner_id, index]);

    useEffect(() => {
        if(guild) {
            axios.get(`${process.env.REACT_APP_API_URL}/guilds/${guild?.guildId}/charts`, { withCredentials: true }).then((res: AxiosResponse) => {
                // console.log(res.data);
                var data: Array<UserChart> = []
                for(let i = 0; i < res.data.length; i++)
                {
                    data.push( { players: JSON.parse(res.data.at(i).names).length, date:GetDateByTimestamp(res.data.at(i).date) })
                    // console.log(res.data.at(i).date);
                }
                setData(data)
    
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [guild]);

    
    useEffect(() => {
        if (guild !== undefined) {
            axios.get(`${process.env.REACT_APP_API_URL}/users/${guild.guildId}`, {withCredentials:true}).then((res: AxiosResponse) => {
                setUsers(res.data as Array<UserDb>);
            }).catch(() => {
                window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/404`;
            });
        }
    }, [guild]);

    return (
        <div className="Stats" style={{
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            // padding: '20px',
            boxSizing: 'border-box' 
        }}>
            <GuildLeftPanel id={parseInt(index!)} guild={guild} user={user} />
            <div style={{
                flex: 1, 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: "350px",
                padding: '50px',
            }}>
                {/* Heading Container */}
                <div style={{
                    width: '100%',  
                    marginBottom: '20px', 
                    display: 'flex',
                    // flexDirection: 'flex-start'
                }}>
                    <h1 style={{ margin: 0 }}>Overview</h1> 
                </div>
                
                <h1 style={{fontSize:'20px', marginTop: '-10px', marginBottom:'30px'}}>Join Date: {guild?.joinDate}</h1> 

                {/* Guild Information Container */}
                {guild && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20px',  
                        flexWrap: 'wrap', 
                        width: '100%'
                    }}>
                        <ChartDiv data={data} keyX={'players'} header={'Members'} icon={<PeopleIcon style={{width: '50px', height: '30px'}}/>} value={`${users.length}`} keyY={'date'}/>
                    </div>
                )}
                
            </div>
        </div>
    );
};


export default Overview;
