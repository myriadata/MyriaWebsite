const { deploy } = require('sftp-sync-deploy');

let config = {
    host: process.env.FTPHOST,           // Required.
    port: 22,                            // Optional, Default to 22.
    username: process.env.FTPUSERNAME,   // Required.
    password: process.env.FTPPASS,       // Optional.
    localDir: 'dist',                    // Required, Absolute or relative to cwd.
    remoteDir: '/'                       // Required, Absolute path only.
};

let options = {
    dryRun: false,                       // Enable dry-run mode. Default to false
    exclude: ['.htaccess'],              // htaccess is not automatically updated
    excludeMode: 'ignore',               // Behavior for excluded files ('remove' or 'ignore'), Default to 'remove'.
    forceUpload: false                   // Force uploading all files, Default to false(upload only newer files).
};

deploy(config, options).then(() => {
    console.log('success!');
}).catch(err => {
    console.error('error! ', err);
    process.exit(1);
})