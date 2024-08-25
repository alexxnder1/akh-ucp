import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { INVITE_URL } from "../Home";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GuildLeftPanel from "./GuildLeftPanel";

export class Guild {
    public guildId: string;
    public id: number | undefined;
    public memberJoinChannel: string;
    public name: string | undefined;
    public image: string | undefined;
    public joinDate: string | undefined;
    public bannerURL: string | undefined;
    public memberLeaveChannel: string;
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

const GuildBar = (props: any) => { 
  const [inviteHover, setInviteHover] = useState<boolean>(false);
  const [guildHover, setGuildHover] = useState<number | undefined>(undefined);
  // useEffect(() => {
  //   console.log(props.guilds.at(props.guild))
  // }, [props.guild])
    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: props.guild === undefined ? 'center' : 'flex-start',
            height: "100vh",
            fontSize: "8px",
            paddingRight: props.guild === undefined ? "20px" : 0,
            // width: 'auto+10px',
            width: 'auto',
            // position:'relative',
            gap: "20px",
            textAlign:"center",
            // marginLeft: "20px",
            backgroundColor: "#242424"
            // background: 'rgb(0,0,0)',
          }}>

            {
              props.guilds && props.guild !== undefined
              ?
                <GuildLeftPanel users={props.users} setGuild={props.setGuild} guild={props.guilds.at(props.guild)}/>
              :
              props.guilds?.map((value: Guild, index: number) => {
                return (
                  <div key={index} onMouseEnter={() => setGuildHover(index)} onMouseLeave={() => setGuildHover(-1)} style={{
                    ...GuildStyle,
                    backgroundColor: (guildHover == index ? 'white': ''),
                    // backgroundColor: guildHover === index ? 'white': 'green',
                    color: guildHover === index ? 'green' : 'white'

                  }} onClick={(e) => {
                    props.setGuild(index)
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

export default GuildBar;