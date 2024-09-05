import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { INVITE_URL } from "../Home";
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import GuildLeftPanel from "./GuildLeftPanel";
import { UserAuth } from "../../App";
import Loading from "../Loading/Loading";
import Search from "../Search";

export class Channel {
  public name: string; 
  public id: string;
  constructor(name: string, id: string) {
      this.name= name;
      this.id = id;
  }
}

export class Guild {
    public guildId: string;
    public id: number | undefined;
    public memberJoinChannel: string;
    public name: string | undefined;
    public image: string | undefined;
    public joinDate: string | undefined;
    public bannerURL: string | undefined;
    public memberLeaveChannel: string;
    public textChannels: Array<Channel> = [];
    public ownerId: string | undefined;
  
    constructor (guildId: string, memberJoinChannel:string, memberLeaveChannel:string) {
      this.guildId = guildId;
      this.memberJoinChannel = memberJoinChannel;
      this.memberLeaveChannel = memberLeaveChannel;
    }
  }
  
  export class UserDb {
    public discordId: string | undefined;
    public name: string | undefined;
    public guildId: string | undefined;
    public avatar: string | undefined;

    // 
    public coins: number | undefined;
    public totalCoinflips: number | undefined;
    public coinflipWins: number | undefined;
    public coinflipLoss: number | undefined;
    public winRate: number | undefined;
    public lossRate: number | undefined;
    
    public deleteTimestamp: number | undefined;
    // public : number | undefined;
  }
const GuildStyle: React.CSSProperties = {
  
  color:"white",
  width: '200px',
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "10px",
  textWrap:'nowrap',
  // textAlign:'left',
  // background: 'rgb(0,133,122);',
  // borderRadius: "20px",
  background: 'rgb(0,133,122); linear-gradient(90deg, rgba(0,133,122,1) 0%, rgba(0,39,51,1) 63%);'
}

class Props {
  public user: UserAuth | undefined;
}

const Guilds = (props: Props) => { 
  const [inviteHover, setInviteHover] = useState<boolean>(false);
  const [guildHover, setGuildHover] = useState<number | undefined>(undefined);
 
  const [guilds, setGuilds] = useState<Array<Guild> | null>(null);
  const [users, setUsers] = useState<Array<UserDb>>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if(props.user !== undefined) {
      axios.get(`${process.env.REACT_APP_API_URL}/guilds/` + props.user.id).then((res: AxiosResponse) => {
        setGuilds(res.data as unknown as Array<Guild>)
      })
    }
    document.title = `Guilds`;

  }, [props.user]);
    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // alignSelf:'center',
            marginTop:'120px',
            fontSize: "8px",
            gap: '60px',
            width: '100%',
            height: '100%',
            textAlign:"center",
          }}>
            <div style={{ width: '100%', color: 'white' }}>
              <h1 style={{ fontSize:'30px'}}>Guilds</h1>
              <h1 style={{ fontSize:'18px'}}>Select the guild you want to configure it</h1>
              <Search style={{ width: '650px' }} search={search} setSearch={setSearch}/>
            </div>
            <div style={{ display: "flex", flexDirection:'row'}}>
              {guilds === null
              ?
              <Loading/>
              :
              guilds?.length > 0
                ? guilds.map((value: Guild, index: number) => {
                  if(value.name?.toLowerCase().startsWith(search.toLowerCase()))
                  return (
                    <div key={index} onMouseEnter={() => setGuildHover(index)} onMouseLeave={() => setGuildHover(-1)} style={{
                      ...GuildStyle,
                      backgroundColor: (guildHover == index ? 'white': ''),
                      
                      color: guildHover === index ? 'green' : 'white'
  
                    }} onClick={(e) => {
                      window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/guilds/${props.user?.id}/${index}/overview`
                      // props.setGuild(index)
                    }}>
                      <img key={index} src={value.image} width={80} height={80} style={{
                        borderRadius: "50px",
                        pointerEvents: 'none'
                      }}></img>
                      <h1 style={{ pointerEvents: 'none' }} key={index}>{value.name}</h1>
                    </div>
                  )
                }) 
                : <h1>No servers.</h1>
              
              }
              
            </div>
        </div> 
    )
};

export default Guilds;