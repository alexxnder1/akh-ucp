import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { UserAuth } from '../../../App';
import GuildLeftPanel from '../GuildLeftPanel';
import { Guild, UserDb } from '../Guilds';
import Pages from '../Pages';
import Search from '../../Search';
import { ThemeStyle } from '../../Theme';

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
    const [id, setId] = useState<number>(-1);

    useEffect(() => {
        document.title = `Users`;
        console.log(`${process.env.REACT_APP_API_URL}/api/user`);
        axios.get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true }).then((res: AxiosResponse) => {
            setUser(res.data as UserAuth);
            console.log(res.data);
        }).catch(() => {
            // window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/404`;
        });
    }, []);

    useEffect(() => {
        if (user !== undefined && owner_id !== undefined && index !== undefined) {
            axios.get(`${process.env.REACT_APP_API_URL}/guilds/${owner_id}`,{ withCredentials: true }).then((res: AxiosResponse) => {
                if (owner_id !== user.id) throw new Error('Not found');
                
                const guilds = res.data as Array<Guild>;
                if (parseInt(index) >= 0 && parseInt(index) < guilds.length) {
                    setGuild(guilds[parseInt(index)]);
                    setId(parseInt(index));
                } else {
                    throw new Error('Not found');
                }
            }).catch(() => {
                // window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/404`;
            });
        }
    }, [user, owner_id, index]);

    useEffect(() => {
        if (guild !== undefined) {
            axios.get(`${process.env.REACT_APP_API_URL}/users/${guild.guildId}`,{ withCredentials: true }).then((res: AxiosResponse) => {
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
                window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/404`;
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
            <GuildLeftPanel id={id} guild={guild} user={user} />
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
                    {
                        users.length > 0
                        &&
                        <h1 style={{ margin: 0 }}>Users ({users.at(page) && users[page].length})</h1>  
                    }
                </div>
                
                {/* Styling for the placeholder color */} 
                <style> 
                {` 
                    ::placeholder { 
                        color: white; 
                    }` 
                }            
                </style> 

                {
                    users.length > 0 
                    &&
                    <Search search={search} setSearch={setSearch}/>
                }

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
                    users.at(page) !== undefined ?
                    users[page].map((userT, index) => {
                        if(userT.name?.startsWith(search))
                        {
                            return (
                                <div id="user" key={index} onClick={() => {
                                    console.log(user);
                                    window.location.href = window.location.origin + `/guilds/${user?.id}/${id}/user/${userT.discordId}/`
                                }} style={{
                                    backgroundColor: ThemeStyle.secondaryColor,
                                    // flex: '1 0 15px',
                                    borderRadius:'10px',
                                    // width: '100%',
                                    width:"280px",
                                    cursor: 'pointer',
                                    flexBasis: '280px',
                                    // maxWidth: "255px",
                                    
                                    textAlign:'center',
                                    display:'flex',
                                    alignItems:'center',
                                    // height: "150px",
                                    paddingTop:"15px",
                                    flexDirection:'column'
                                }}>
                                    <img src={userT.avatar} style={{
                                        width: '90px',
                                        height: '90px'
                                    }}/>
                                    <h1>{userT.name}</h1>
                                </div>
                            )
                        }
                        })
                        :
                        <h1 style={{ fontSize: '35px' }}>No users had been found.</h1>
                    }
                    {
                        users.length > 0
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
