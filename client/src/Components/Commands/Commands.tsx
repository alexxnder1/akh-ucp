import { useEffect, useState } from "react";
import { UserAuth } from "../../App";
import axios, { AxiosResponse } from "axios";
import { Blue, BluePrimary } from "../LandingPage/LandingPage";
import { blue, blueGrey } from "@mui/material/colors";
import Header from "../LandingPage/Header";
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import Search from "../Search";

interface Option {
    type: number;
    name: string;
    description: string;
    required?: boolean | true;
}

interface Command {
    name:string;
    description:string;
    options: Array<Option>;
}

export enum ArgumentType {
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER =6,
    CHANNEL =7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11
}

const Commands = () => {
    const [commands, setCommands] = useState<Array<Command>>([]);
    const [user, setUser] = useState<UserAuth | null>(null);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true } ).then((res: AxiosResponse) => {
            setUser(res.data as UserAuth);
        }).catch((err) => {
            setUser(null);
        })
    }, []);

    useEffect(() => {
        if(!user)
            return;
        window.document.title = 'Commands';
        axios.get(`${process.env.REACT_APP_API_URL}/commands`, {withCredentials: true}).then((res: AxiosResponse) => {
            var data: Array<any> = res.data;

            data.forEach(dat => {
                dat.options = JSON.parse(dat.options);
            });


            setCommands(data as Array<Command>);
        }).catch((err) => {
            console.error(err);
        });
    }, [user]);
    return (
        <div className="Commands" style={{
            display:'flex',
            // backgroundColor:'red',
            color:'white',
            // justifyContent:'center',
            gap: '10px',
            marginTop:'80px',
            alignItems:'center',
            

            fontSize:'12px',
            flexDirection:'column',
            // alignItems:'center',
            width: '100%',
            marginLeft:'20px'
        }}>
            <Header user={user!}/>
            <h1>Commands</h1>
            <h1 style={{fontSize:'19px',marginTop:'-15px', marginBottom:'30px'}}>Here are all avalaible commands that bot haves.</h1>
            <Search style={{width:'950px'}} search={search} setSearch={setSearch}/>
            {
                commands.map((cmd, index) => {
                    if(cmd.name.toLowerCase().startsWith(search.toLowerCase()))
                        return (
                            <div key={index} style={{
                                display:'flex',
                                flexDirection:'column',
                                backgroundColor: Blue,
                                padding:'10px',
                                
                                borderRadius:'5px',
                                gap:'1px',
                                width:'950px',
                                // alignSelf:'start'
                                // paddingRight:'50px',
                                                            
                            }}>
                                {/* <KeyboardCommandKeyIcon style={{}}/> */}
                                <div style={{ display:'flex',gap: "10px",alignItems:'center' }}>
                                    <h1>/{cmd.name}</h1>
                                    {
                                        cmd.options.map((option, id) => {
                                            return (
                                                <div key={id} style={{
                                                    backgroundColor:BluePrimary,
                                                    borderRadius:'5px',
                                                    height:'30px',
                                                    padding:'5px',
                                                    gap:'5px',
                                                    display:'flex',
                                                    alignItems:'center'
                                                }}>
                                                    <h1 style={{borderRadius:'5px', backgroundColor: Blue, fontSize:'18px', gap: '20px'}}>{ArgumentType[option.type].toLowerCase()}:</h1>
                                                    <h1>{option.name}</h1>
                                                </div>    
                                            )
                                        })
                                    }
                                </div>
                                <div style={{ marginTop:'-20px', width:'100%', display:'flex'}}>
                                    <h1 style={{ opacity: 0.7, fontSize: '18px' }}>{cmd.description}</h1>
                                </div>
                            </div>
                        )
                    else return <></>;
                })
            }
        </div>
    )
};

export default Commands;