class Props {
    public search: any;
    public setSearch: any;
    public tooltip?: string = '';
    // public 
}
const Search = (props: Props) => {
    return (
        <input title={props.tooltip} id='search' placeholder={'Search'} value={props.search} onChange={e => props.setSearch(e.target.value)} type='search' style={{
            marginBottom:"20px",
            
            backgroundColor: '#0456d9',
            border: 'none',
            opacity: 0.7,
            borderRadius: '5px',
            paddingLeft: '10px',
            color: 'white',
            padding: '10px',                    
            width: '350px',
            height :'50px',
            fontSize: '20px',
            // height: '50px'
        }}/>
    )
}
export default Search;