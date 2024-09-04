import './Notification.module.css';
import styles from './Notification.module.css'; // Import the CSS module

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

interface Notification {
    id: number;
    content: string;
    color: string;
}

interface NotificationContextType {
    addNotification: (content: string, color: string) => void;
}

const defaultContextValue: NotificationContextType = {
    addNotification: () => {}
}

const NotificationContext = createContext<NotificationContextType>(defaultContextValue);

export const NotificationProvider:  React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const timersRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

    const addNotification =(content: string, color: string) => {
        const id = new Date().getTime();
        setNotifications((prev) => [
            ...prev,
            {id, content, color}
        ])

        var audio = new Audio('/notif.mp3');
        audio.play();

        if(timersRef.current.has(id))
            clearTimeout(timersRef.current.get(id))

        var timeout = setTimeout(() => {
            removeNotification(id);
        }, 2000)
        timersRef.current.set(id, timeout);

    };

    useEffect(() => {
        return () => {
            timersRef.current.forEach((timer) => clearTimeout(timer));
        };
    }, []);

    const removeNotification = (id: number) => {
        setNotifications((prev) => prev.filter(n => n.id !== id));
        if(timersRef.current.has(id))
        {
            clearTimeout(timersRef.current.get(id))
            timersRef.current.delete(id);
        }

    }
    
    return (
        <NotificationContext.Provider value={{addNotification}}>
            <div id="notification-container" style={{
                display:'flex',
                flexDirection: 'column',

                position: 'fixed',
                // textAlign:'center',
                // width: '80%',
                marginTop:'20px',
                // : '300px',
                right: '50%',
                left: '50%',
                fontSize :'9px',
                gap: '10px',
                width: '300px',
                // backgroundColor: 'red',
                zIndex: 1000,
                color: 'white',
            }}>
                {
                    notifications.map((notif, index) => {
                        return (
                            <div className={styles.notification}
                            key={index} style={{
                                backgroundColor: `${notif.color}`,
                                borderRadius: '10px',
                                // animat
                                // maxWidth:'80%',
                                width: '100%',
                                boxShadow: 'black 2px 2px 2px',
                                // display:
                                position: 'relative',
                                opacity: 1/Math.log(index+2),
                                // left: '50%',
                                // right: '50%',
                                // fontSize: "10px",
                                textAlign:'center',
                                
                                
                                color: 'white'
                            }}>
                                <h1>{notif.content}</h1>
                            </div>
                        )
                    })
                }
                {/* <h1>{}</h1> */}
            </div>
            {children}
        </NotificationContext.Provider>
    )
};  

// Custom hook to use the notification context
export const useNotification = () => {
    return useContext(NotificationContext);
};
