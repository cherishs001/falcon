export default {
    //名称空间
    namespace: 'global',
    //状态
    state: {
        test: 123,
        token: '',
        user_id: '',
    },
    epics: {
        async test_async(action: any, put: any): Promise<void> {
            try {
                put({
                    type: 'global/set_test_state',
                    payload: {
                        test: 12345,
                    },
                })
            } catch (e) {
                throw e;
            }
            return;
        },
    },
    reducers: {
    },
}
