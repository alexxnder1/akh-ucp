import mysql from 'mysql';

var database = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '', 
    database: 'akh' 
})

export function Connect() {
    database.connect((err) => {
        if(err)
        {
            console.error('Error connecting to the database.', err);
            return;
        }

        console.log('Connected to MySQL database.');
    })
}
export default database;