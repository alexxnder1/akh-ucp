import SearchIcon from '@mui/icons-material/Search';

interface Props {
    search: any;
    setSearch: any;
    tooltip?: string;
    style?: any;
    // public 
}
const Search = (props: Props) => {
    return (
        <div>
            <SearchIcon style={{ position: 'absolute',width: '35px', height:'35px', marginTop: '10px', marginLeft:'5px' }}/>
            <input title={props.tooltip} id='search' placeholder={'Search'} value={props.search} onChange={e => props.setSearch(e.target.value)} type='search' style={{
                marginBottom:"20px",
                
                backgroundColor: '#0456d9',
                border: 'none',
                opacity: 0.7,
                borderRadius: '5px',
                padding: '10px',                    
                width: '350px',
                height :'50px',
                fontSize: '20px',
                color: 'white',
                ...props.style,
                paddingLeft: '50px',
            }}/>
        </div>
    )
}
export default Search;