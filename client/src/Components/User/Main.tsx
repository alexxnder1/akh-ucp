import React, { createRef, MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import { UserDb } from "../Guild/Guilds";
import EditIcon from '@mui/icons-material/Edit';
import axios, { AxiosResponse } from "axios";
import { useNotification } from "../Notification";

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
    public ref:  React.RefObject<HTMLInputElement> | undefined;
}


const Main = (props: Props) => {
    const { addNotification } = useNotification();

    const [user, setUser] = useState<UserDb | null>(null);
    const inputRefs = useRef<React.RefObject<HTMLInputElement>[]>([ React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),]);

    const Stat = (props: StatProps) => {

        // const
        return (
            <div onBlur={() => {props.ref?.current?.focus(); }}  style={{ display:'flex', gap: '60px', alignItems:'center' }}>
                <h1>{props.title}</h1>
                <div onBlur={() => {props.ref?.current?.focus(); }} style={{display:'flex', backgroundColor: '#c28e00', alignItems:'center', borderRadius:'10px',padding: '6px', paddingLeft: "10px", paddingRight: "10px"}}>
                    <input ref={props.ref} type='number' style={{
                        fontSize:'20px',
                        backgroundColor: '#ff8d14',
                        
                        border: 'none',
                        color: 'white',
                        borderRadius:'50px'
                    }} value={props.amount} onChange={(e) => {
                        if(!user && props.title && e.target.value)
                            return;
                           
                        var userCopy: UserDb = {...user} as UserDb;

                        var cape = props.title!.replace(' ', '');
                        var test = cape.replace(cape.charAt(0), cape.charAt(0).toLowerCase());
                        (userCopy as any)[test] = Number(e.target.value);
                        setUser(userCopy);

                    }}/>
                    <EditIcon onClick={() => {
                        // console.log('da');
                        addNotification('Updated in database successfully', '#f77800')
                        axios.put(`https://localhost:3000/user/${user?.discordId}/`, user, {withCredentials:true}).then((res: AxiosResponse) => {
                           
                        }).catch(err => console.error(err))
                    }} style={{ cursor:'pointer', display: 'flex', marginLeft:'20px' }}/>
                </div>
            </div>
        )
    }
    useEffect(() => {
        if(props.user)
            setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        console.log(user);
        if(user !== null)
        {   
        }
    }, [user]);

    return (
        <div id="main" style={{
            display: 'flex',
            gap: '20px',
            flexDirection:'column'
        }}>
            <Stat ref={inputRefs.current.at(0)} title="Coins" amount={user?.coins} />
            <Stat ref={inputRefs.current.at(1)} title="Total Coinflips" amount={user?.totalCoinflips} />
            <Stat ref={inputRefs.current.at(2)} title="Coinflip Wins" amount={user?.coinflipWins} />
            <Stat ref={inputRefs.current.at(3)} title="Coinflip Loss" amount={user?.coinflipLoss} />
            <Stat ref={inputRefs.current.at(4)} title="Win Rate" amount={user?.winRate} />
            <Stat ref={inputRefs.current.at(5)} title="Loss Rate" amount={user?.lossRate} />
            
        </div>
    )
};

export default Main;