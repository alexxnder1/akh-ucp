// import { Guild, UserDb } from "../../App";
import PeopleIcon from '@mui/icons-material/People';

import { useEffect, useState } from 'react';
import { Guild, UserDb } from '../GuildBar';
import { unstable_useEnhancedEffect, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { UserAuth } from '../../../App';
import GuildInfo from '../GuildInfo';
class Props {
    public guild: Guild | undefined;
    public users: Array<UserDb> | undefined;
}

const ChartStyle: React.CSSProperties = {
    backgroundColor: "orange",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    fontSize: "12px",
    // width:"auto",
    // textAlign:'center',
    alignItems:"center",
    height: "20px"
}

const Stats = () => {
    const { owner_id, index } = useParams()

    const [guild, setGuild] = useState<Guild | undefined>(undefined);
    const [user, setUser] = useState<UserAuth | undefined>(undefined);
    const [users, setUsers] = useState<Array<UserDb>>([]);

    useEffect(() => {
        axios.get('https://localhost:3000/api/user', { withCredentials: true } ).then((res: AxiosResponse) => {
            setUser(res.data as UserAuth)
        }).catch((err) => {
            // setUser
          window.location.href = 'https://localhost:3001/404';
        })
    }, []);

    useEffect(() => {
        console.log(user)
        if(user !== undefined)
        {
            if(owner_id !== undefined && index !== undefined) {        
                axios.get(`https://localhost:3000/guilds/${owner_id}`).then((res: AxiosResponse) => {
                    console.log(owner_id + " " + user.id);
                    if(owner_id !== user.id)
                        throw new Error('Not found');
                    
                    var guilds = (res.data as Array<Guild>);
                    
                    if(!(parseInt(index) < 0 || parseInt(index) >= guilds.length))
                        setGuild(guilds.at(parseInt(index)));   

                    else throw new Error('Not found');

                }).catch((err) => { 
                    window.location.href = 'https://localhost:3001/404';
                })
            }
            
        }
    }, [user]);

    useEffect(() => {
        if(guild !== undefined) {
            axios.get(`https://localhost:3000/users/${guild.guildId}`).then((res: AxiosResponse) => {
                setUsers(res.data as Array<UserDb>)
            }).catch((err) => {
                window.location.href = 'https://localhost:3001/404';
            });
        }
    }, [guild]);

    return (
        <div className="Stats" style={{
            color: 'white',
            display: 'flex',
            // marginLeft: '50px',
            // marginTop: "80px",
            flexDirection:"row",
            alignItems:'flex-start',
            // justifyContent:"flex"
            width: "100%",
            // height: '100%'
        }}>
            <GuildInfo guild={guild} user={user}/>
            {
                guild &&
                <div style={{
                    display: "inline-flex", // Ensures the div is inline with other elements
                    flexDirection: "row",  // Arranges children horizontally
                    alignItems: 'center',  // Centers items vertically
                    gap: '150px',            // Spacing between children
                    flexWrap: 'wrap',       // Allows wrapping if necessary
                    marginLeft: "60px",
                    marginTop: '20px'
                }}>

                    <div style={{ fontSize: "10px", textAlign:"left" }}>
                        <h1>Guild Members</h1>
                        <div id="users" style={{...ChartStyle, backgroundColor: 'orange'}}>
                            <PeopleIcon style={{ width:"30px", height: "30px", marginRight: "10px"}}/>
                            
                            <h1>{users.length}</h1>
                        </div>
                    </div>
                    <div style={{ fontSize: "10px", textAlign:"left" }}>
                        <h1>Join Date</h1>
                        <div id="users" style={{...ChartStyle, backgroundColor: 'brown'}}>
                            <PeopleIcon style={{ width:"30px", height: "30px", marginRight: "10px"}}/>
                            <h1>{guild?.joinDate}</h1>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    );
};

export default Stats;