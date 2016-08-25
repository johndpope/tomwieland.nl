console.log \loopback-app.ls

loopback      = require \loopback
loopback-boot = require \loopback-boot

loopback-application = loopback!

loopback-boot loopback-application

module.exports = global.loopback-application = loopback-application
