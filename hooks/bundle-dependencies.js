const Browserify = require('browserify');
const Fs = require('fs');

module.exports = {
    'generate:after': async generator => {
        new Browserify(`${generator.targetDir}/lib/browser.js`, {debug: true})
            .bundle()
            .pipe(Fs.createWriteStream(`${generator.targetDir}/lib/browser.bundle.js`));
    }
};
