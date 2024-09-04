
import './Stat.module.css';
import React, { createRef, MutableRefObject, RefObject } from "react";
import axios, { AxiosResponse } from "axios";
import EditIcon from '@mui/icons-material/Edit';

import { useEffect, useState } from "react";
import { UserDb } from "../../../Guild/Guilds";
import { useNotification } from "../../../Notification/Notification";

class StatProps {
    public title: string | undefined;
    public amount: number | undefined;  
    public user: UserDb | undefined;  
    public setUser: any;
}

const Stat = (props: StatProps) => {
    const { addNotification } = useNotification();

    const editClick = () => {
        addNotification('Updated in database successfully', '#f77800')
        axios.put(`${process.env.REACT_APP_API_URL}/user/${props.user?.discordId}/`, props.user, {withCredentials:true}).then((res: AxiosResponse) => {
           
        }).catch(err => console.error(err))
    };

    return (
        <div  style={{ display:'flex', gap: '70px', alignItems:'center' }}>
            <h1>{props.title}</h1>
            <div style={{display:'flex', alignItems:'center', borderRadius:'5px',padding: '6px'}}>
                <input type='number' style={{
                    fontSize:'18px',
                    width: '60px',
                    backgroundColor: '#2950ff',
                    textAlign:'center',
                    paddingLeft:'10px', paddingRight: '40px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    border: 'none',
                    color: 'white',
                    // WebkitAppearance: 'textfield',
                    borderRadius:'10px'
                }} value={props.amount} onKeyDown={(e) => {
                    if(e.key === 'Enter')
                        editClick();
                }} onChange={(e) => {
                    if(!props.user && props.title && e.target.value)
                        return;
                       
                    var userCopy: UserDb = {...props.user} as UserDb;
                    // if(e.target.value.startsWith('0') && e.target.value.length >1)
                        

                    var cape = props.title!.replace(' ', '');
                    var test = cape.replace(cape.charAt(0), cape.charAt(0).toLowerCase());
                    (userCopy as any)[test] = Number(e.target.value);
                    props.setUser(userCopy);

                }}/>
                <EditIcon onClick={editClick} style={{ cursor:'pointer', display: 'flex', marginLeft:'-30px' }}/>
            </div>
        </div>
    )
}
export default Stat;