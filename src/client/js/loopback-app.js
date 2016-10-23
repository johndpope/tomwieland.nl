import loopback from 'loopback'
import loopbackBoot from 'loopback-boot'

const loopbackApplication = loopback()

loopbackBoot(loopbackApplication)

// TODO: Remove?
global.loopbackApplication = loopbackApplication

export default loopbackApplication
