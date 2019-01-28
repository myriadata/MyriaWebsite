var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
    username: process.env.FTPUSERNAME,
    password: process.env.FTPPASS,
    host: process.env.FTPHOST,
    port: 22,
    localRoot: __dirname + "/../dist/",
    remoteRoot: "/",
    include: ['*']
}

ftpDeploy.deploy(config, function(err) {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log('finished');
    }
});
