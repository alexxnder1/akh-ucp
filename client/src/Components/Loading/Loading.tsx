import AutorenewIcon from '@mui/icons-material/Autorenew';
import './Loading.module.css';
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent:'center',
            alignSelf:'center',
            // backgroundColor:'orange',
            alignItems:'center',
            width: '100%',
            // height: '100vh',
        }}>
            <AutorenewIcon className={styles.loading} style={{
                color: 'white',
                width: '50px',
                height: '50px',
            }}/>
        </div>
    )
};

export default Loading;