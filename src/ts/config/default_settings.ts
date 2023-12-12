import _ from 'lodash';

interface Config {
    gravity: number;
    gravityStep: number;
    app?: {
        width: number;
        height: number;
    };
}

// CONSTANTS FOR APPLICATION CONFIGURATION
let config: Config = {
    gravity: 1,
    gravityStep: 1,
}

const setting: Config = _.cloneDeep(config);

export default setting;