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
const reunionesroutes = require('./reuniones/route/reunionroute');
const votacionesroutes = require('./votaciones/route/votacionesroute');
const pandelroutes = require('./panel_de_control/route/pandelroute');
const pagosroutes = require('./pagos/route/pagosroute');
const solicitudes = require('./solicitudes_sedes/route/solicitudroute');

app.use(express.json());
app.use(cors());

app.use('/api', usuarioroutes);
app.use('/api', loginroutes);
app.use('/api', registerroutes);
app.use('/api', creacionjuntaroutes);
app.use('/api', infojuntaroutes);
app.use('/api', reunionesroutes);
app.use('/api', votacionesroutes);
app.use('/api', pandelroutes);
app.use('/api', pagosroutes);
app.use('/api', solicitudes);

initialize().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to initialize database: ' + err.message);
});
