var config = {
    ip: '127.0.0.1',
    port: '3000'
};


config.restUrl = `http://${ config.ip }:${ 8000 }`;


config.wsUrl = `ws://${ config.ip }:${ 8000 }/ws`;


module.exports = config;
