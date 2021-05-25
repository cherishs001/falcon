import * as React from 'react';
import styles from './index.scss';
import {CSSProperties} from 'react';
import {ComPageProps} from '@/typings';
import classnames from 'classnames';

/**
 * page组件
 * 提供页面的最大化外围容器组件
 */

const Page = (props: ComPageProps): JSX.Element => {
    const customStyle = props.style || {} as CSSProperties;
    const classname = classnames(styles.pageContainer, props.className);
    
    return <div className={classname} style={{...customStyle}}>
        {props.children}
    </div>
};

export default Page;
