import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { UserAuth } from '../../../App';
import GuildLeftPanel from '../GuildLeftPanel';
import { Guild, UserDb } from '../Guilds';
import Pages from '../Pages';
import Search from '../../Search';

export const USERS_PER_PAGE: number = 28;

const ChartStyle: React.CSSProperties = {
    backgroundColor: "orange",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    fontSize: "12px",
    alignItems: "center",
    height: "20px"
}

const Users = () => {
    const { owner_id, index } = useParams();
    const [guild, setGuild] = useState<Guild | undefined>(undefined);
    const [user, setUser] = useState<UserAuth | undefined>(undefined);
    const [users, setUsers] = useState<Array<Array<UserDb>>>([[]]);
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(0);

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
                var users = res.data as Array<UserDb>;
                var newUsers: Array<Array<UserDb>> = [];
                var usersPerPage: Array<UserDb> = [];

                users.forEach((user, index) => {
                    usersPerPage.push(user);

                    if((index+1) % USERS_PER_PAGE === 0)
                    {
                        newUsers.push(usersPerPage);
                        usersPerPage = [];
                    }
                });

                if(usersPerPage.length > 0)
                    newUsers.push(usersPerPage);
                
                setUsers(newUsers);
            }).catch(() => {
                window.location.href = 'https://localhost:3001/404';
            });
        }
    }, [guild]);

    return (
        <div className="Users" style={{
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
                marginLeft: "320px",

                padding: '50px',
            }}>
                {/* Heading Container */}
                <div style={{
                    width: '100%',  
                    marginBottom: '20px', 

                    display: 'flex',
                    // flexDirection: 'flex-start'
                }}>
                    <h1 style={{ margin: 0 }}>Users ({users[page].length})</h1>  
                </div>
                
                {/* Styling for the placeholder color */} 
                <style> 
                {` 
                    ::placeholder { 
                        color: white; 
                    }` 
                }            
                </style> 

                <Search search={search} setSearch={setSearch}/>

                {/* Guild Information Container */}
                {guild && (
                    <div style={{
                        display: 'inline-flex',
                        justifyContent: 'flex-start',
                        // alignSelf: 'flex-start',

                        gap :'20px',
                        flexDirection: 'row',
                        // backgroundColor: 'red',
                        fontSize: '8.5px',
                        // gap: '10px',
                        flexWrap: 'wrap', 
                        width: '100%',
                    }}>
                    {
                    
                    users[page].map((user, index) => {
                        if(user.name?.startsWith(search))
                        {
                            return (
                                <div id="users" style={{
                                    backgroundColor: '#182133',
                                    // flex: '1 0 15px',
                                    borderRadius:'10px',
                                    // width: '100%',
                                    width:"280px",
                                    flexBasis: '280px',
                                    // maxWidth: "255px",
                                    
                                    textAlign:'center',
                                    display:'flex',
                                    alignItems:'center',
                                    // height: "150px",
                                    paddingTop:"10px",
                                    flexDirection:'column'
                                }}>
                                    <img src={user.avatar} style={{
                                        width: '90px',
                                        height: '90px'
                                    }}/>
                                    <h1>{user.name}</h1>
                                </div>
                            )
                        }
                        })
                    }
                    {
                        users.length > 1
                        &&
                        <Pages page={page} setPage={setPage} maxPages={users.length}/>
                    }

                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
