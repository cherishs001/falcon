import * as React from 'react';
import {PureComponent} from 'react';
import {PageProps} from '@/typings';
import magic from '@kaishen/magic';
import Page from '@/components/Page';
import HostMenu from '@/components/HostMenu';
import HostText from '@/components/HostText';
import styles from './index.scss';

const {connect} = magic;

class MainHosts extends PureComponent<PageProps> {
    render(): React.ReactNode {
        return <Page className={styles.container}>
            <div style={{
                position: 'relative',
                width: 260,
                height: '100%',
            }}>
                <HostMenu/>
            </div>
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
            }}>
                <HostText onChange={(value) => {
                    console.log(value);
                }}/>
            </div>
        </Page>
    }
}

export default connect(MainHosts);
