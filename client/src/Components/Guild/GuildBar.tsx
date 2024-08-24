import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export class Guild {
    public guildId: string;
    public id: number | undefined;
    public memberJoinChannel: string;
    public name: string | undefined;
    public image: string | undefined;
    public joinDate: string | undefined;
    public memberLeaveChannel: string;
  
    constructor (guildId: string, memberJoinChannel:string, memberLeaveChannel:string) {
      this.guildId = guildId;
      this.memberJoinChannel = memberJoinChannel;
      this.memberLeaveChannel = memberLeaveChannel;
    }
  }
  
  export class UserDb {
    public name: string | undefined;
    public guildId: string | undefined;
    public avatar: string | undefined;
  }

const GuildBar = (props: any) => { 
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
            // textAlign:"center",
            // marginLeft: "20px",
            backgroundColor: "#242424"
            // background: 'rgb(0,0,0)',
          }}>

            {
              props.guilds?.map((value: Guild, index: number) => {
                return (
                  <div key={index} style={{
                    // backgroundColor: "red",
                    color:"white",
                    width: '100%',
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    paddingTop: "10px",
                    textWrap:'nowrap',
                    // textAlign:'left',
                    backgroundColor: props.guilds?.at(props.guild)?.guildId === value.guildId ? '#2a6100' : '',
                    // background: 'rgb(0,133,122);',
                    // borderRadius: "20px",
                    background: 'rgb(0,133,122); linear-gradient(90deg, rgba(0,133,122,1) 0%, rgba(0,39,51,1) 63%);'
                  }} onClick={(e) => {
                    props.setGuild(index)
                  }}>
                    <img key={index} src={value.image} width={80} height={80} style={{
                      borderRadius: "50px",
                    }}></img>
                    <h1 key={index}>{value.name}</h1>
                  </div>
                )
              })    
            }
        </div> 
    )
};

export default GuildBar;