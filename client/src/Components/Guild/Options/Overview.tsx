import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { UserAuth } from '../../../App';
import GuildLeftPanel from '../GuildLeftPanel';
import { Guild, UserDb } from '../Guilds';

const ChartStyle: React.CSSProperties = {
    backgroundColor: "orange",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    fontSize: "12px",
    alignItems: "center",
    height: "20px"
}

const Overview = () => {
    const { owner_id, index } = useParams();
    const [guild, setGuild] = useState<Guild | undefined>(undefined);
    const [user, setUser] = useState<UserAuth | undefined>(undefined);
    const [users, setUsers] = useState<Array<UserDb>>([]);

    useEffect(() => {
        axios.get('https://localhost:3000/api/user', { withCredentials: true }).then((res: AxiosResponse) => {
            setUser(res.data as UserAuth);
        }).catch(() => {
            window.location.href = 'https://localhost:3001/404';
        });
    }, []);

    useEffect(() => {
        if (user !== undefined && owner_id !== undefined && index !== undefined) {
            axios.get(`https://localhost:3000/guilds/${owner_id}`).then((res: AxiosResponse) => {
                if (owner_id !== user.id) throw new Error('Not found');
                
                const guilds = res.data as Array<Guild>;
                if (parseInt(index) >= 0 && parseInt(index) < guilds.length) {
                    setGuild(guilds[parseInt(index)]);
                } else {
                    throw new Error('Not found');
                }
            }).catch(() => {
                window.location.href = 'https://localhost:3001/404';
            });
        }
    }, [user, owner_id, index]);

    useEffect(() => {
        if (guild !== undefined) {
            axios.get(`https://localhost:3000/users/${guild.guildId}`).then((res: AxiosResponse) => {
                setUsers(res.data as Array<UserDb>);
            }).catch(() => {
                window.location.href = 'https://localhost:3001/404';
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
            <GuildLeftPanel guild={guild} user={user} />
            <div style={{
                flex: 1, 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: "300px",

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

                {/* Guild Information Container */}
                {guild && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '40px',  
                        flexWrap: 'wrap', 
                        width: '100%'
                    }}>
                        <div style={{ fontSize: "10px", textAlign: "left" }}>
                            <h1>Guild Members</h1>
                            <div id="users" style={{ ...ChartStyle, backgroundColor: 'orange' }}>
                                <PeopleIcon style={{ width: "30px", height: "30px", marginRight: "10px" }} />
                                <h1>{users.length}</h1>
                            </div>
                        </div>
                        <div style={{ fontSize: "10px", textAlign: "left" }}>
                            <h1>Join Date</h1>
                            <div id="users" style={{ ...ChartStyle, backgroundColor: 'brown' }}>
                                <PeopleIcon style={{ width: "30px", height: "30px", marginRight: "10px" }} />
                                <h1>{guild?.joinDate}</h1>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Overview;
