import { useEffect, useState } from "react";
import { Guild } from "./GuildBar";
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DiscordUser from "../DiscordUser";
import { UserAuth } from "../../App";
class Props {
    public guild: Guild | undefined;
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

const GuildInfo = (props: Props) => {
    const [options, setOptions] = useState<Array<Option>>([
        new Option('Stats', <BarChartIcon/>, '#00858c')
    ]);
    const [optionHover, setOptionHover] = useState<number>(-1);
    return (
        <div className="GuildInfo" style={{
            backgroundColor: '#212121',
            // opacity: 0.9,
            display: 'flex',
            color: 'white',
            flexDirection:"column",
            paddingLeft: "5px",
            // width: "100",
            height: '100%',
            
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
                flexDirection: 'column'
                // width: '100',
                // backgroundColor: 'orange',
                // height: '100'
                // marginTop: '50px'
            }}>
                {
                    options.map((option: Option, index: number) => {
                        return (
                            <div onClick={() => {
                                if(optionHover !== index)
                                    window.location.href = window.location.pathname.split('/')[0] + option.name.toLowerCase()
                            }} onMouseEnter={() => setOptionHover(index)} onMouseLeave={() => setOptionHover(-1)} style={{
                                // backgroundColor: ''
                                border: `${option.color} double 1px`,
                                textAlign: 'left',
                                color :`${optionHover === index ? 'white' : option.color}`,
                                backgroundColor :`${optionHover !== index ? '' : option.color}`,
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
                <DiscordUser user={props.user}/>
            </div>
        </div>
    )
};

export default GuildInfo;