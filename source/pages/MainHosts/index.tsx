import * as React from 'react';
import {PureComponent} from 'react';
import {PageProps} from '@/typings';
import magic from '@kaishen/magic';
import Page from '@/components/Page';
import HostMenu from '@/components/HostMenu';
import HostText from '@/components/HostText';
import styles from './index.scss';
import {ipcRenderer} from 'electron';

const {connect} = magic;

interface MainHostsState {
    edit: boolean
    active: number
    refresh: boolean
    hosts: string
    reload: boolean
    actives: Array<number>
    hosts_list: Array<{
        id: number,
        name: string
        active: boolean,
    }>
}

class MainHosts extends PureComponent<PageProps> {
    state: MainHostsState = {
        edit: false,
        active: 0,
        refresh: true,
        reload: false,
        hosts: '',
        actives: [],
        hosts_list: [],
    };

    componentDidMount(): void {
        ipcRenderer.send('init_hosts');
        ipcRenderer.on('read_hosts', (e, hosts: string) => {
            let content = unescape(hosts);
            console.log(this.state.active);
            if (this.state.active === 0) {
                content = content.replace(/\r\n/g, '<br>')
                content = content.replace(/\n/g, '<br>')
            }
            console.log(content);
            this.setState({
                refresh: true,
                hosts: content,
            })
        })
        ipcRenderer.on('reload_hosts_res', (e) => {
            this.setState({
                reload: false,
            })
        })
        ipcRenderer.on('init_hosts_res', (e, rows: any) => {
            const hosts_list = [];
            for (const item of rows) {
                hosts_list.push({
                    id: item.hosts_id,
                    name: item.name,
                    active: item.active,
                })
            }
            this.setState({
                hosts_list,
            })
        })
    }

    render(): React.ReactNode {
        return <Page className={styles.container}>
            <div style={{
                position: 'relative',
                width: 260,
                height: '100%',
                display: 'flex',
            }}>
                <HostMenu hosts_list={this.state.hosts_list}
                          reload={this.state.reload}
                          onReload={() => {
                              this.setState({
                                  reload: true,
                              }, () => {
                                  ipcRenderer.send('reload_hosts');
                              })
                          }}
                          onChange={(value) => {
                              this.setState({
                                  edit: value !== 0,
                                  active: value,
                                  refresh: false,
                                  hosts: '',
                              }, async () => {
                                  ipcRenderer.send('look_hosts_item', this.state.active);
                              })
                          }} onActive={(index, name, check) => {
                    ipcRenderer.send('active_hosts', index, check ? 1 : 0, this.state.active);
                }}/>
            </div>
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
            }}>
                {
                    this.state.refresh ?
                        <HostText defaultValue={this.state.hosts} edit={this.state.edit} onChange={(value) => {
                            ipcRenderer.send('save_hosts', this.state.active, value, this.state.actives.indexOf(this.state.active) < 0 ? 0 : 1);
                        }}/> : null
                }
            </div>
        </Page>
    }
}

export default connect(MainHosts);
