import './LandingPage.module.css';
import styles from './LandingPage.module.css';
import BoltIcon from '@mui/icons-material/Bolt';
import React, { useEffect, useState } from "react";
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import Footer from './Footer';
import Header from './Header';
import axios, { AxiosResponse } from 'axios';
import { UserAuth } from '../../App';

export const DiscordColor = '#7289da';
export const BluePrimary = '#004fc4';
export const Blue = '#142136';

const TextStyle: React.CSSProperties = {
    fontSize: '20px',
    display: 'flex',
    textWrap: 'nowrap',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    textShadow: `#002259 5px 5px`,
};


const TagStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    color: 'rgba(255,255,255, 0.95)',
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '10px',
    backgroundColor: '#7289da',
    marginRight: '10px',
};

interface Option {
    name: string;
    color: string;
}

interface Feature {
    header: string;
    details: string;
    iconURL: string;
}

const LandingPage = () => {
    const [user, setUser] = useState<UserAuth | null>(null);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true } ).then((res: AxiosResponse) => {
            setUser(res.data as UserAuth);
        }).catch((err) => {
            setUser(null);
            // alert(process.env.REACT_APP_FRONTEND_URL);
        //   window.location.href = `${process.env.REACT_APP_FRONTEND_URL}`;
        })
    }, []);

    const features: Array<Feature> = [
        { header: 'Advanced Moderation Tools', details: "Keep your server safe and secure with powerful moderation tools. Automatically detect and handle spam, offensive language, and unwanted behavior with customizable filters and actions. Empower your moderators with easy-to-use commands to warn, mute, ban, or kick users as needed.", iconURL: 'https://i.grootbot.pro/lapi.png' },
        { header: 'Customizable User Roles', details: "Enhance your server's organization by creating and managing custom roles. Assign roles based on user activity, achievements, or participation. With role-based permissions, you can control access to different channels and features, ensuring a tailored experience for every member.", iconURL: 'https://i.grootbot.pro/lapi.png' },
        { header: 'Interactive Games and Activities', details: "Boost engagement with fun and interactive games directly in your Discord server. From trivia quizzes to text-based adventures, your members can enjoy a variety of activities that encourage participation and foster a sense of community.", iconURL: 'https://i.grootbot.pro/lapi.png' },
        { header: 'Music and Media Playback', details: "Bring the party to your server with high-quality music and media playback. Your bot can stream from popular platforms, create playlists, and even support live DJ sessions. Control the music with simple commands and let your members enjoy their favorite tunes together.", iconURL: 'https://i.grootbot.pro/lapi.png' },
        { header: 'Automated Welcome and Farewell Messages', details: "Make a great first impression with personalized welcome messages for new members. Automatically send a friendly greeting, server rules, and useful information as soon as someone joins. When members leave, your bot can also send a customizable farewell message, keeping your community informed.", iconURL: 'https://i.grootbot.pro/lapi.png' },
        { header: 'Custom Commands and Responses', details: "Create a unique server experience with custom commands and automated responses. Whether it's a fun fact, a useful tip, or a link to important resources, your bot can deliver the right information at the right time, all triggered by user-defined commands.", iconURL: 'https://i.grootbot.pro/lapi.png' },
    ];

    useEffect(() => {
        window.document.title = 'Akh - Most Modern Discord Bot';
    }, []);

    return (
        <div className={styles.landingPage} style={{
            backgroundColor: '#142136',
            backgroundRepeat: 'repeat-y',
            // minHeight: '100vh', // Ensures the background covers the full height of the viewport
            width: '100%',
            display: 'flex',
            gap: '200px',
            position: 'absolute',
            paddingTop:'220px',
            
            // background: 'rgb(0,48,82);'
            flex: 1,
            justifyContent: 'space-between',
            color: 'white',
            flexDirection: "column",
        }}>
            <Header user={user!}/>
            <div style={{
                alignItems: "center",
                justifyContent: 'center',
                gap: '120px',
                display: 'flex',
                flexDirection: 'row',
                paddingTop: '50px', // Adjust for spacing as needed
            }}>
                <img src='tablet.png' style={{ width: '500px', height: '450px' }} alt="Tablet" />
                <div style={{ ...TextStyle, marginBottom: '-80px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h1>The most </h1>
                        <h1 style={{ ...TagStyle, boxShadow: `5px 5px 55px ${DiscordColor}`, backgroundColor: DiscordColor }}>powerful <BoltIcon style={{ width: '50px', height: '50px' }} /></h1>
                        <h1>Discord Bot.</h1>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        fontSize: '15px',
                        alignItems: 'center'
                    }}>
                        <h1>Written in</h1>
                        <h1 style={{ ...TagStyle, backgroundColor: BluePrimary, boxShadow: `5px 5px 40px ${BluePrimary}` }}>TypeScript <TypeSpecimenIcon style={{ width: '40px', height: '40px' }} /></h1>
                    </div>
                </div>
            </div>

            {/* Additional content */}

            <div style={{
                // marginTop: '400px',
                flexDirection: 'column',
                display: 'flex',
                gap: '100px',
                justifyContent:'center',
                alignItems:'center',
            }}>
                {
                    features.map((feature, index) => {
                        return (
                            <div style={{ 
                                // backgroundColor:'red',
                                borderRadius:'10px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems:'center',

                                // paddingRight: '150px',
                                width:'80vw',
                                textAlign: 'center',
                                // height: '20%',
                                // fontSize:'50px',
                                justifyContent:'center',
                                // alignContent:'center',
                                // paddingLeft:'100px',
                                paddingTop:'100px',
                                paddingBottom:'100px',
                                // opacity: 0.5,
                                gap: '100px'
                            }}>
                                {
                                    index %2 === 0
                                    &&
                                    <img src={`${feature.iconURL}`}/>
                                }
                                <h1 style={{display:'flex', fontSize:'40px', flexDirection:'column', textAlign:'start', alignItems:'flex-start'}}>{feature.header}<p style={{fontSize:'30px', fontFamily:'Inter',color:'grey'}}>{feature.details}</p></h1>
                            
                                {
                                    index %2 !== 0
                                    &&
                                    <img src={`${feature.iconURL}`}/>
                                }
                            </div>
                        )
                    })
                }
            </div>
           
        </div>
    );
};

export default LandingPage;
