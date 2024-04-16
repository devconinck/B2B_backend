const createServer = require('./createServer');

async function main() {
    try {
        const server = await createServer();
        await server.start();

        async function onClose() {
            await server.stop();
            process.exit(0);
        }
        process.on('SIGINT', onClose); // CTRL+C
        process.on('SIGQUIT', onClose); // Keyboard quit
        process.on('SIGTERM', onClose); // `kill` command
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
}

main();