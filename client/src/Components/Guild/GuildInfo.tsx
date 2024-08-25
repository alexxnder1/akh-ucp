// import { Guild, UserDb } from "../../App";
import PeopleIcon from '@mui/icons-material/People';
import { Guild, UserDb } from './GuildBar';
import { useEffect } from 'react';
class Props {
    public guild: Guild | undefined;
    public users: Array<UserDb> | undefined;
}

const ChartStyle: React.CSSProperties = {
    backgroundColor: "orange",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    fontSize: "12px",
    // width:"auto",
    // textAlign:'center',
    alignItems:"center",
    height: "20px"
}

const GuildInfo = (props: Props) => {

    useEffect(() => {
        console.log('guild: ' + props.guild)
    }, []);
    return (
        <div className="GuildInfo" style={{
            color: 'white',
            display: 'flex',
            marginLeft: '50px',
            marginTop: "80px",
            // backgroundColor: "orange",
            flexDirection:"column",
            alignItems:'flex-start',
            // justifyContent:"flex"
            width: "100%",
        }}>
            <h1>{props.guild === null ? 'Loading..' : props.guild?.name}</h1>
            {/* {
                
            } */}
            {
                props.guild &&
                <div style={{
                    display: "inline-flex", // Ensures the div is inline with other elements
                    flexDirection: "row",  // Arranges children horizontally
                    alignItems: 'center',  // Centers items vertically
                    gap: '150px',            // Spacing between children
                    flexWrap: 'wrap',       // Allows wrapping if necessary
                    
                }}>

                    <div style={{ fontSize: "10px", textAlign:"left" }}>
                        <h1>Guild Members</h1>
                        <div id="users" style={{...ChartStyle, backgroundColor: 'orange'}}>
                            <PeopleIcon style={{ width:"30px", height: "30px", marginRight: "10px"}}/>
                            
                            <h1>{props.users?.length === 0 ? 'Loading...' : props.users?.filter(u => u.guildId === props.guild?.guildId).length}</h1>
                        </div>
                    </div>
                    <div style={{ fontSize: "10px", textAlign:"left" }}>
                        <h1>Join Date</h1>
                        <div id="users" style={{...ChartStyle, backgroundColor: 'brown'}}>
                            <PeopleIcon style={{ width:"30px", height: "30px", marginRight: "10px"}}/>
                            <h1>{props.guild?.joinDate}</h1>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    );
};

export default GuildInfo;