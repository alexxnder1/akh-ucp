import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { UserAuth } from '../../../App';
import GuildLeftPanel from '../GuildLeftPanel';
import { Channel, Guild, UserDb } from '../Guilds';
import Pages from '../Pages';
import Search from '../../Search';

export class Log {  
    public id: number | undefined;
    public type: string | undefined;
    public content: string | undefined;
    public channelId: string | undefined;
    public guildId: string | undefined;
    public authorId: string | undefined;
}

export const LOGS_PER_PAGE: number = 15;

export const Border: React.CSSProperties = {
    border: '#003994 2px double',
    padding: '10px',
    // width: '100%'
}
export const ContentBorder: React.CSSProperties = {
    border: '#333333 2px double',
    padding: '10px',
    
    // width: '100%'
}

export const TopTable: React.CSSProperties = {
    ...Border,
    backgroundColor: '#003994'
}

const Logs = () => {
    const { owner_id, index } = useParams();
    const [guild, setGuild] = useState<Guild | undefined>(undefined);
    const [guilds, setGuilds] = useState<Array<Guild>>([]);
    const [user, setUser] = useState<UserAuth | undefined>(undefined);
    const [logs, setLogs] = useState<Array<Array<Log>>>([[]]);
    const [authorHover, setAuthorHover] = useState<number>(-1);
    const [textChannelHover, setTextChannelHover] = useState<number>(-1);
    const [page, setPage] = useState<number>(0);
    const [search, setSearch] = useState<string>('');

    const [waitCursor, setWaitCursor] = useState<boolean>(false);

    useEffect(() => {
        axios.get('https://localhost:3000/api/user', { withCredentials: true }).then((res: AxiosResponse) => {
            setUser(res.data as UserAuth);
        }).catch(() => {
            // window.location.href = 'https://localhost:3001/404';
        });
    }, []);

    useEffect(() => {
        if(user === undefined)
            return;

        if(owner_id !== user?.id || index === undefined)
            return;
            
        axios.get(`https://localhost:3000/guilds/${owner_id}`, { withCredentials: true }).then((res: AxiosResponse) => {
            var guilds=(res.data as Array<Guild>);
            // console.log(guilds);
            guilds.forEach(g => {
                g.textChannels = JSON.parse(g.textChannels.toString());
            })
            if(parseInt(index!) >= guilds.length || parseInt(index!) < 0)
                throw new Error('not found');

            setGuild(guilds.at(parseInt(index!)))
            setGuilds(guilds)
        }).catch(() => {
            // window.location.href = 'https://localhost:3001/404';
        });
    }, [user]);

    useEffect(() => {
        if (guild !== undefined) {
            axios.get(`https://localhost:3000/logs/${guild.guildId}`).then((res: AxiosResponse) => {
                var logs = res.data as Array<Log>;
                console.log(guild.guildId);
                var newLogs: Array<Array<Log>> = [];
                var logsPerPage: Array<Log> = [];

                logs.forEach((user, index) => {
                    logsPerPage.push(user);

                    if((index+1) % LOGS_PER_PAGE === 0)
                    {
                        newLogs.push(logsPerPage);
                        logsPerPage = [];
                    }
                });

                if(logsPerPage.length > 0)
                    newLogs.push(logsPerPage);
                
                setLogs(newLogs);

            }).catch(() => {
                // window.location.href = 'https://localhost:3001/404';
            });
        }
        // else window.location.href = 'https://localhost:3001/404';

    }, [guild]);

    // const Category = () => [
    //     return (
    //         <input type='' id="category">

    //         </div>
    //     )
    // ];


    return (
        <div className="Logs" style={{
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            // padding: '20px',
            boxSizing: 'border-box' 
        }}>
            <GuildLeftPanel id={guilds.findIndex(g => g.guildId === guild?.guildId)} guild={guild} user={user} />
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
                    <h1 style={{ margin: 0 }}>Logs</h1>  

                </div>
                    <Search tooltip="Start with '#' to search for log ids." search={search} setSearch={setSearch}/>
                    {/* <Category/> */}

                {/* Guild Information Container */}
                {guild && (
                    <div style={{
                        display: 'inline-flex',
                        justifyContent: 'flex-start',
                        // alignSelf: 'flex-start',

                        gap :'10px',
                        flexDirection: 'row',
                        // backgroundColor: 'red',
                        fontSize: '8.5px',
                        // gap: '10px',
                        flexWrap: 'wrap', 
                        width: '100%',
                    }}>
                    <table style={{
                        color: 'white',
                        // padding: '100px',
                        fontSize: '20px',
                        width:'100%'
                        // border: 'white 1px double'
                    }}>
                        <thead>
                            <tr>
                                <th style={{...TopTable, cursor: 'cell'}} scope='col' onClick={() => {
                                    var logsCopy= [...logs];

                                    (logsCopy[page] as any) = logsCopy.at(page)?.sort((a,b) => (logsCopy[page].at(0)!.id as any) > (logsCopy[page].at(logsCopy[page].length-1)!.id as any) ?  a.id!-b.id! :  b.id!-a.id! );

                                    setLogs(logsCopy)
                                }}>ID</th>
                                <th style={TopTable} scope='col'>Type</th>
                                <th style={TopTable} scope='col'>Channel</th>
                                <th style={TopTable} scope='col'>Author</th>
                                <th style={TopTable} scope='col'>Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                logs.at(page) &&
                                logs[page].map((log, index) => {
                                    if(log.authorId?.startsWith(search) || log.channelId?.startsWith(search), log.content?.startsWith(search) || log.guildId?.startsWith(search) || (search.startsWith('#') && log.id?.toString() === search.split('#')[1]) || log.type?.startsWith(search))
                                        return (
                                        <tr>
                                            <th scope='row' style={ContentBorder}>{log.id}</th>
                                            <td style={ContentBorder}>{log.type}</td>
                                            <td title='Copy ID in clipboard'                                           
                                                style={{...ContentBorder, cursor: waitCursor ? 'wait' : 'pointer',
                                                    backgroundColor: textChannelHover === index ? 'white' : '', 
                                                    color: textChannelHover !== index ? 'white' : 'black'}} 
                                                onMouseEnter={() => setTextChannelHover(index)}
                                                onClick={() => {
                                                    setWaitCursor(true)
                                                    // document.execCommand();
                                                    navigator.clipboard.writeText(log.channelId!)
                                                        .then(() => console.log('Copied in clipboard ' + log.channelId!))
                                                        .catch(() => console.log('Failed to copy in clipboard'))
    
                                                    setTimeout(() => {
                                                        setWaitCursor(false)
                                                    }, 200);
                                                }}
                                                onMouseLeave={() => setTextChannelHover(-1)}
                                            >{guild.textChannels.find(t => t.id === log.channelId)?.name}</td>
                                            <td 
                                                title='Copy ID in clipboard'
                                                style={{...ContentBorder, cursor: waitCursor ? 'wait' : 'pointer',
                                                        backgroundColor: authorHover === index ? 'white' : '', 
                                                        color: authorHover !== index ? 'white' : 'black'}} 
                                                onMouseEnter={() => setAuthorHover(index)}
                                                onClick={() => {
                                                    setWaitCursor(true)
                                                    // document.execCommand();
                                                    navigator.clipboard.writeText(log.authorId!)
                                                        .then(() => console.log('Copied in clipboard ' + log.authorId!))
                                                        .catch(() => console.log('Failed to copy in clipboard'))

                                                    setTimeout(() => {
                                                        setWaitCursor(false)
                                                    }, 200);
                                                }}
                                                onMouseLeave={() => setAuthorHover(-1)}
                                            >{log.authorId != '' ? log.authorId : 'Not an user'}</td>
                                            <td style={ContentBorder}>{log.content}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div style={{
                        display: 'flex',
                        width:'100%',
                        justifyContent:'center'
                    }}>
                        {
                            !(logs.at(page)) &&
                            <h1>No results</h1>
                        }
                    </div>
                    {
                        logs.length > 1
                        &&
                        <Pages page={page} setPage={setPage} maxPages={logs.length}/>
                    }

                    </div>
                )}
            </div>
        </div>
    );
};

export default Logs;
