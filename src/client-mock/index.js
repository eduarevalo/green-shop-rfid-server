const config = require('config'),
    dgram = require('dgram');

const clientConfig = config.get("client");

var deviceIds = ["0000001020", "0000002020", "0000002030"];
var tags = [
    "00000A", "00000B", "00000C", "00000D", "00000E", "00000F",
    "00001A", "00001B", "00001C", "00001D", "00001E", "00001F",
    "00002A", "00002B", "00002C", "00002D", "00002E", "00002F",
    "00003A", "00003B", "00003C", "00003D", "00003E", "00003F",
    "00004A", "00004B", "00004C", "00004D", "00004E", "00004F",
    "00005A", "00005B", "00005C", "00005D", "00005E", "00005F",
    "00006A", "00006B", "00006C", "00006D", "00006E", "00006F",
    "00007A", "00007B", "00007C", "00007D", "00007E", "00007F",
    "00008A", "00008B", "00008C", "00008D", "00008E", "00008F",
    "00009A", "00009B", "00009C", "00009D", "00009E", "00009F" ];

deviceIds.forEach( deviceId => {

    var data = [deviceId, Date.now(), tags.join(",")];

    var message = new Buffer(data.join("|"));
    
    const client = dgram.createSocket('udp4');
    client.send(message, 0, message.length, clientConfig.port, clientConfig.host, function(err, bytes) {
        if (err) throw err;
        console.log(`UDP message sent to ${clientConfig.host}:${clientConfig.port}`);
        client.close();
    });
});