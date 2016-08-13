loopback      = require \loopback
loopback-boot = require \loopback-boot

loopback-application = loopback!

console.log \loopback-application, loopback-application

loopback-boot loopback-application

module.exports = global.loopback-application = loopback-application
