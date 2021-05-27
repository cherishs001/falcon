import {app, BrowserWindow, ipcMain} from 'electron';
import * as os from 'os';
import sq3 from 'sqlite3';
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

const home = os.homedir();
console.log(home);
const dbPath = path.join(home, './falcon.bin');
const sqlite3 = sq3.verbose();
const database = new sqlite3.Database(dbPath);

let win: BrowserWindow | null = null;

app.on('ready', async () => {
    win = new BrowserWindow({
        width: 950,
        height: 600,
        show: false,
        // frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
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
            win = null;
        }
    });
});

ipcMain.on('save_hosts', (e, index: number, value: string, actives: number) => {
    database.run(`update hosts set hosts = '${escape(value)}', active = ${actives} where hosts_id = ${index};`);
    // database.run(`create table if not exists hosts (
    // "hosts_id" integer NOT NULL,
    // "name" TEXT NOT NULL,
    // "hosts" TEXT NOT NULL,
    // "active" integer NOT NULL,
    // PRIMARY KEY ("name"))`, (err) => {
    //     if (err) {
    //         // connection_window.webContents.send('save_database_config_finish', 'fail');
    //     } else {
    //
    //     }
    // })
})

ipcMain.on('init_hosts', () => {
    database.all(`select * from hosts`, async (err, rows) => {
        if (win) {
            win.webContents.send('init_hosts_res', rows);
        }
        const send = await select_hosts(0);
        if (win) {
            win.webContents.send('read_hosts', send);
        }
    })
})

const select_hosts = (index: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        let sql = '';
        if (index === 0) {
            sql = `select GROUP_CONCAT(hosts, '\n') as hosts from hosts where active = 1`;
        } else {
            sql = `select GROUP_CONCAT(hosts, '\n') as hosts from hosts where hosts_id = ${index}`;
        }
        database.get(sql, (err, row) => {
            if (!row.hosts) {
                resolve('');
                return;
            }
            resolve(row.hosts);
        });
    })
}

ipcMain.on('look_hosts_item', async (e, index: number) => {
    const send = await select_hosts(index);
    if (win) {
        win.webContents.send('read_hosts', send);
    }
})

ipcMain.on('active_hosts', async (e, index: number, active: number, now: number) => {
    database.run(`update hosts set active = ${active} where hosts_id = (${index});`);
    const send = await select_hosts(now);
    if (win) {
        win.webContents.send('read_hosts', send);
    }
})

ipcMain.on('reload_hosts', async (e, index: number, active: number, now: number) => {
    const send = await select_hosts(0);
    const platform = os.platform();
    if (platform === 'win32') {
        const hosts_path = path.join(process.env.windir, './System32/drivers/etc/hosts');
        fs.writeFileSync(hosts_path, unescape(send));
        // 重新获取网络ip
        cp.exec('ipconfig /release', () => {
            cp.exec('ipconfig /renew', () => {
                if (win) {
                    win.webContents.send('reload_hosts_res');
                }
            })
        })
    }
})
