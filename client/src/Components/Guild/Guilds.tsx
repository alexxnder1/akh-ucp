import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { INVITE_URL } from "../Home";
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import GuildLeftPanel from "./GuildLeftPanel";
import { UserAuth } from "../../App";

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
  }

const GuildStyle:React.CSSProperties = {
  
  color:"white",
  width: '100%',
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

  useEffect(() => {
    if(props.user !== undefined) {
      axios.get('https://localhost:3000/guilds/' + props.user.id).then((res: AxiosResponse) => {
        setGuilds(res.data as unknown as Array<Guild>)
      })
    }
  }, [props.user]);

  // useEffect(() => {
  //   if(guilds)
  //   {
  //     axios.get('https://localhost:3000/users/' + guilds?.at(guild!)?.guildId).then((res: AxiosResponse) => {
  //       setUsers(res.data as unknown as Array<UserDb>)
  //       console.log(res.data);
  //       // setGuild(0);
  //     });
  //   }
  // }, [guilds])

  // useEffect(() => {
  //   console.log(props.guilds.at(props.guild))
  // }, [props.guild])
    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: "100vh",
            fontSize: "8px",
            paddingRight: "20px",
            // width: 'auto+10px',
            width: 'auto',
            // position:'relative',
            gap: "20px",
            textAlign:"center",
            // marginLeft: "20px",
            backgroundColor: "#242424"
            // background: 'rgb(0,0,0)',
          }}>
            {guilds &&
            guilds.map((value: Guild, index: number) => {
              return (
                <div key={index} onMouseEnter={() => setGuildHover(index)} onMouseLeave={() => setGuildHover(-1)} style={{
                  ...GuildStyle,
                  backgroundColor: (guildHover == index ? 'white': ''),
                  // backgroundColor: guildHover === index ? 'white': 'green',
                  color: guildHover === index ? 'green' : 'white'

                }} onClick={(e) => {
                  window.location.href = `https://localhost:3001/guilds/${props.user?.id}/${index}/overview`
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
          }
{/* 
            {
              guilds
              ?
                // <GuildLeftPanel optionHover={props.optionHover} setOptionHover={props.setOptionHover} options={props.options} users={props.users} setGuild={props.setGuild} guild={props.guilds.at(props.guild)}/>
              :
   
            } */}
             {/* <div onMouseEnter={() => setInviteHover(true)} onMouseLeave={() => setInviteHover(false)} key={props.guilds?.length} style={{...GuildStyle, fontSize: "10px", paddingLeft:"10px", backgroundColor: !inviteHover ? "orange" : 'white'}} onClick={(e) => {
                window.open(INVITE_URL);
              }}>
                <AddCircleIcon style={{ color: inviteHover ? 'orange' : 'white', width:"70px", paddingTop: "10px", height: "70px"}}/>
                <h1 style={{
                  color: inviteHover ? 'orange' : 'white'
                }}>invite to server</h1>
              </div> */}
        </div> 
    )
};

export default Guilds;