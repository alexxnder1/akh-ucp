import { useEffect, useState } from "react";
import { Guild } from "./Guilds";
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DiscordUser from "../DiscordUser";
import { UserAuth } from "../../App";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
class Props {
    public guild: Guild | undefined;
    public id: number = -1;
    public user: UserAuth | undefined;
}

class Option {
    public name: string;
    public icon: any;
    public color: string;
    constructor (name: string, icon: any, color: string) {
        this.name = name;
        this.icon = icon;
        this.color=color;
    }
}

const GuildLeftPanel = (props: Props) => {
    const [options, setOptions] = useState<Array<Option>>([
        new Option('Overview', <BarChartIcon/>, '#00858c'),
        new Option('Users', <PeopleAltIcon/>, '#009c34'),
        new Option('Logs', <StickyNote2Icon/>, '#75006d')

    ]);
    const [optionHover, setOptionHover] = useState<number>(-1);
    return (
        <div className="GuildInfo" style={{
            backgroundColor: '#212121',
            // opacity: 0.9,
            display: 'flex',
            position: 'fixed',
            color: 'white',
            flexDirection:"column",
            paddingLeft: "5px",
            paddingRight: '5px',
            // marginRight:"200px",
            // width: "100",
            height: '200vh',
            
            // position: 'absolute'
        }}>
            <img src={props.guild?.bannerURL} style={{
                width: '300px',
                height: '140px'
            }}/>
            <h1 style={{
                fontSize: "20px"
            }}>{props.guild?.name}</h1>

            
            <ArrowBackIcon onClick={(e) => {
                window.location.href = 'https://localhost:3001/dashboard'
                //   props.setGuild(undefined)
                }} style={{
                  width: "50px",
                  height: "50px",
                  color: 'white',
                  position: 'absolute'
            }}/>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                // width: '100',
                gap: '10px',
                marginTop: "20px",
                // backgroundColor: 'orange',
                // height: '100vh',
                // overflowY: 'auto',
                // objectFit:'cover',
                // marginTop: '50px'
            }}>
                <DiscordUser user={props.user}/>
                {
                    options.map((option: Option, index: number) => {
                        return (
                            <div onClick={() => {
                                // if(optionHover !== index)
                                switch(option.name.toLowerCase())
                                {
                                    case 'overview':
                                        {
                                            window.location.href = `${window.location.origin}/guilds/${props.user?.id}/${props.id}/overview`;
                                            break;
                                        }
                                        
                                    case 'users':
                                        {
                                            window.location.href = `${window.location.origin}/guilds/${props.user?.id}/${props.id}/users`;

                                            break;
                                        }
                                    case 'logs':
                                        {
                                            window.location.href = `${window.location.origin}/guilds/${props.user?.id}/${props.id}/logs`;
                                            break;
                                        }
                                }
                            }} onMouseEnter={() => setOptionHover(index)} onMouseLeave={() => setOptionHover(-1)} style={{
                                // backgroundColor: ''
                                // border: `${option.color} double 1px`,
                                textAlign: 'left',
                                cursor: 'pointer',
                                color :`${optionHover === index ? 'white' : option.color}`,
                                // backgroundColor :`${optionHover !== index ? '' : option.color}`,
                                display: 'flex',
                                alignItems: 'center',
                                // fontFamily: 'Inter',
                                // paddingTop: '5px',
                                // paddingBottom: '5px',
                                gap: '10px',
                                fontSize: '10px',
                                paddingLeft: "20px"
                            }}>
                                {option.icon}
                                <h1>{option.name}</h1>
                            </div>
                        )
                    })  
                }
            </div>
        </div>
    )
};

export default GuildLeftPanel;