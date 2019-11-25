module.exports = (api, opts) => {

    api.extendPackage({
        dependencies: {
            "lodash": "^4.17.11",
            "vue-localstorage": "^0.6.2",
            "vuex-persist": "^2.0.1",
        },
        devDependencies: {
            "mini-css-extract-plugin": "^0.8.0",
        }
    });

    api.injectImports(api.entryFile, `import LoadingWidget from './helperComponents/LoadingWidget.vue'`);
    api.injectImports(api.entryFile, `import Ajax from './mixins/runAjax.js'`);
    api.injectImports(api.entryFile, `import {PluginLog} from './mixins/logSystem.js'`);

    api.onCreateComplete(() => {
        const {
            EOL
        } = require('os');
        const fs = require('fs');
        const contentMain = fs.readFileSync(api.entryFile, {
            encoding: 'utf-8'
        })
        const lines = contentMain.split(/\r?\n/g)

        const renderIndex = lines.findIndex(line => line.match(/new Vue\(\{/))
        const finalLines = lines.splice((renderIndex-1), lines.length);


        const fullFileArray = (lines.concat([
            'Vue.config.ignoredElements = ["x-test"];',
            'Vue.use( PluginLog );',
            'Vue.mixin(Ajax);',
            '',
            'Vue.component("loader-widget", LoadingWidget);',
            ''
        ])).concat(finalLines);

        const fullFileText = fullFileArray.join(EOL);
        fullFileText.replace(/#app/, '#'+opts.appname+'element');

        fs.writeFileSync(api.entryFile, fullFileText, {
            encoding: 'utf-8'
        });
    })

    api.render('./template/src/storage/store.ejs', {
        appname: opts.appname
    });
    api.render('.\template\src\mixins\logSystem.ejs', {
        appname: opts.appname
    });

}