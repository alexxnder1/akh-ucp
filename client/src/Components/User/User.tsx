import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { UserAuth } from '../../App';
import GuildLeftPanel from '../Guild/GuildLeftPanel';
import { Guild, UserDb } from '../Guild/Guilds';
import Main from './Main';
import { useNotification } from '../Notification/Notification';

export const Buttons: React.CSSProperties = {
    
    fontFamily: "Titillium Web",
    cursor: 'pointer', backgroundColor: '#2950ff', borderRadius: '5px',paddingTop: '10px', paddingBottom:'10px', paddingLeft:'20px', paddingRight:'20px', color:'white', border:'none', fontSize: '20px'
}

export const OPTIONS: Array<string> = ['Coinflip'];

const RenderOption = (props: any) => {
    switch(props.option.toLowerCase()) {
        case 'coinflip':
            return <Main user={props.user}/>

        default: return <></>;
    }
}

const User = () => {
    const { addNotification } = useNotification();

    const { owner_id, index, user_id } = useParams();
    const [guild, setGuild] = useState<Guild | undefined>(undefined);
    const [auth, setAuth] = useState<UserAuth | undefined>(undefined);
    const [user, setUser] = useState<UserDb | undefined>(undefined);
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [userOption, setUserOption] = useState<number>(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true }).then((res: AxiosResponse) => {
            setAuth(res.data as UserAuth);
        }).catch(() => {
            window.location.href = 'process.env.REACT_APP_FRONTEND_URL';
        });
    }, []);
    
    useEffect(() => {
        if (auth !== undefined && owner_id !== undefined && index !== undefined) {
            axios.get(`${process.env.REACT_APP_API_URL}/guilds/${owner_id}`, {withCredentials:true}).then((res: AxiosResponse) => {
                if (owner_id !== auth.id) throw new Error('Not found');
                
                const guilds = res.data as Array<Guild>;
                if (parseInt(index) >= 0 && parseInt(index) < guilds.length) {
                    
                    console.log(guilds[parseInt(index)]);
                    setGuild(guilds[parseInt(index)]);
                    
                } else {
                    throw new Error('Not found');
                }
            }).catch(() => {
                // window.location.href = 'process.env.REACT_APP_FRONTEND_URL404';
            });
        }
    }, [auth]);
    
    useEffect(() => {
        if (auth !== undefined && guild !== undefined) {
            axios.get(`${process.env.REACT_APP_API_URL}/guilds/${guild.guildId}/user/${user_id}`, {withCredentials:true}).then((res: AxiosResponse) => {
                setUser(res.data as UserDb);
                console.log(res.data)
            }).catch(() => {
                window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/404`;
            });
        }
    }, [guild]);

    if(user === undefined)
        return <>Loading...</>;

    document.title = `${user?.name}'s profile`;

    return (
        <div className="User" style={{
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            transition: 'all 2s',

            // padding: '20px',
            boxSizing: 'border-box' 
        }}>
            <GuildLeftPanel id={parseInt(index!)} guild={guild} user={auth} />
            <div style={{
                flex: 1, 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: "380px",
                justifyContent:'center',

                padding: '50px',
            }}>
                   
                {guild && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems:'center',
                        gap :'110px',
                        height: '100%',
                        flexDirection: 'row',
                        // backgroundColor: 'gray',
                        fontSize: '8.5px',
                        // gap: '10px',
                        // flexWrap: 'wrap', 
                        
                        width: '100%',
                    }}>

                        <div id="" style={{ 
                            alignItems:'center',
                            alignSelf:'center',
                            // width: '100px',
                            display:"flex",     
                            // width: '20px',    
                            justifyContent: 'center',              
                            // backgroundColor: 'orange',
                            height: '100%',
                            flexDirection:'column',
                            // marginTop:'120px',
                            paddingRight:'100px',
                            // textAlign:'center',
                        }}>
                            <img src={user.avatar} style ={{ width: '250px', borderRadius: '150px' }} />
                            {
                                guild.ownerId === user.discordId
                                &&
                                <h1 style={{ fontSize: '30px', backgroundColor: '#e3ae00', borderRadius: '10px', }}>👑 Owner</h1>
                            }
                            {/* {
                                user.deleteTimestamp === null
                                &&
                                <h1 style={{ fontSize: '30px', backgroundColor: '#e3ae00', borderRadius: '10px', }}>👑 Owner</h1>
                            } */}

                            <h1 style={{ fontSize: '30px'}}>{user.name}</h1>
                            <h1 style={{ opacity: 0.5, cursor: 'pointer' }} onClick={() => {
                                navigator.clipboard.writeText(user.discordId!);
                                addNotification('Copied to clipboard', '#32a834')
                            }}>{user.discordId}</h1>

                        </div>
                        
                        <div style={{
                            display:'flex',
                            alignItems:'center',
                            flexWrap:'wrap',
                            marginTop:'50px',
                            marginLeft: "50px",

                            gap: '15px',
                        }}>
                            <div style={{ display:'flex',  width:'100%',  gap: '20px', }}>           
                                {
                                    OPTIONS.map((opt, index) => {
                                        return (
                                            
                                            <button style={{...Buttons, cursor: userOption === index ? '' : 'pointer', opacity: userOption === index ? 0.7 : 1 }} onClick={() => setUserOption(index)}>{opt}</button>
                                        )

                                    })
                                }
                            </div>
                            <hr style={{width: '100%', margin: 0}}/>

                            <div style={{
                                marginTop: '50px'
                            }}>
                                <RenderOption user={user} option={OPTIONS[userOption]}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
