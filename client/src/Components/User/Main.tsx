import { useEffect, useState } from "react";
import { UserDb } from "../Guild/Guilds";
import Stat from "./Comps/Stat/Stat";

class Props {
    public user: UserDb | undefined;
}

const Main = (props: Props) => {
    const [user, setUser] = useState<UserDb | null>(null);

    useEffect(() => {
        if(props.user)
            setUser(props.user);
    }, [props.user]);
    
    return (
        <div id="main" style={{
            display: 'flex',
            gap: '20px',
            flexDirection:'column'
        }}>
            <Stat user={user!} setUser={setUser} title="Coins" amount={user?.coins} />
            <Stat user={user!} setUser={setUser} title="Total Coinflips" amount={user?.totalCoinflips} />
            <Stat user={user!} setUser={setUser} title="Coinflip Wins" amount={user?.coinflipWins} />
            <Stat user={user!} setUser={setUser} title="Coinflip Loss" amount={user?.coinflipLoss} />
            <Stat user={user!} setUser={setUser} title="Win Rate" amount={user?.winRate} />
            <Stat user={user!} setUser={setUser} title="Loss Rate" amount={user?.lossRate} />
            
        </div>
    )
};

export default Main;