import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Blue, BluePrimary } from "../LandingPage/LandingPage";

const LoadingBar = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    
    const location = useLocation();
    const handleNavigationStart = () => {
        setLoading(true);
        setProgress(35);
    }
    
    const handleNavigationEnd = () => {
        // setProgress(100);
        setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setLoading(false);
            }, 1200);
        }, 500);
    }
      
    useEffect(() => {
        handleNavigationStart();
    }, []);

    useEffect(() => {
        handleNavigationEnd();
    }, [location]);

    if(loading)
        return (
            <div style={{
                width:`${progress}%`,
                boxShadow: progress === 100 ? "5px 5px 40px " + Blue : '',
                height:'5px',
                position:'absolute',
                bottom:0,
                backgroundColor:BluePrimary
            }}/>
        )
    else return <></>;
};

export default LoadingBar;