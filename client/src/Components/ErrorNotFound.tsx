const ErrorNotFound = () => {
    return (
        <div className="ErrorNotFound" style={{
            backgroundColor: 'brown',
            width: '100%',
            color: 'white',
            fontSize: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
        }}>
            <h1>Error 404 <p style={{color: 'grey', fontSize: '20px'}}>not found</p></h1>
        </div>
    )
}

export default ErrorNotFound;