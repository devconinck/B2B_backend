import Koa from 'koa';
import config from 'config';

import packageJson from '../../package.json';

const ping = (ctx: Koa.Context) => ({
    pong: true,
    details: {
        'user-agent': ctx.header['user-agent'],
        'request-ip-address': ctx.request.socket.remoteAddress,
    },
});

/**
 * Get the running server's information.
 */
const getVersion = () => ({
    name: packageJson.name,
    version: packageJson.version,
    env: config.get('env'),
});


export default { ping, getVersion };