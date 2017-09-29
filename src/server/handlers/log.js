module.exports = function(handler, msg, rinfo){
    console.log(`Handler ${handler.name} - Message: ${msg} from ${rinfo.address}:${rinfo.port}`);
}