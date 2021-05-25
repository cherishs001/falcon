//deps
import * as React from 'react';
import magic from '@kaishen/magic';

import MainHosts from '@/pages/MainHosts';

// models
import global from '@/models/global';

// main
magic.addModel(global);
magic.start(<MainHosts/>, 'root', {
    persist: true,
});
