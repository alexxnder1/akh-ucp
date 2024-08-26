class Props {
    public page: number = 1;
    public setPage: any;
    public maxPages: number = 0;
}

const Pages = (props: Props) => {
    return (
        <div className='Pages' style={{
            display: 'flex',
            width: '100%',
            textAlign:'center',
            justifyContent:'center',
            fontSize: '20px',
            paddingTop: '30px',
            paddingBottom: '20px',
            // backgroundColor: 'orange'
        }}>
            
            <div style={{
                display:'flex',
                alignItems:'center',
                
                // gap: '10px',
                flexDirection: 'column'
            }}>
                <div style={{ display:'flex', gap: '10px' }}>
                    {
                        Array.from({length: props.maxPages}).map((_, index) => {
                            return(
                                <button key={index} style={{
                                    width: '30px',
                                    border: 'none',
                                    fontSize: '20px',
                                    backgroundColor: props.page === index ? 'grey' : 'white',
                                    cursor: props.page !== index ? 'pointer' : 'auto',
                                    borderRadius: '10px',
                                    // backgroundColor: ''
                                    height: '30px'
                                }}  onClick={() => props.setPage(index)} >
                                    {
                                        index+1
                                    }
                                </button>
                            )
                        })
                    }
                </div>
                <h3 style={{ width: '100%' }}>Page {props.page+1} of {props.maxPages}</h3>
                {/* Page <input value={props.page} onChange={(e) => {
                    if(!(parseInt(e.target.value) < 0 || parseInt(e.target.value) > props.maxPages))
                        props.setPage(parseInt(e.target.value)-1)
                }} type='number' style={{
                    width: '40px',
                    fontSize: "15px",
                    textAlign:'center',
                    marginLeft: '10px',
                    marginRight: '10px'
                }}/> of {props.maxPages} */}
                
            </div>
        </div>
    )    
};

export default Pages;