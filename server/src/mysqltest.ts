import express from 'express';
import mysql from 'mysql';

// DB create conenction
const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: '13-AxcubheA-13',
    database: 'nodemysql'
});

// connect
db.connect((err) => {
    if (err) {
        console.error("An error has occurred...")
        throw err;
    }

    console.log('MySQL connected')
})

const app = express();

app.listen('3000', () => {
    console.log('server started on port 3000')
});

