import {CSSProperties, Props} from 'react';
import {RouteComponentProps} from 'react-router';

//component
// - Page
declare interface ComPageProps extends Props<any> {
    className?: string
    style?: CSSProperties
}

declare interface ComLoginInputProps extends Props<any> {
    className?: string
    style?: CSSProperties
    placeholder?: string
    type?: 'text' | 'password' | 'email'
    defaultValue?: string

    onChange?(value: string, verify?: boolean): void

    onEnter?(): void
}

interface DispatchParams {
    type: string
    payload: object
}

declare interface PageProps extends RouteComponentProps {
    state: any

    dispatch(params: DispatchParams): any
}

declare interface ComApiConfigModalProps extends PageProps {
    className?: string
    style?: CSSProperties
    form: any
    type: 'edit'|'create'
    api_id?: string

    onSuccess?(): void
}

declare interface ApiConfig {
    api_id?: string
    name?: string
    tag?: string
    protocol?: string
    host?: string
    port?: number
    method?: string
    prefix?: string
    upstream?: string
    is_enabled?: number
    auth_type?: number
    rate_limit?: number
    token_rate?: number
    token_sum?: number
}
