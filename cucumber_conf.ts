import { Config } from 'protractor'

export let config: Config = {

    onPrepare: function () {

        const chai = require('chai');
        const chaiAsPromised = require('chai-as-promised');

        chai.use(chaiAsPromised);
        chai.should();

    },

    directConnect: true,

    capabilities: {
        browserName: 'chrome'
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../resources/features/*.feature'
    ],

    cucumberOpts: {
        strict: true,
        'no-colors': false,
        require: [
            './src/steps/**/*.js'
        ]
    }
};
