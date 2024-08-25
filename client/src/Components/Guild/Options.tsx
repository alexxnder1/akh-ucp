import BarChartIcon from '@mui/icons-material/BarChart';
import React, { useState } from 'react';

const OptionStyle: React.CSSProperties = {
    // backgroundColor: 'orange',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
    borderColor: '#3473d9',
    color: '#3473d9',
    borderWidth: '2px',
    borderStyle: 'double',
    gap: '20px'
}

class Option {
    public name: string | undefined;
    public icon: any;
    public color: string | undefined;
    constructor( name: string, icon: any, color: string = '#3473d9') {
        this.name= name;
        this.color = color;
        this.icon = icon;
    }
}

const Options = () => {
    const [optionHover, setOptionHover] = useState<number>(-1);
    const [options, setOptions] = useState<Array<Option>>([
        new Option('Stats', <BarChartIcon/>),
        new Option('Stats', <BarChartIcon/>),
        new Option('Stats', <BarChartIcon/>),
        new Option('Stats', <BarChartIcon/>),
        new Option('Stats', <BarChartIcon/>),
        new Option('Stats', <BarChartIcon/>),
        new Option('Stats', <BarChartIcon/>)

    ]);

    return (
        <div className='Options' style={{
            gap: '10px',
            flexDirection: 'column',
            display: 'flex'
        }}>
            {
                options.map((option, index) => {
                    return (
                        <div onMouseEnter={(e) => setOptionHover(index)} onMouseLeave={(e) => setOptionHover(-1)} className="stats" 
                        style={{...OptionStyle,  color: optionHover === index ? option.color : 'white',  backgroundColor: !(optionHover === index) ? option.color : 'white'}}>
                            {option.icon}
                            <h1>{option.name}</h1>
                        </div>
                    )     
                })      
            }
        </div>
    )
};

export default Options;