import { useEffect } from "react";
import { UserAuth } from "../../App";

const Commands = () => {
    useEffect(() => {
        window.document.title = 'Commands';
    }, []);
    return (
        <div className="Commands" style={{
            display:'flex',
        }}>
            <h1>tbc</h1>
        </div>
    )
};

export default Commands;