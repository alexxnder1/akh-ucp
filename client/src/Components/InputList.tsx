import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { useState } from "react";
import { ThemeStyle } from './Theme';

class Props {
    public values: Array<string> = [];
    public onChange: (vla: string) => void = () => {};
}

const InputList = (props: Props) => {
    const [selected, setSelected] = useState<number>(0);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            textAlign: 'start',
            marginLeft: '5px',
            flexDirection: 'column',
            fontSize: '10px',
            width: '200px',
            marginBottom: '15px',
            position: 'relative' 
        }}>
            <div style={{
                backgroundColor: '#0258e0',
                // marginBottom: '-5px',
                paddingLeft: '10px',
                display: 'flex',
                borderRadius: '5px',
                height: '50px',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: '10px',
                cursor: 'pointer' 
            }} onClick={() => {
                setShowMenu(!showMenu)
            }}>
                <h1>{props.values[selected]}</h1>
                <ArrowDropDownCircleIcon style={{ transform: `rotate(${!showMenu ? '0' : '180'}deg)`, transition: 'transform 0.3s', pointerEvents: 'none', width: '35px', height: '35px' }} />
            </div>

            {showMenu && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    position: 'absolute',
                    top: '100%',
                    backgroundColor:ThemeStyle.secondaryColor,
                    paddingTop: '5px',
                    // paddingBottom:'10px',
                    left: '0',
                    zIndex: 10,
                    width: '100%',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
                }}>
                    {props.values.map((v, index) => (
                        <div onClick={() => {
                            setSelected(index);
                            setShowMenu(false);
                            props.onChange(v);
                        }} key={index} style={{
                            backgroundColor: '#003994',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems:'center',
                            height: '20px',
                            // display:'flex',
                            padding: '10px',
                            cursor: 'pointer' 
                        }}>
                            <h1 style={{ margin: 0 }}>{v}</h1>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
};

export default InputList;
