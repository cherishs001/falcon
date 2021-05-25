//deps
import * as React from 'react';
import magic from '@kaishen/magic';

// models
import global from '@/models/global';

// main
magic.addModel(global);
magic.start(<div>sb</div>, 'root', {
    persist: true,
});
