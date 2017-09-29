const config = require('config'),
    dgram = require('dgram');

const serverConfig = config.get("server"),
    serverDesc = "GreenShop Rfid Server";

const messageHandlers = (msg, rinfo) => {
    serverConfig.handlers
        .filter( handler => handler.enabled )
        .forEach( handler => {
            require(handler.path)(handler, msg, rinfo);
        });
};

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`Server Error : \n${err.stack}`);
    server.close();
});

server.on('message', messageHandlers);

server.on('listening', () => {
    const address = server.address();
    console.log(`${serverDesc} listening ${address.address}:${address.port}`);
});

server.bind(serverConfig.port);