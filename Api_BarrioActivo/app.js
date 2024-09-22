const express = require('express');
const oracle = require('oracledb');
const cors = require('cors');
const http = require('http');
const { initialize } = require('./common/config/db');

const app = express();
const port = 3000;
const server = http.createServer(app);

const loginroutes = require('./login/route/loginroute');

app.use(express.json());
app.use(cors());



app.use('/api', loginroutes);

initialize().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to initialize database: ' + err.message);
});
