import * as React from 'react';
import styles from './index.scss';
import {PureComponent} from 'react';
import {ComPageProps} from '@/typings';
// import classnames from 'classnames';
import Switch from 'antd/lib/switch';
import Button from 'antd/lib/button';
import 'antd/lib/switch/style/index.css';
import 'antd/lib/button/style/index.css';
import { ReloadOutlined } from '@ant-design/icons';

// import {Switch} from 'antd';

/**
 *
 *
 */
interface HostMenuState {
    choose_index: number
}

interface HostMenuProps extends ComPageProps {
    hosts_list: Array<{
        id: number,
        name: string
        active: boolean,
    }>
    reload: boolean
    onChange(value: number): void
    onReload(): void
    onActive(value: number, name: string, active: boolean): void
}

class HostMenu extends PureComponent<HostMenuProps> {
    state: HostMenuState = {
        choose_index: 0,
    };

    render(): React.ReactNode {
        return <div className={styles.container}>
            <div className={styles.hostsList} style={{
                backgroundColor: this.state.choose_index === 0 ? '#595959' : '#434343',
            }} onClick={() => {
                if (this.state.choose_index !== 0) {
                    this.setState({
                        choose_index: 0,
                    }, () => {
                        this.props.onChange(0);
                    })
                }
            }}>
                <div>All</div>
                <div>
                    <Button
                        type='primary'
                        icon={<ReloadOutlined />}
                        shape={'circle'}
                        size={'small'}
                        loading={this.props.reload}
                        onClick={() => {
                            this.props.onReload();
                        }}
                    />
                </div>
            </div>
            {this.props.hosts_list.map((item, index) => {
                return <div className={styles.hostsList} key={`host_${index}`} style={{
                    backgroundColor: this.state.choose_index === item.id ? '#595959' : '#434343',
                }} onClick={() => {
                    if (this.state.choose_index !== (index + 1)) {
                        this.setState({
                            choose_index: item.id,
                        }, () => {
                            this.props.onChange(this.state.choose_index);
                        })
                    }
                }}>
                    <div>{item.name}</div>
                    <Switch size={'small'} defaultChecked={item.active} onChange={(checked) => {
                        this.props.onActive(item.id, item.name, checked);
                    }} onClick={(checked, event) => {
                        event.stopPropagation();
                    }}/>
                </div>
            })}
        </div>
    }
}

export default HostMenu;
