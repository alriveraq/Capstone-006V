const express = require('express');
const oracle = require('oracledb');
const cors = require('cors');
const http = require('http');
const { initialize } = require('./common/config/db');

const app = express();
const port = 3000;
const server = http.createServer(app);

const loginroutes = require('./login/route/loginroute');
const registerroutes = require('./register/route/registerroute');
const creacionjuntaroutes = require('./creacionjunta/route/creacionjuntaroute');
const infojuntaroutes = require('./infojunta/route/infojuntaroute');
const usuarioroutes = require('./usuario/route/usuarioroute');

app.use(express.json());
app.use(cors());

app.use('/api', usuarioroutes);
app.use('/api', loginroutes);
app.use('/api', registerroutes);
app.use('/api', creacionjuntaroutes);
app.use('/api', infojuntaroutes);

initialize().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to initialize database: ' + err.message);
});
