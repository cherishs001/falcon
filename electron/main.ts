import {app, BrowserWindow} from 'electron';

let win: BrowserWindow | null = null;

app.on('ready', async () => {
    win = new BrowserWindow({
        width: 1280,
        height: 800,
        show: false,
        // frame: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    await win.loadFile('./dist/index.html');
    win.on('ready-to-show', () => {
        if (win) {
            win.show();
        }
    });

    win.on('close', (e) => {
        e.preventDefault();
        if (win) {
            win.destroy();
        }
    });
});
