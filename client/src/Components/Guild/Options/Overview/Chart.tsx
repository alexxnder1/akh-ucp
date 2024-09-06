import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { Blue, BluePrimary } from '../../../LandingPage/LandingPage';

const ChartStyle: React.CSSProperties = {
    // backgroundColor: BluePrimary,
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    fontSize: "12px",
    alignItems: "center",
    height: "5px"
}

interface ChartProps {
    data: any;
    keyX: string;
    header: string;
    icon: any;
    value: string;
    keyY: string;
}

export const ChartDiv = (props: ChartProps) => {
    return(
        <div style={{ fontSize: "15px", textAlign: "left", display:'flex',flexDirection:'column', backgroundColor: Blue, padding: '50px', borderRadius:'10px'}}>
          <div id="users" style={{ ...ChartStyle, justifyContent:'space-between', marginBottom:'50px' }}>
                <h1 style={{marginLeft:'-20px'}}>{props.header}</h1>
                <h1 style={{display:'flex', gap:'10px', alignItems:'center'}}>{props.icon}{props.value}</h1>
            </div>
            <LineChart margin={{left: -30}} width={600} height={300} data={props.data}>
                <Line type='monotone' dataKey={props.keyX} stroke="#8884d8" />
                {/* <CartesianGrid stroke="#ccc" /> */}
                <XAxis dataKey={props.keyY} />
                <Tooltip wrapperStyle={{ backgroundColor: '#ccc' }} />
                <YAxis/>
            </LineChart>                 
        </div>
    )
};