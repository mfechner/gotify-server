import puppeteer, {Browser} from 'puppeteer';

declare global {
    var __browser: Browser | null;
}

globalThis.__browser = null;

export async function getBrowser(): Promise<Browser> {
    if (!globalThis.__browser) {
        process.stdout.write("### Launch new Puppeteer Browser...\n");
        globalThis.__browser = await puppeteer.launch({
            headless: process.env.CI === 'true',
            args: [`--window-size=1920,1080`, '--no-sandbox'],
            devtools: true,
        });
    } else {
        process.stdout.write("### Reuse existing browser...\n");
    }
    return globalThis.__browser;
}

export async function closeBrowser(): Promise<void> {
    if (globalThis.__browser) {
        process.stdout.write("### Close Browser instance...\n");
        await globalThis.__browser.close();
        globalThis.__browser = null;
    }
}
