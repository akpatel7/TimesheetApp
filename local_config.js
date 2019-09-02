var config = {
    ip: '172.18.10.145',
    port: '3000'
};


config.restUrl = `http://${ config.ip }:${ 8000 }`;


config.wsUrl = `ws://${ config.ip }:${ 8000 }/ws`;


module.exports = config;
