const exec = require('child_process').exec;
const Browserify = require('browserify');
const Fs = require('fs');

module.exports = {
    'generate:after': async generator => {

        exec(`cd ${generator.targetDir} && npm i`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(stdout);
            console.error(stderr);
        });

        new Browserify(`${generator.targetDir}/lib/browser.js`, {debug: true})
            .bundle()
            .pipe(Fs.createWriteStream(`${generator.targetDir}/lib/browser.bundle.js`));
    }
};
