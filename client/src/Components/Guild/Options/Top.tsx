import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useFetcher, useParams } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { UserAuth } from '../../../App';
import GuildLeftPanel from '../GuildLeftPanel';
import { Guild, UserDb } from '../Guilds';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Top = () => {
    const { index: id } = useParams();

    const [guild, setGuild] = useState<Guild | undefined>(undefined);
    const [user, setUser] = useState<UserAuth | undefined>(undefined);
    const [top, setTop] = useState<Array<UserDb>>([]);
    const [hover, setHover] = useState<number>(-1);
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

        document.title = 'Top';
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
            axios.get(`${process.env.REACT_APP_API_URL}/guilds/${guild?.guildId}/top`, {withCredentials: true}).then((res: AxiosResponse) => {
                setTop(res.data as Array<UserDb>)
            }).catch(err => {
                console.error(err)
            });
        }
        // else window.location.href = 'process.env.REACT_APP_FRONTEND_URL';
        
    }, [guild]);

    return (
        <div className="Top" style={{width: '100%', display:'flex', flexDirection:'row'}}>
            <GuildLeftPanel id={parseInt(id!)} guild={guild} user={user}/>
            <div style={{ marginLeft:"300px", justifyContent:'center', display:'flex', width:'100%'}}>
                <div style={{ display: 'flex', flexDirection: 'column', gap:'10px',color: 'white'}}>
                    {top.length>0 && <h1>Top</h1>}
                    { top.length > 0 ?
                        top.map((u: UserDb, index: number) => {
                            return (
                                <div onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(-1)} onClick={() => {
                                    window.location.href = window.location.origin + `/guilds/${user?.id}/${id}/user/${u.discordId}/`
                                }} style={{ 
                                    backgroundColor: hover===index ? 'white': '#18223d', justifyContent:'space-between',
                                    color: index===hover ? '#18223d' : 'white',width:'950px', display: 'flex', 
                                    flexDirection:'row',alignItems:'center', gap: '10px',
                                    padding: '10px',
                                }}>
                                   
                                    <img src={u.avatar} style={{ width: '70px', height: '70px' }}></img>
                                    <h1 style={{ fontSize:'20px' }}>{u.name}</h1>
                                    <h1 style={{ fontSize:'18px' }}>{u.coins} coins</h1>
                                </div>      
                            )
                        })
                        :<h1>No results.</h1>
                    }
                </div>
            </div>
        </div>
    );
};

export default Top;
