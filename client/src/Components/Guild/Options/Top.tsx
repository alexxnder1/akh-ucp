import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { UserAuth } from '../../../App';
import GuildLeftPanel from '../GuildLeftPanel';
import { Guild, UserDb } from '../Guilds';

const Top = () => {
    const { index } = useParams();

    const [guild, setGuild] = useState<Guild | null>();
    const [user, setUser] = useState<UserAuth | null>();
    // const [auth, setAuth ] = useState<user

    useEffect(() => {
        axios.get('https://localhost:3000/api/user', { withCredentials: true }).then((res: AxiosResponse) => {
            setUser(res.data as UserAuth);
        }).catch(err => {
            setUser(null);
            console.error(err)
        });
    }, []);

    useEffect(() => {
        if(!index)
            alert('no param');

        if(user !== null) {
            console.log(user);
            axios.get(`https://localhost:3000/guilds/${user!.id}`, { withCredentials: true }).then((res:AxiosResponse) => {
                setGuild(res.data as Guild);
            }).catch(err => {
                console.error(err);
                setGuild(null);
            });
        }
        else window.location.href = 'https://localhost:3001/404';
    }, [user]);

    return (
        <div className="Top" style={{}}>
            <GuildLeftPanel guild={undefined} id={0} user={undefined}/>
        </div>
    );
};

export default Top;
