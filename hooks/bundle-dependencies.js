const ncp = require('ncp');

module.exports = {
    'generate:after': async generator => {
        if(generator.templateParams.bundleDependencies) {
            await ncp.ncp('node_modules/ajv', `${generator.targetDir}/lib/ajv`, {stopOnError: true},
                error => {
                    if (error) {
                        console.error(error);
                    }
                });
        }
    }
};
