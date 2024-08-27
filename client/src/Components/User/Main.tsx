import { UserDb } from "../Guild/Guilds";
import EditIcon from '@mui/icons-material/Edit';

class Props {
    public user: UserDb | undefined;
}
/*
    public coins: number | undefined;
    public totalCoinflips: number | undefined;
    public coinflipWins: number | undefined;
    public coinflipLoss: number | undefined;
    public winRate: number | undefined;
    public lossRate: number | undefined;
    
    public deleteTimestamp: number | undefined;
*/
class StatProps {
    public title: string | undefined;
    public amount: number | undefined;
    // public setAmount: any;
    
}

const Stat = (props: StatProps) => {
    return (
        <div style={{ display:'flex', gap: '60px', alignItems:'center' }}>
            <h1>{props.title}</h1>
            <div style={{display:'flex', backgroundColor: '#c28e00', alignItems:'center', borderRadius:'10px',padding: '6px', paddingLeft: "10px", paddingRight: "10px"}}>
                {/* <input type='number' value={props.amount} onChange={(e) => props.setAmount(e.target.value)}/> */}
                <EditIcon style={{ display:'flex', marginLeft:'20px' }}/>
            </div>
        </div>
    )
}

const Main = (props: Props) => {
    return (
        <div id="main" style={{
            display: 'flex',
            gap: '20px',
            flexDirection:'column'
        }}>
            <Stat title="Coins" amount={props.user?.coins} />
            <Stat title="Total Coinflips" amount={props.user?.totalCoinflips} />
            <Stat title="Coinflip Wins" amount={props.user?.coinflipWins} />
            <Stat title="Coinflip Loss" amount={props.user?.coinflipLoss} />
            <Stat title="Win Rate" amount={props.user?.winRate} />
            <Stat title="Loss Rate" amount={props.user?.lossRate} />
            
        </div>
    )
};

export default Main;