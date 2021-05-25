import axios from 'axios';
import {AxiosResponse} from 'axios';

axios.interceptors.response.use((data: AxiosResponse): Promise<AxiosResponse> => {
    return new Promise<AxiosResponse>((resolve, reject) => {
        if (data.status && data.status === 200 && data.data.status === 'error') {
            reject({message: data.data.message});
        } else {
            resolve(data);
        }
    })
}, (err) => {
    return Promise.resolve(err);
})
