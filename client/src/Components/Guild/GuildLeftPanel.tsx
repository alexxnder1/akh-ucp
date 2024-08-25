import { useEffect } from "react";
import { Guild, UserDb } from "./GuildBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Options from "./Options";
// import { Options } from "./Options";

class Props {
    public guild: Guild | undefined;
    public users: Array<UserDb> | undefined;
    public setGuild: any;
}

const GuildLeftPanel = (props: Props) => {
    useEffect(() => {
        console.log(props.guild);
    }, []);
    return (
        <div className="GuildLeftPanel" style={{
            // backgroundColor: 'blue',
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
                  props.setGuild(undefined)
                }} style={{
                  width: "50px",
                  height: "50px",
                  color: 'white',
                  position: 'absolute'
            }}/>

            <Options/>
        </div>
    )
};

export default GuildLeftPanel;