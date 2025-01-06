import {closeBrowser} from './BrowserManager';

process.on('exit', async () => {
    process.stdout.write('Exiting: close browser...\n');
    await closeBrowser();
})

process.on('SIGINT', async () => {
    process.stdout.write('SIGINT: close browser...\n');
    await closeBrowser();
    process.exit(0);
})
