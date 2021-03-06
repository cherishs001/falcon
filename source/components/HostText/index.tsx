import * as React from 'react';
import styles from './index.scss';
import {PureComponent} from 'react';
import {ComPageProps} from '@/typings';

/**
 *
 *
 */

interface HostTextState {
    line: Array<number>
    id: string
}

interface HostTextProps extends ComPageProps {
    edit: boolean
    defaultValue: string

    onChange(value: string): void
}

class HostText extends PureComponent<HostTextProps> {
    state: HostTextState = {
        line: [1],
        id: `text-${Math.random()}`,
    };

    componentDidMount(): void {
        const text = document.getElementById(this.state.id);
        if (text && this.props.edit) {
            text.innerText = this.props.defaultValue;
        }
        // @ts-ignore
        const ro = new ResizeObserver(entries => {
            const height = entries[0].contentRect.height;
            const line = parseInt((height / 21).toString());
            if (line !== this.state.line.length) {
                const line_state = [];
                for (let i = 0; i < line; i++) {
                    line_state.push(i + 1);
                }
                this.setState({
                    line: line_state,
                })
            }
        })
        ro.observe(text);
    }

    componentDidUpdate(prevProps: Readonly<HostTextProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (!this.props.edit) {
            const text = document.getElementById(this.state.id);
            if (text) {
                text.innerHTML = this.props.defaultValue;
            }
        }
    }

    render(): React.ReactNode {
        return <div className={styles.container} onClick={(e) => {
            const text = document.getElementById(this.state.id);
            if (text) {
                text.focus();
                const select = window.getSelection();
                if (select) {
                    select.selectAllChildren(text);
                    select.collapseToEnd();
                }
            }
        }}>
            <div className={styles.lineBg}/>
            <div style={{display: 'flex', position: 'relative'}}>
                <div className={styles.lineBox}>
                    {this.state.line.map((item, index) => {
                        return <div key={index} className={styles.line}>{item}</div>
                    })}
                </div>
                {this.props.edit ? <div id={this.state.id} contentEditable={this.props.edit} spellCheck={false} onClick={(e) => {
                    e.stopPropagation();
                }} onInput={(e) => {
                    this.props.onChange(e.currentTarget.innerText);
                }} className={styles.textarea}/> : <div id={this.state.id} className={styles.textarea}/>}
            </div>
        </div>
    }
}

export default HostText;
