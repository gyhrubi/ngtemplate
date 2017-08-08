var cf = cf || {};

/* WEBAPI */
cf.config = {
    webapi: {},
};

cf.config.webapi.version = '1.0';

/* DEV konfiguráció  */
cf.config.webapi.home = {};
cf.config.webapi.home.url = 'http://192.168.0.15:7100/api';
cf.config.webapi.home.error = 'ERROR';


///* DEV konfiguráció  */
//cf.config.webapi.dev = {};
//cf.config.webapi.dev.url = 'http://127.0.0.1:7100/api';
//cf.config.webapi.dev.error = 'ERROR';
/* DEV konfiguráció  */

cf.config.webapi.dev = {};
cf.config.webapi.dev.url = 'http://10.0.0.116:9192/api';
cf.config.webapi.dev.error = 'ERROR';


/* TEST konfiguráció */
cf.config.webapi.papst = {};
cf.config.webapi.papst.url = 'http://172.25.30.106:7100/api';
cf.config.webapi.papst.error = 'ERROR';


/* PROD konfiguráció */
cf.config.webapi.prod = {};
cf.config.webapi.prod.url = 'http://10.0.100.138:7102/api';
cf.config.webapi.prod.error = 'ERROR';


/* BACKUP SZERVER konfiguráció */
cf.config.webapi.bak = {};
cf.config.webapi.bak.isAlive = false;

cf.config.webapi.current = 'dev';

/* WEBAPI VÉGE */

/* OPC */

cf.config.opc = {
    server: {
        primary: 'opc.tcp://OROVSLIS1.kibo.turbos.borgwarner.net:49310',
        backup:  'opc.tcp://OROVSLIS2.kibo.turbos.borgwarner.net:49310',
        isBackupAlive: false,
    },
    client: {
        dev:  "http://localhost:3606",
        test: "http://10.213.24.26:3606",
        prod: "http://10.213.24.26:3606",
    }
};
cf.config.opc.server.current = 'backup';
cf.config.opc.client.current = 'dev';